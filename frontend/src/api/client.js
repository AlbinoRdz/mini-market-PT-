const BASE = '/api';

export async function getProducts() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error al cargar productos');
  }
  const data = await res.json();
  return data.products;
}

export async function createOrder(items) {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Error al confirmar el pedido');
  }
  return data;
}

export async function getOrders() {
  const res = await fetch(`${BASE}/orders`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error al cargar pedidos');
  }
  const data = await res.json();
  return data.orders;
}