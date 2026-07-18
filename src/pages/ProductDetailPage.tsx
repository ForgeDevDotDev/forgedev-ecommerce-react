import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fetchProduct = useProductsStore((state) => state.fetchProduct);
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id).then((data) => {
      if (data) {
        setProduct(data);
      } else {
        setError('Producto no encontrado');
      }
      setLoading(false);
    });
  }, [id, fetchProduct]);

  const handleAddToCart = async () => {
    await addItem(product.id, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return null;

  return (
    <div className="product-detail-layout">
      <div className="product-detail-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="product-image-placeholder">Sin imagen</div>
        )}
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-price">€{product.price.toFixed(2)}</p>
        <p className="description" style={{ color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
          {product.description}
        </p>

        {product.inventory && (
          <div style={{ marginBottom: '20px' }}>
            {product.inventory.stock > 0 ? (
              <span style={{
                color: '#155724',
                background: '#d4edda',
                padding: '8px 12px',
                borderRadius: '4px',
              }}>
                ✓ En stock ({product.inventory.stock} unidades)
              </span>
            ) : (
              <span style={{
                color: '#721c24',
                background: '#f8d7da',
                padding: '8px 12px',
                borderRadius: '4px',
              }}>
                ✗ Agotado
              </span>
            )}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label>Cantidad: </label>
          <input
            type="number"
            min={1}
            max={product.inventory?.stock || 99}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>

        {/* TODO: Add image optimization — images are loaded at full resolution */}
        <button
          onClick={handleAddToCart}
          style={{
            padding: '14px 32px',
            background: '#61dafb',
            color: '#2c3e50',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer',
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
