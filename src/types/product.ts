export enum ProductType {
  ONE_TIME = 'ONE_TIME',
  SUBSCRIPTION = 'SUBSCRIPTION'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  type: ProductType;
  createdAt?: Date;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  stock: number;
  type: ProductType;
}

export interface UpdateProductRequest {
  name?: string;
  price?: number;
  stock?: number;
  type?: ProductType;
}
