import axiosClient from '../axiosClient';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../types';

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * Logout user (client-side only)
   */
  logout: (): void => {
    localStorage.removeItem('authToken');
  },

  /**
   * Get stored auth token
   */
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  /**
   * Store auth token
   */
  setToken: (token: string): void => {
    localStorage.setItem('authToken', token);
  },
};
