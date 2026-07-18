import { useState } from 'react';
import { useCartStore } from '@/stores/cart';
import { useOrdersStore } from '@/stores/orders';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
  const cart = useCartStore();
  const createOrder = useOrdersStore((state) => state.createOrder);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.cartId) return;
    setSubmitting(true);
    try {
      const order = await createOrder(cart.cartId, email);
      if (order) {
        await cart.clearCart();
        navigate(`/order-confirmation/${order.id}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Datos de envío</h2>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Nombre completo</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Dirección</label>
        <input
          id="address"
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Ciudad</label>
        <input
          id="city"
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="zip">Código postal</label>
        <input
          id="zip"
          type="text"
          required
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </div>

      <h2>Pago</h2>
      {/* TODO: Implement payment gateway integration */}
      <p className="payment-notice">
        ⚠️ El pago se procesará contra reembolso. Integración de pasarela pendiente.
      </p>

      <div className="order-summary">
        <h3>Resumen del pedido</h3>
        <div className="summary-line">
          <span>Total productos:</span>
          <span>{cart.itemCount()}</span>
        </div>
        <div className="summary-line total">
          <span>Total:</span>
          <span>€{cart.total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={cart.items.length === 0 || submitting}
        className="submit-btn"
      >
        {submitting ? 'Procesando...' : 'Confirmar pedido'}
      </button>
    </form>
  );
}
