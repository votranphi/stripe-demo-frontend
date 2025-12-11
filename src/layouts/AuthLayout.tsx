import { Outlet } from 'react-router-dom';
import { Package } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-gray-900">StripeStore</span>
          </div>
          <p className="text-gray-600">Welcome back! Please sign in to continue.</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
