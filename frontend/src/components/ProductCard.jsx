export function ProductCard({ product, onAdd, inCartQty }) {
  const atMax = inCartQty >= 10;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
        style={{ height: '160px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <p className="text-primary fw-bold mb-2">${product.price.toFixed(2)}</p>

        {inCartQty > 0 && (
          <small className="text-muted mb-2">En carrito: {inCartQty}</small>
        )}

        <button
          className="btn btn-primary btn-sm mt-auto"
          onClick={() => onAdd(product)}
          disabled={atMax}
        >
          {atMax ? 'Máximo alcanzado' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}