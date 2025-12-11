import { Card, CardContent } from '../../components/ui/card';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export const MyOrdersPage = () => {
  // Since the backend does not support listing past orders history for users
  // (only GET /api/v1/orders/draft exists), we provide a placeholder UI.
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order History Unavailable</h2>
          <p className="text-gray-600 max-w-md mb-6">
            We are currently updating our order history system. 
            Please check your email for order confirmations or contact support for assistance.
          </p>
          <div className="flex gap-4">
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
            <Link to="/cart">
              <Button variant="outline">View Cart</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};