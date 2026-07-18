import { useEffect } from 'react';
import { useProductsStore } from '@/stores/products';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';

export default function StorefrontPage() {
  const { products, loading, error, page, totalPages, fetchProducts, nextPage, prevPage } =
    useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h1>Tienda Online</h1>
      <SearchBar />
      <div className="store-layout">
        <FilterSidebar />
        <div className="products-area">
          {loading && <div className="loading">Cargando productos...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && products.length === 0 && (
            <div className="empty-state">No se encontraron productos.</div>
          )}
          {!loading && !error && products.length > 0 && (
            <>
              <div className="product-grid">
                {/* BUG: missing key prop — ProductCard doesn't receive a key */}
                {products.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button onClick={prevPage} disabled={page <= 1}>
                    ← Anterior
                  </button>
                  <span>
                    Página {page} de {totalPages}
                  </span>
                  <button onClick={nextPage} disabled={page >= totalPages}>
                    Siguiente →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
