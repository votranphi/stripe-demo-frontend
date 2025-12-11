import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

class AxiosClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - inject JWT token
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors globally
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
        // Handle different error scenarios
        if (error.response) {
          const { status, data } = error.response;

          // Handle specific status codes
          switch (status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              localStorage.removeItem('authToken');
              if (window.location.pathname !== '/login') {
                toast.error('Session expired. Please login again.');
                window.location.href = '/login';
              }
              break;
            
            case 403:
              toast.error('You do not have permission to perform this action.');
              break;
            
            case 404:
              toast.error('Resource not found.');
              break;
            
            case 422:
              // Validation errors
              if (data.errors) {
                Object.values(data.errors).forEach((errorMessages) => {
                  errorMessages.forEach((msg) => toast.error(msg));
                });
              } else if (data.message) {
                toast.error(data.message);
              }
              break;
            
            case 500:
              toast.error('Server error. Please try again later.');
              break;
            
            default:
              if (data.message) {
                toast.error(data.message);
              } else {
                toast.error('An unexpected error occurred.');
              }
          }
        } else if (error.request) {
          // Network error
          toast.error('Network error. Please check your connection.');
        } else {
          toast.error('An unexpected error occurred.');
        }

        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const axiosClient = new AxiosClient().getInstance();
export default axiosClient;
