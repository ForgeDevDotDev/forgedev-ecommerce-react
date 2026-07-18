import { create } from 'zustand';
import api from '@/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  categoryId: string;
  inventory?: { stock: number };
}

interface ProductsState {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<Product | null>;
  setSearch: (query: string) => void;
  setCategory: (categoryId: string | null) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const params: any = {
        page: state.page,
        limit: 12,
      };
      if (state.searchQuery) params.search = state.searchQuery;
      if (state.selectedCategory) params.categoryId = state.selectedCategory;

      const response = await api.getProducts(params);
      // Handle inconsistent response format
      const data = response.data.data || response.data;
      set({
        products: data,
        total: response.data.pagination?.total || 0,
        totalPages: response.data.pagination?.totalPages || 1,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch products', loading: false });
    }
  },

  fetchProduct: async (id: string) => {
    try {
      const response = await api.getProduct(id);
      return response.data.data || response.data;
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch product' });
      return null;
    }
  },

  setSearch: (query: string) => {
    set({ searchQuery: query, page: 1 });
    get().fetchProducts();
  },

  setCategory: (categoryId: string | null) => {
    // BUG: page is not reset to 1 on category change
    // This causes broken pagination — you might be on page 3 of the new category which has fewer pages
    set({ selectedCategory: categoryId });
    get().fetchProducts();
  },

  nextPage: () => {
    const state = get();
    if (state.page < state.totalPages) {
      set({ page: state.page + 1 });
      get().fetchProducts();
    }
  },

  prevPage: () => {
    const state = get();
    if (state.page > 1) {
      set({ page: state.page - 1 });
      get().fetchProducts();
    }
  },
}));
