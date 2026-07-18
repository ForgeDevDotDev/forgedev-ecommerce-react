import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cart';
import CartItem from '@/components/CartItem';

export default function CartPage() {
  const { items, total, loading, fetchCart, itemCount } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) return <div className="loading">Cargando...</div>;

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Tu carrito está vacío.</p>
        <Link to="/">← Seguir comprando</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Mi Carrito</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Resumen</h3>
          <div className="summary-line">
            <span>Artículos:</span>
            <span>{itemCount()}</span>
          </div>
          <div className="summary-line total">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn">
            Finalizar compra →
          </Link>
        </div>
      </div>
    </div>
  );
}
