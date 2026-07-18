import { useCartStore } from '@/stores/cart';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await addItem(product.id, 1);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {product.image ? (
        <img src={product.image} alt={product.name} className="product-image" />
      ) : (
        <div className="product-image-placeholder">Sin imagen</div>
      )}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">€{product.price.toFixed(2)}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
