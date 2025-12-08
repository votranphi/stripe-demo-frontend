import axiosClient from '../axiosClient';
import { 
  UserSubscription, 
  CreateSubscriptionCheckoutRequest, 
  SubscriptionCheckoutResponse,
  PortalSessionResponse 
} from '../../types';

export const subscriptionService = {
  /**
   * Create Stripe checkout session for subscription
   */
  createCheckoutSession: async (data: CreateSubscriptionCheckoutRequest): Promise<SubscriptionCheckoutResponse> => {
    const response = await axiosClient.post<{ success: boolean; data: SubscriptionCheckoutResponse }>('/subscriptions/checkout/create-session', data);
    return response.data.data;
  },

  /**
   * Handle successful subscription checkout
   */
  handleCheckoutSuccess: async (sessionId: string): Promise<{ message: string }> => {
    const response = await axiosClient.get<{ message: string }>(`/subscriptions/checkout/success?session_id=${sessionId}`);
    return response.data;
  },

  /**
   * Handle cancelled subscription checkout
   */
  handleCheckoutCancel: async (): Promise<{ message: string }> => {
    const response = await axiosClient.get<{ message: string }>('/subscriptions/checkout/cancel');
    return response.data;
  },

  /**
   * Get current user's active subscription
   */
  getMySubscription: async (): Promise<UserSubscription | null> => {
    const response = await axiosClient.get<{ success: boolean; data: UserSubscription | null }>('/subscriptions/me');
    return response.data.data;
  },

  /**
   * Create Stripe portal session for managing subscription
   */
  createPortalSession: async (returnUrl: string): Promise<PortalSessionResponse> => {
    const response = await axiosClient.post<{ success: boolean; data: PortalSessionResponse }>('/subscriptions/portal-session', { returnUrl });
    return response.data.data;
  },

  /**
   * Cancel subscription
   */
  cancelSubscription: async (id: string): Promise<void> => {
    await axiosClient.delete(`/subscriptions/${id}`);
  },
};
