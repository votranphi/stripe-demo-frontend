import { useEffect, useState } from 'react';
import { subscriptionPlanService, subscriptionService } from '../../api/services';
import { SubscriptionPlan, SubscriptionFrequency } from '../../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { LoadingSpinner } from '../../components/common';
import { Check } from 'lucide-react';

export const PricingPage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscribingPlanId, setSubscribingPlanId] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const data = await subscriptionPlanService.getAllPlans();
      setPlans(data);
    } catch (err) {
      console.error('Fetch plans error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setSubscribingPlanId(planId);
      const response = await subscriptionService.createCheckoutSession({ planId });
      // Redirect to Stripe checkout
      window.location.href = response.checkoutUrl;
    } catch (err) {
      console.error('Subscribe error:', err);
      setSubscribingPlanId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600">Select the perfect subscription for your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isPopular = plan.frequency === SubscriptionFrequency.MONTHLY;
          
          return (
            <Card key={plan.id} className={`flex flex-col ${isPopular ? 'border-primary border-2' : ''}`}>
              <CardHeader>
                {isPopular && (
                  <Badge className="w-fit mb-2">Most Popular</Badge>
                )}
                <CardTitle className="text-2xl">
                  {plan.product?.name || 'Subscription Plan'}
                </CardTitle>
                <CardDescription>
                  {plan.frequency === SubscriptionFrequency.MONTHLY ? 'Monthly' : 'Yearly'} billing
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-5xl font-bold">${((plan.product?.price || 0) / 100).toFixed(2)}</span>
                  <span className="text-gray-600">
                    /{plan.frequency === SubscriptionFrequency.MONTHLY ? 'month' : 'year'}
                  </span>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Full access to all features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Regular updates and new features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Cancel anytime</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  variant={isPopular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={subscribingPlanId === plan.id}
                >
                  {subscribingPlanId === plan.id ? 'Redirecting...' : 'Subscribe Now'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No subscription plans available at the moment.</p>
        </div>
      )}
    </div>
  );
};
