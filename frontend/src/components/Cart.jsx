export function Cart({ items, total, onAdd, onDecrement, onRemove, onConfirm, confirming, error }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">🛒 Carrito</h5>
      </div>

      <div className="card-body">
        {items.length === 0 ? (
          <p className="text-muted mb-0">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="list-group list-group-flush mb-3">
              {items.map((it) => (
                <li key={it.productId} className="list-group-item px-0">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <strong className="d-block">{it.title}</strong>
                      <small className="text-muted">
                        ${it.price.toFixed(2)} c/u
                      </small>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => onRemove(it.productId)}
                      title="Quitar"
                    >
                      ×
                    </button>
                  </div>

                  <div className="d-flex align-items-center mt-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => onDecrement(it.productId)}
                    >
                      −
                    </button>
                    <span className="mx-3">{it.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => onAdd({ id: it.productId, title: it.title, price: it.price, thumbnail: it.thumbnail })}
                      disabled={it.quantity >= 10}
                    >
                      +
                    </button>
                    <span className="ms-auto fw-bold">
                      ${(it.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-3">
              <span className="h5 mb-0">Total</span>
              <span className="h5 mb-0 text-primary">${total.toFixed(2)}</span>
            </div>
          </>
        )}

        {error && (
          <div className="alert alert-danger py-2 mb-3">{error}</div>
        )}

        <button
          className="btn btn-success w-100"
          disabled={items.length === 0 || confirming}
          onClick={onConfirm}
        >
          {confirming ? 'Confirmando...' : 'Confirmar pedido'}
        </button>
      </div>
    </div>
  );
}