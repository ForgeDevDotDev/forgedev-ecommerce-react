import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCartStore } from '@/stores/cart';
import StorefrontPage from '@/pages/StorefrontPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';

export default function App() {
  const location = useLocation();
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="nav-brand">🛒 ForgeDev Shop</Link>
        <div className="nav-links">
          <Link to="/">Tienda</Link>
          <Link to="/cart">
            Carrito (<CartCount />)
          </Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<StorefrontPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

function CartCount() {
  const itemCount = useCartStore((state) => state.itemCount());
  return <>{itemCount}</>;
}
