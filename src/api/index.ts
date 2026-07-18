import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// FIXME: No auth interceptor yet
// TODO: Add request interceptor for auth tokens
// TODO: Add response interceptor for error handling

export default {
  // Products
  getProducts(params?: { page?: number; limit?: number; search?: string; categoryId?: string }) {
    return api.get('/products', { params });
  },
  getProduct(id: string) {
    return api.get(`/products/${id}`);
  },
  createProduct(data: any) {
    return api.post('/products', data);
  },
  updateProduct(id: string, data: any) {
    return api.put(`/products/${id}`, data);
  },
  deleteProduct(id: string) {
    return api.delete(`/products/${id}`);
  },

  // Cart
  getCart(cartId?: string) {
    return api.get('/cart', { params: { cartId } });
  },
  addToCart(cartId: string | null, productId: string, quantity: number) {
    return api.post('/cart/add', { cartId, productId, quantity });
  },
  removeFromCart(itemId: string) {
    return api.delete(`/cart/${itemId}`);
  },
  clearCart(cartId: string) {
    return api.delete(`/cart/clear/${cartId}`);
  },

  // Orders
  getOrders(page?: number) {
    return api.get('/orders', { params: { page } });
  },
  getOrder(id: string) {
    return api.get(`/orders/${id}`);
  },
  createOrder(cartId: string, userEmail?: string) {
    return api.post('/orders', { cartId, userEmail });
  },

  // Categories
  getCategories() {
    return api.get('/categories');
  },
  createCategory(data: any) {
    return api.post('/categories', data);
  },

  // Inventory
  getInventory() {
    return api.get('/inventory');
  },
  getLowStock() {
    return api.get('/inventory/low-stock');
  },
  updateStock(productId: string, stock: number) {
    return api.put(`/inventory/${productId}`, { stock });
  },
};
