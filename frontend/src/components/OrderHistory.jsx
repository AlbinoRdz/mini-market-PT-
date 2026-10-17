export function OrderHistory({ orders, loading, error }) {
  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm text-secondary" role="status" />
        <span className="ms-2 text-muted">Cargando pedidos...</span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger py-2">{error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <p className="text-muted">Aún no hay pedidos.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th className="text-end">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>
                <code className="small">{o.id}</code>
              </td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td className="text-end fw-bold">${o.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}