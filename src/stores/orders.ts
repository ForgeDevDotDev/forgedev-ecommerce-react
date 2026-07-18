import { create } from 'zustand';
import api from '@/api';

interface Order {
  id: string;
  total: number;
  status: string;
  items: any[];
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  fetchOrder: (id: string) => Promise<void>;
  createOrder: (cartId: string, email?: string) => Promise<Order | null>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const response = await api.getOrders();
      set({ orders: response.data.data || response.data, loading: false });
    } catch (err: any) {
      // Inconsistent error handling — some places use console.error, some set error state
      console.error('Failed to fetch orders:', err);
      set({ loading: false });
    }
  },

  fetchOrder: async (id: string) => {
    set({ loading: true });
    try {
      const response = await api.getOrder(id);
      set({ currentOrder: response.data.data || response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch order', loading: false });
    }
  },

  createOrder: async (cartId: string, email?: string) => {
    set({ loading: true });
    try {
      const response = await api.createOrder(cartId, email);
      const order = response.data.data;
      set({ currentOrder: order, loading: false });
      return order;
    } catch (err: any) {
      set({ error: err.message || 'Failed to create order', loading: false });
      return null;
    }
  },
}));
