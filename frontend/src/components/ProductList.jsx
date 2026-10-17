import { useState } from 'react';
import { ProductCard } from './ProductCard';

export function ProductList({ products, loading, error, onAdd, cartItems }) {
  const [search, setSearch] = useState('');

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2 text-muted">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="alert alert-secondary" role="alert">
        No hay productos disponibles.
      </div>
    );
  }

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  function qtyInCart(productId) {
    const item = cartItems.find((it) => it.productId === productId);
    return item ? item.quantity : 0;
  }

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="alert alert-secondary">
          No hay productos que coincidan con "{search}".
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard
                product={p}
                onAdd={onAdd}
                inCartQty={qtyInCart(p.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}