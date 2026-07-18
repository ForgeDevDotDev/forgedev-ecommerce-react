import { useCartStore } from '@/stores/cart';

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
      image: string | null;
    };
  };
}

export default function CartItem({ item }: CartItemProps) {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrease = () => {
    addItem(item.productId, 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      // TODO: should have updateQuantity instead of remove + re-add
      removeItem(item.id);
      addItem(item.productId, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="cart-item">
      {item.product.image && (
        <img
          src={item.product.image}
          alt={item.product.name}
          className="cart-item-image"
        />
      )}
      <div className="cart-item-details">
        <h4>{item.product.name}</h4>
        <p className="price">{item.product.price.toFixed(2)} EUR</p>
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>
      <div className="cart-item-actions">
        <p className="line-total">
          €{(item.product.price * item.quantity).toFixed(2)}
        </p>
        <button className="remove-btn" onClick={handleRemove}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
