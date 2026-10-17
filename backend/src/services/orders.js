const { fetchProducts } = require('./dummyjson');
const memory = require('../store/memory');

function round2(n) {
  return Math.round(n * 100) / 100;
}

async function createOrder(items) {
  let catalog;
  try {
    catalog = await fetchProducts();
  } catch (error) {
    return { ok: false, status: 502, message: 'No se pudo obtener el catálogo externo' };
  }

  const catalogById = new Map(catalog.map((p) => [p.id, p]));
  const orderItems = [];

  for (const { productId, quantity } of items) {
    const product = catalogById.get(productId);
    if (!product) {
      return { ok: false, status: 404, message: `Producto ${productId} no encontrado` };
    }

    const unitPrice = round2(product.price);
    const subtotal = round2(unitPrice * quantity);

    orderItems.push({
      productId: product.id,
      title: product.title,
      unitPrice,
      quantity,
      subtotal,
    });
  }

  const total = round2(orderItems.reduce((acc, it) => acc + it.subtotal, 0));

  const order = {
    id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    items: orderItems,
    total,
    createdAt: new Date().toISOString(),
  };

  try {
    memory.add(order);
  } catch (error) {
    return { ok: false, status: 500, message: 'Error al guardar el pedido' };
  }

  return { ok: true, order };
}

function listOrders() {
  return [...memory.getAll()].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

module.exports = { createOrder, listOrders };