import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart3, Package, ShoppingCart, Users } from 'lucide-react';

export const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              +0% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              +0% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Active products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your store from here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <Package className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Manage Products</h3>
              <p className="text-sm text-gray-600">Add, edit, or remove products</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <ShoppingCart className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">View Orders</h3>
              <p className="text-sm text-gray-600">Manage customer orders</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">User Management</h3>
              <p className="text-sm text-gray-600">View and manage users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
