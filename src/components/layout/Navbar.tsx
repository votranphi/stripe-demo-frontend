import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { useCartStore } from '../../store';
import { Button } from '../ui/button';
import { ShoppingCart, User, LogOut, Package, Menu, X, ChevronDown, LayoutDashboard, FileText, CreditCard, Download, Settings } from 'lucide-react';
import { UserRole } from '@/types';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { itemCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    navigate('/login');
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
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
              
              {/* Admin Menu - Desktop */}
              {isAuthenticated && isAdmin && (
                <div className="relative group">
                  <button 
                    className="flex items-center text-gray-700 hover:text-primary transition-colors"
                    onMouseEnter={() => setAdminMenuOpen(true)}
                    onMouseLeave={() => setAdminMenuOpen(false)}
                  >
                    Admin <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {adminMenuOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border"
                      onMouseEnter={() => setAdminMenuOpen(true)}
                      onMouseLeave={() => setAdminMenuOpen(false)}
                    >
                      <Link to="/admin/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link to="/admin/products" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Package className="mr-2 h-4 w-4" />
                        Manage Products
                      </Link>
                      <Link to="/admin/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Orders
                      </Link>
                      <Link to="/admin/subscription-plans" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="mr-2 h-4 w-4" />
                        Subscription Plans
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
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

                {/* User Dropdown Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user?.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 border">
                      <Link 
                        to="/my-subscription" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        My Subscription
                      </Link>
                      <Link 
                        to="/orders" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        My Orders
                      </Link>
                      <Link 
                        to="/digital-content" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Digital Content
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && (
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
            )}
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              {isAuthenticated ? (
                <>
                  <hr className="my-2" />
                  <div className="px-4 py-2 text-sm text-gray-500 font-semibold">Account</div>
                  <Link 
                    to="/my-subscription" 
                    className="flex items-center text-gray-700 hover:text-primary transition-colors px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    My Subscription
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center text-gray-700 hover:text-primary transition-colors px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                  <Link 
                    to="/digital-content" 
                    className="flex items-center text-gray-700 hover:text-primary transition-colors px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Digital Content
                  </Link>

                  {isAdmin && (
                    <>
                      <hr className="my-2" />
                      <div className="px-4 py-2 text-sm text-gray-500 font-semibold">Admin</div>
                      <Link 
                        to="/admin/dashboard" 
                        className="flex items-center text-gray-700 hover:text-primary transition-colors px-4 py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link 
                        to="/admin/products" 
                        className="flex items-center text-gray-700 hover:text-primary transition-colors px-4 py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        Manage Products
                      </Link>
                      <Link 
                        to="/admin/orders" 
                        className="flex items-center text-gray-700 hover:text-primary transition-colors px-4 py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Orders
                      </Link>
                      <Link 
                        to="/admin/subscription-plans" 
                        className="flex items-center text-gray-700 hover:text-primary transition-colors px-4 py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Subscription Plans
                      </Link>
                    </>
                  )}

                  <hr className="my-2" />
                  <div className="px-4 py-2 text-sm text-gray-500">{user?.email}</div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-primary transition-colors px-4 py-2"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <hr className="my-2" />
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
