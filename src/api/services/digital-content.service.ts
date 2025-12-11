import axiosClient from '../axiosClient';

export interface DigitalContentResponse {
  content: string;
}

export const digitalContentService = {
  /**
   * Get premium digital content (Requires active subscription)
   */
  getContent: async (): Promise<DigitalContentResponse> => {
    const response = await axiosClient.get<{ success: boolean; data: DigitalContentResponse }>('/digital-content');
    return response.data.data;
  }
};