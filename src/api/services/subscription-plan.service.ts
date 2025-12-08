import axiosClient from '../axiosClient';
import { SubscriptionPlan } from '../../types';

export const subscriptionPlanService = {
  /**
   * Get all subscription plans
   */
  getAllPlans: async (): Promise<SubscriptionPlan[]> => {
    const response = await axiosClient.get<SubscriptionPlan[]>('/subscription-plans');
    return response.data;
  },

  /**
   * Get subscription plan by ID
   */
  getPlanById: async (id: string): Promise<SubscriptionPlan> => {
    const response = await axiosClient.get<SubscriptionPlan>(`/subscription-plans/${id}`);
    return response.data;
  },

  /**
   * Create subscription plan (Admin only)
   */
  createPlan: async (data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> => {
    const response = await axiosClient.post<SubscriptionPlan>('/subscription-plans', data);
    return response.data;
  },

  /**
   * Update subscription plan (Admin only)
   */
  updatePlan: async (id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> => {
    const response = await axiosClient.put<SubscriptionPlan>(`/subscription-plans/${id}`, data);
    return response.data;
  },

  /**
   * Delete subscription plan (Admin only)
   */
  deletePlan: async (id: string): Promise<void> => {
    await axiosClient.delete(`/subscription-plans/${id}`);
  },
};
