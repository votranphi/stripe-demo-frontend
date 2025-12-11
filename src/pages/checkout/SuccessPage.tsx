import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubscription, setIsSubscription] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const type = searchParams.get('type'); // 'order' or 'subscription'

    if (!sessionId) {
      toast.error('Invalid session');
      navigate('/');
      return;
    }

    if (type === 'subscription') {
      setIsSubscription(true);
      toast.success('Subscription activated successfully!');
    } else {
      toast.success('Payment successful! Your order has been confirmed.');
    }
  }, [searchParams, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {isSubscription ? (
            <>
              <p className="text-lg text-gray-600">
                Your subscription has been activated successfully.
              </p>
              <p className="text-gray-600">
                You now have access to all premium features. Thank you for subscribing!
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-600">
                Thank you for your purchase! Your order has been confirmed.
              </p>
              <p className="text-gray-600">
                You will receive an email confirmation shortly with your order details.
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          {isSubscription ? (
            <Button onClick={() => navigate('/my-subscription')}>
              View Subscription
            </Button>
          ) : (
            <Button onClick={() => navigate('/orders')}>
              View Orders
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
