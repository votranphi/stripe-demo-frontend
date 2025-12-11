import axiosClient from '../axiosClient';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../types';

export const productService = {
  /**
   * Get all products
   */
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axiosClient.get<{ success: boolean; data: Product[] }>('/products');
    return response.data.data;
  },

  /**
   * Get product by ID
   */
  getProductById: async (id: string): Promise<Product> => {
    const response = await axiosClient.get<{ success: boolean; data: Product }>(`/products/${id}`);
    return response.data.data;
  },

  /**
   * Create a new product (Admin only)
   */
  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    const response = await axiosClient.post<{ success: boolean; data: Product }>('/products', data);
    return response.data.data;
  },

  /**
   * Update product (Admin only)
   */
  updateProduct: async (id: string, data: UpdateProductRequest): Promise<Product> => {
    const response = await axiosClient.put<{ success: boolean; data: Product }>(`/products/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete product (Admin only)
   */
  deleteProduct: async (id: string): Promise<void> => {
    await axiosClient.delete(`/products/${id}`);
  },
};
