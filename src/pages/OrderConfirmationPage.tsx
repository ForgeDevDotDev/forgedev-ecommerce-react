import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrdersStore } from '@/stores/orders';

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const { currentOrder, loading, fetchOrder } = useOrdersStore();

  useEffect(() => {
    if (id) fetchOrder(id);
  }, [id, fetchOrder]);

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
      <div className="confirmation-card">
        <div className="check-icon">✓</div>
        <h1>¡Pedido confirmado!</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>Pedido #{id}</p>

        {currentOrder && (
          <div style={{ textAlign: 'left', marginTop: '24px' }}>
            <div className="summary-line">
              <span>Total:</span>
              <span>€{currentOrder.total.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Estado:</span>
              <span>{currentOrder.status}</span>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
              <h3>Productos</h3>
              {currentOrder.items.map((item: any) => (
                <div
                  key={item.id}
                  className="summary-line"
                  style={{ fontSize: '0.9rem', padding: '4px 0' }}
                >
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '32px' }}>
          <Link to="/" style={{ color: '#61dafb', textDecoration: 'none' }}>
            ← Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
