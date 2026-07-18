import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cart';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No puedes finalizar la compra con el carrito vacío.</p>
        <Link to="/">← Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Finalizar Compra</h1>
      <CheckoutForm />
    </div>
  );
}
