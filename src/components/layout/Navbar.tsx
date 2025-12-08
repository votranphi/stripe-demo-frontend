import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { useCartStore } from '../../store';
import { Button } from '../ui/button';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { itemCount } = useCartStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gray-900">StripeStore</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-primary transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                <Link to="/my-subscription">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                <div className="hidden md:block text-sm text-gray-600">
                  {user?.email}
                </div>

                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
