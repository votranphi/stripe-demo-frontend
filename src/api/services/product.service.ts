import axiosClient from '../axiosClient';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../types';

export const productService = {
  /**
   * Get all products
   */
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axiosClient.get<Product[]>('/products');
    return response.data;
  },

  /**
   * Get product by ID
   */
  getProductById: async (id: string): Promise<Product> => {
    const response = await axiosClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  /**
   * Create a new product (Admin only)
   */
  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    const response = await axiosClient.post<Product>('/products', data);
    return response.data;
  },

  /**
   * Update product (Admin only)
   */
  updateProduct: async (id: string, data: UpdateProductRequest): Promise<Product> => {
    const response = await axiosClient.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  /**
   * Delete product (Admin only)
   */
  deleteProduct: async (id: string): Promise<void> => {
    await axiosClient.delete(`/products/${id}`);
  },
};
