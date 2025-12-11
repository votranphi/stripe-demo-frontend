import { useEffect, useState } from 'react';
import { orderService } from '../../../api/services';
import { Order, OrderStatus } from '../../../types';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner, Breadcrumb } from '../../../components/common';
import toast from 'react-hot-toast';

const STATUS_COLORS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline' | 'success'> = {
  [OrderStatus.PAID]: 'success',
  [OrderStatus.PENDING]: 'secondary',
  [OrderStatus.SHIPPED]: 'default',
  [OrderStatus.DELIVERED]: 'success',
  [OrderStatus.CANCELLED]: 'destructive',
  [OrderStatus.DRAFT]: 'outline',
};

export const AdminOrderListPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await orderService.getAllOrders(page);
      setOrders(response.data);
      setTotalPages(Math.ceil(response.total / response.limit));
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: OrderStatus) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(id, newStatus);
      setOrders(orders.map(o => o.id === id ? updatedOrder : o));
      toast.success('Order status updated');
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading && page === 1) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Orders' }
        ]} 
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Total Amount</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                    <td className="px-6 py-4">${(order.totalAmount || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <ul className="list-disc pl-4 text-xs">
                        {order.lineItems.map((item, idx) => (
                          <li key={idx}>{item.name} x {item.quantity}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={STATUS_COLORS[order.status] || 'default'}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="text-xs border rounded p-1"
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                        disabled={order.status === OrderStatus.CANCELLED || order.status === OrderStatus.DELIVERED}
                      >
                        {Object.values(OrderStatus).map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm">Page {page} of {totalPages}</span>
            <Button 
              variant="outline" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};