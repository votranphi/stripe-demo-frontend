import { create } from 'zustand';
import { Order } from '../types';

interface CartState {
  cart: Order | null;
  itemCount: number;
  totalAmount: number;
  setCart: (cart: Order | null) => void;
  updateCartMetrics: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  itemCount: 0,
  totalAmount: 0,

  setCart: (cart) => {
    set({ cart });
    get().updateCartMetrics();
  },

  updateCartMetrics: () => {
    const { cart } = get();
    if (cart && cart.lineItems) {
      const itemCount = cart.lineItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = cart.lineItems.reduce((sum, item) => sum + (item.price * item.quantity / 100), 0);
      set({ itemCount, totalAmount });
    } else {
      set({ itemCount: 0, totalAmount: 0 });
    }
  },

  clearCart: () => {
    set({ cart: null, itemCount: 0, totalAmount: 0 });
  },
}));
