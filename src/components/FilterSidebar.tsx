import { useState, useEffect } from 'react';
import { useProductsStore } from '@/stores/products';
import api from '@/api';

export default function FilterSidebar() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const setCategory = useProductsStore((state) => state.setCategory);

  useEffect(() => {
    api.getCategories()
      .then((response) => setCategories(response.data))
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  const handleSelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCategory(categoryId);
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filtros</h3>
      <div className="filter-group">
        <h4>Categorías</h4>
        <label>
          <input
            type="radio"
            checked={!selectedCategory}
            onChange={() => handleSelect(null)}
          />
          Todas
        </label>
        {categories.map((cat) => (
          <label key={cat.id}>
            <input
              type="radio"
              checked={selectedCategory === cat.id}
              onChange={() => handleSelect(cat.id)}
            />
            {cat.name}
          </label>
        ))}
      </div>
      {/* TODO: Add price range filter */}
      {/* TODO: Add sort options */}
    </aside>
  );
}
