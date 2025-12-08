export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderLineItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  lineItems: OrderLineItem[];
  status: OrderStatus;
  userId: string;
  totalAmount?: number;
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface CheckoutSessionResponse {
  checkoutUrl: string;
}
