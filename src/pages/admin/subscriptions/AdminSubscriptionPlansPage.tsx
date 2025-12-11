import { useEffect, useState } from 'react';
import { subscriptionPlanService, productService } from '../../../api/services';
import { SubscriptionPlan, SubscriptionFrequency, Product } from '../../../types';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/common';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminSubscriptionPlansPage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // New Plan Form State
  const [newPlan, setNewPlan] = useState({
    stripePriceId: '',
    productId: '',
    frequency: SubscriptionFrequency.MONTHLY,
    currency: 'usd'
  });

  useEffect(() => {
    Promise.all([
      subscriptionPlanService.getAllPlans(),
      productService.getAllProducts()
    ]).then(([plansData, productsData]) => {
      setPlans(plansData);
      setProducts(productsData);
    }).catch(() => toast.error('Failed to load data'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await subscriptionPlanService.createPlan(newPlan);
      // Manually match product for display since the API return might not have populated product immediately
      const matchedProduct = products.find(p => p.id === created.productId);
      const planWithProduct = { ...created, product: matchedProduct };
      
      setPlans([planWithProduct, ...plans]);
      setNewPlan({ ...newPlan, stripePriceId: '' }); // Reset form partially
      toast.success('Plan created');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this plan?')) return;
    try {
      await subscriptionPlanService.deletePlan(id);
      setPlans(plans.filter(p => p.id !== id));
      toast.success('Plan deleted');
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Subscription Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* List Section */}
        <div className="md:col-span-2 space-y-4">
          {plans.map(plan => (
            <Card key={plan.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-bold">{plan.product?.name || 'Unknown Product'}</h3>
                  <p className="text-sm text-gray-500">
                    {plan.frequency} - {plan.currency.toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    Stripe Price: {plan.stripePriceId}
                  </p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(plan.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
          {plans.length === 0 && <p className="text-gray-500">No plans found.</p>}
        </div>

        {/* Create Form Section */}
        <div>
          <Card>
            <CardHeader><CardTitle>Add New Plan</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Product</Label>
                  <select 
                    className="w-full border rounded p-2 text-sm bg-background"
                    value={newPlan.productId}
                    onChange={e => setNewPlan({ ...newPlan, productId: e.target.value })}
                    required
                  >
                    <option value="">Select a product...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Stripe Price ID</Label>
                  <Input 
                    placeholder="price_..."
                    value={newPlan.stripePriceId}
                    onChange={e => setNewPlan({ ...newPlan, stripePriceId: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <select 
                    className="w-full border rounded p-2 text-sm bg-background"
                    value={newPlan.frequency}
                    onChange={e => setNewPlan({ ...newPlan, frequency: e.target.value as SubscriptionFrequency })}
                  >
                    <option value={SubscriptionFrequency.MONTHLY}>Monthly</option>
                    <option value={SubscriptionFrequency.YEARLY}>Yearly</option>
                  </select>
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Create Plan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};