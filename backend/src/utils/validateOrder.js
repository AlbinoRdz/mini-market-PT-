function validateOrderBody(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, status: 400, message: 'El body debe ser un objeto JSON' };
  }

  const { items } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, status: 400, message: 'items debe ser un arreglo no vacío' };
  }

  const seen = new Set();

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return { valid: false, status: 400, message: 'Cada item debe ser un objeto' };
    }

    const { productId, quantity } = item;

    if (!Number.isInteger(productId) || productId <= 0) {
      return { valid: false, status: 400, message: 'productId debe ser un entero positivo' };
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return { valid: false, status: 400, message: 'La cantidad debe ser un entero entre 1 y 10' };
    }

    if (seen.has(productId)) {
      return { valid: false, status: 400, message: 'Un mismo productId no puede aparecer dos veces' };
    }

    seen.add(productId);
  }

  return { valid: true };
}

module.exports = { validateOrderBody };