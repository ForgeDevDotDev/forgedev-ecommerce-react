import { create } from 'zustand';
import api from '@/api';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string | null;
  };
}

interface CartState {
  cartId: string | null;
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartId: null,
  items: [],
  total: 0,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const response = await api.getCart(get().cartId || undefined);
      const cartData = response.data.data;
      set({
        cartId: cartData.id,
        items: cartData.items || [],
        total: response.data.total || 0,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch cart', loading: false });
    }
  },

  addItem: async (productId: string, quantity: number = 1) => {
    try {
      await api.addToCart(get().cartId, productId, quantity);
      await get().fetchCart();
    } catch (err: any) {
      set({ error: err.message || 'Failed to add item' });
    }
  },

  removeItem: async (itemId: string) => {
    try {
      await api.removeFromCart(itemId);
      const items = get().items.filter((item) => item.id !== itemId);
      // Recalculate total
      let total = 0;
      for (const item of items) {
        total += item.product.price * item.quantity;
      }
      // BUG: floating point precision — 19.99 * 3 = 59.96999999999999
      // Should use a decimal library or integer math (cents)
      set({ items, total });
    } catch (err: any) {
      set({ error: err.message || 'Failed to remove item' });
    }
  },

  clearCart: async () => {
    const cartId = get().cartId;
    if (!cartId) return;
    try {
      await api.clearCart(cartId);
      set({ items: [], total: 0 });
    } catch (err: any) {
      set({ error: err.message || 'Failed to clear cart' });
    }
  },

  itemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
