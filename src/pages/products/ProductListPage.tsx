import { useEffect, useState } from 'react';
import { productService, orderService } from '../../api/services';
import { useCartStore } from '../../store';
import { Product, ProductType } from '../../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { LoadingSpinner, ErrorMessage } from '../../components/common';
import { ShoppingCart, Package } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | ProductType>('all');
  const { setCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const updatedCart = await orderService.addItemToCart({ productId, quantity: 1 });
      setCart(updatedCart);
      toast.success('Product added to cart!');
    } catch (err) {
      // Error handled by interceptor
      console.error('Add to cart error:', err);
    }
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.type === filter);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Browse our collection of amazing products</p>
      </div>

      {/* Filter */}
      <div className="mb-8 flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Products
        </Button>
        <Button
          variant={filter === ProductType.ONE_TIME ? 'default' : 'outline'}
          onClick={() => setFilter(ProductType.ONE_TIME)}
        >
          One-Time Purchase
        </Button>
        <Button
          variant={filter === ProductType.SUBSCRIPTION ? 'default' : 'outline'}
          onClick={() => setFilter(ProductType.SUBSCRIPTION)}
        >
          Subscription
        </Button>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <Badge variant={product.type === ProductType.SUBSCRIPTION ? 'secondary' : 'default'}>
                    {product.type === ProductType.SUBSCRIPTION ? 'Subscription' : 'One-Time'}
                  </Badge>
                </div>
                <CardDescription>
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </div>
              </CardContent>
              <CardFooter>
                {product.type === ProductType.ONE_TIME ? (
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant="secondary"
                    disabled
                  >
                    View in Pricing Plans
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
