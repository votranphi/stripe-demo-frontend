import { useEffect, useState } from 'react';
import { subscriptionService } from '../../api/services';
import { UserSubscription } from '../../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { LoadingSpinner } from '../../components/common';
import { Calendar, CreditCard } from 'lucide-react';

export const MySubscriptionPage = () => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isManaging, setIsManaging] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      const data = await subscriptionService.getMySubscription();
      setSubscription(data);
    } catch (err) {
      console.error('Fetch subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setIsManaging(true);
      const returnUrl = window.location.origin + '/my-subscription';
      const response = await subscriptionService.createPortalSession(returnUrl);
      // Redirect to Stripe customer portal
      window.location.href = response.portalUrl;
    } catch (err) {
      console.error('Manage subscription error:', err);
      setIsManaging(false);
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Subscription</h1>

      {!subscription ? (
        <Card>
          <CardContent className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Active Subscription</h2>
            <p className="text-gray-600 mb-6">You don't have any active subscription yet.</p>
            <Button onClick={() => window.location.href = '/pricing'}>
              View Pricing Plans
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </div>
                <Badge 
                  variant={subscription.status === 'active' ? 'success' : 'secondary'}
                >
                  {subscription.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Period End</p>
                    <p className="text-lg font-semibold">
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {subscription.cancelAtPeriodEnd && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <p className="text-sm text-yellow-800">
                    Your subscription will be cancelled at the end of the current billing period.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleManageSubscription}
                disabled={isManaging}
              >
                {isManaging ? 'Redirecting...' : 'Manage Subscription'}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Update your payment method, view invoices, or cancel your subscription through the Stripe Customer Portal.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
};
