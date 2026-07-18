import { useState } from 'react';
import { useProductsStore } from '@/stores/products';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const setSearch = useProductsStore((state) => state.setSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
