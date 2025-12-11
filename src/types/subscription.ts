export enum SubscriptionFrequency {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export interface SubscriptionPlan {
  id: string;
  stripePriceId: string;
  productId: string;
  frequency: SubscriptionFrequency;
  currency: string;
  createdAt?: Date;
  product?: {
    id: string;
    name: string;
    price: number;
  };
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  stripeSubscriptionId: string;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt?: Date;
}

export interface CreateSubscriptionCheckoutRequest {
  planId: string;
}

export interface SubscriptionCheckoutResponse {
  checkoutUrl: string;
}

export interface PortalSessionResponse {
  portalUrl: string;
}
