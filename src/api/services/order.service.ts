import axiosClient from '../axiosClient';
import { Order, AddToCartRequest, UpdateCartItemRequest, CheckoutSessionResponse } from '../../types';

export const orderService = {
  /**
   * Get current user's draft order (cart)
   */
  getDraftOrder: async (): Promise<Order | null> => {
    const response = await axiosClient.get<{ success: boolean; data: Order | null }>('/orders/draft');
    return response.data.data;
  },

  /**
   * Add item to cart (draft order)
   */
  addItemToCart: async (data: AddToCartRequest): Promise<Order> => {
    const response = await axiosClient.post<{ success: boolean; data: Order }>('/orders/draft/items', data);
    return response.data.data;
  },

  /**
   * Update item quantity in cart
   */
  updateCartItemQuantity: async (productId: string, data: UpdateCartItemRequest): Promise<Order> => {
    const response = await axiosClient.patch<{ success: boolean; data: Order }>(`/orders/draft/items/${productId}`, data);
    return response.data.data;
  },

  /**
   * Remove item from cart
   */
  removeItemFromCart: async (productId: string): Promise<Order> => {
    const response = await axiosClient.delete<{ success: boolean; data: Order }>(`/orders/draft/items/${productId}`);
    return response.data.data;
  },

  /**
   * Create Stripe checkout session for cart
   */
  createCheckoutSession: async (): Promise<CheckoutSessionResponse> => {
    const response = await axiosClient.post<{ success: boolean; data: CheckoutSessionResponse }>('/orders/checkout/create-session');
    return response.data.data;
  },

  /**
   * Handle successful checkout
   */
  handleCheckoutSuccess: async (sessionId: string): Promise<{ message: string }> => {
    const response = await axiosClient.get<{ message: string }>(`/orders/checkout/success?session_id=${sessionId}`);
    return response.data;
  },

  /**
   * Handle cancelled checkout
   */
  handleCheckoutCancel: async (): Promise<{ message: string }> => {
    const response = await axiosClient.get<{ message: string }>('/orders/checkout/cancel');
    return response.data;
  },
};
