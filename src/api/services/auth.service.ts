import axiosClient from '../axiosClient';
import { AuthResponse, LoginRequest, RegisterRequest, UserRole } from '../../types';

// Backend response structure
interface BackendAuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    userId: string;
    email: string;
    role: string;
  };
}

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<BackendAuthResponse>('/auth/register', data);
    // Map backend response to frontend AuthResponse structure
    return {
      token: response.data.data.token,
      user: {
        id: response.data.data.userId,
        email: response.data.data.email,
        role: response.data.data.role as UserRole,
      },
    };
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<BackendAuthResponse>('/auth/login', data);
    // Map backend response to frontend AuthResponse structure
    return {
      token: response.data.data.token,
      user: {
        id: response.data.data.userId,
        email: response.data.data.email,
        role: response.data.data.role as UserRole,
      },
    };
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
