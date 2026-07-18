import { useState, useEffect } from 'react';
import api from '@/api';

export default function StockDashboard() {
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    // BUG: This component fetches data directly instead of using a store
    // Should use a useInventoryStore or similar
    api.getInventory()
      .then((response) => setInventory(response.data.data))
      .catch((err) => console.error('Failed to fetch inventory', err));
  }, []);

  const lowStockItems = inventory.filter((item) => item.stock <= 10);

  const handleRestock = async (productId: string, currentStock: number) => {
    try {
      await api.updateStock(productId, currentStock + 10);
      setInventory((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, stock: currentStock + 10 }
            : item
        )
      );
    } catch (err) {
      console.error('Failed to restock', err);
    }
  };

  const stockClass = (stock: number) => {
    if (stock <= 5) return 'badge critical';
    if (stock <= 10) return 'badge low';
    return 'badge ok';
  };

  const stockLabel = (stock: number) => {
    if (stock <= 5) return 'Crítico';
    if (stock <= 10) return 'Bajo';
    return 'OK';
  };

  return (
    <div className="stock-dashboard">
      <h2>Inventario</h2>

      {lowStockItems.length > 0 && (
        <div className="low-stock-alert">
          ⚠️ {lowStockItems.length} productos con stock bajo
        </div>
      )}

      <table className="stock-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* BUG: Missing key prop warning — using item.id but inventory items might not have unique id */}
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>{item.stock}</td>
              <td>
                <span className={stockClass(item.stock)}>
                  {stockLabel(item.stock)}
                </span>
              </td>
              <td>
                <button onClick={() => handleRestock(item.productId, item.stock)}>
                  Reponer +10
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
