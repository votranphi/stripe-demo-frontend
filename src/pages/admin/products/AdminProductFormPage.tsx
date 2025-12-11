import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../../api/services';
import { ProductType } from '../../../types';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { LoadingSpinner, Breadcrumb } from '../../../components/common';
import toast from 'react-hot-toast';

export const AdminProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    type: ProductType.ONE_TIME as ProductType,
  });

  useEffect(() => {
    if (isEditMode && id) {
      fetchProduct(id);
    }
  }, [id, isEditMode]);

  const fetchProduct = async (productId: string) => {
    try {
      const product = await productService.getProductById(productId);
      setFormData({
        name: product.name,
        price: product.price / 100, // Convert cents to dollars for display
        stock: product.stock,
        type: product.type,
      });
    } catch (error) {
      toast.error('Failed to load product');
      navigate('/admin/products');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        price: Math.round(formData.price * 100), // Convert dollars to cents
      };

      if (isEditMode && id) {
        await productService.updateProduct(id, payload);
        toast.success('Product updated successfully');
      } else {
        await productService.createProduct(payload);
        toast.success('Product created successfully');
      }
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Breadcrumb 
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Products', href: '/admin/products' },
          { label: isEditMode ? 'Edit Product' : 'New Product' }
        ]} 
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isEditMode ? 'Edit Product' : 'Create New Product'}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Product Type</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ProductType })}
              >
                <option value={ProductType.ONE_TIME}>One-Time Purchase</option>
                <option value={ProductType.SUBSCRIPTION}>Subscription</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};