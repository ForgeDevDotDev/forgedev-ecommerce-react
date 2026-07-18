import StockDashboard from '@/components/StockDashboard';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <StockDashboard />
      {/* TODO: Add order management section */}
      {/* TODO: Add product CRUD interface */}
    </div>
  );
}
