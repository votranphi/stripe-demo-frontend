// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore, useCartStore } from './store';
import { orderService } from './api/services';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Route Guards
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';

// Pages
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ProductListPage } from './pages/products/ProductListPage';
import { CartPage } from './pages/cart/CartPage';
import { PricingPage } from './pages/subscription/PricingPage';
import { MySubscriptionPage } from './pages/subscription/MySubscriptionPage';
import { SuccessPage } from './pages/checkout/SuccessPage';
import { CancelPage } from './pages/checkout/CancelPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

// New Pages
import { AdminProductListPage } from './pages/admin/products/AdminProductListPage';
import { AdminProductFormPage } from './pages/admin/products/AdminProductFormPage';
import { AdminOrderListPage } from './pages/admin/orders/AdminOrderListPage';
import { AdminSubscriptionPlansPage } from './pages/admin/subscriptions/AdminSubscriptionPlansPage';
import { DigitalContentPage } from './pages/content/DigitalContentPage';
import { MyOrdersPage } from './pages/orders/MyOrdersPage';

import './App.css';

function App() {
  const { initialize, isAuthenticated } = useAuthStore();
  const { setCart } = useCartStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const cart = await orderService.getDraftOrder();
      setCart(cart);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/pricing" element={<PricingPage />} />

            {/* Protected Routes */}
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
            <Route path="/my-subscription" element={<ProtectedRoute><MySubscriptionPage /></ProtectedRoute>} />
            <Route path="/digital-content" element={<ProtectedRoute><DigitalContentPage /></ProtectedRoute>} />
            <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
            <Route path="/cancel" element={<ProtectedRoute><CancelPage /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin">
              <Route path="dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
              <Route path="products" element={<AdminRoute><AdminProductListPage /></AdminRoute>} />
              <Route path="products/new" element={<AdminRoute><AdminProductFormPage /></AdminRoute>} />
              <Route path="products/:id/edit" element={<AdminRoute><AdminProductFormPage /></AdminRoute>} />
              <Route path="orders" element={<AdminRoute><AdminOrderListPage /></AdminRoute>} />
              <Route path="subscription-plans" element={<AdminRoute><AdminSubscriptionPlansPage /></AdminRoute>} />
            </Route>
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#363636', color: '#fff' },
          success: { duration: 3000, iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { duration: 4000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </>
  );
}

export default App;