const test = require('node:test');
const assert = require('node:assert');
const { validateOrderBody } = require('../src/utils/validateOrder');

test('rechaza body sin items', () => {
  const result = validateOrderBody({});
  assert.strictEqual(result.valid, false);
  assert.strictEqual(result.status, 400);
});

test('rechaza items vacío', () => {
  const result = validateOrderBody({ items: [] });
  assert.strictEqual(result.valid, false);
  assert.strictEqual(result.status, 400);
});

test('rechaza quantity mayor a 10', () => {
  const result = validateOrderBody({
    items: [{ productId: 1, quantity: 11 }],
  });
  assert.strictEqual(result.valid, false);
  assert.strictEqual(result.status, 400);
});

test('rechaza quantity 0', () => {
  const result = validateOrderBody({
    items: [{ productId: 1, quantity: 0 }],
  });
  assert.strictEqual(result.valid, false);
});

test('rechaza productId duplicado', () => {
  const result = validateOrderBody({
    items: [
      { productId: 1, quantity: 1 },
      { productId: 1, quantity: 2 },
    ],
  });
  assert.strictEqual(result.valid, false);
  assert.match(result.message, /dos veces/);
});

test('rechaza productId no entero', () => {
  const result = validateOrderBody({
    items: [{ productId: 1.5, quantity: 1 }],
  });
  assert.strictEqual(result.valid, false);
});

test('acepta un pedido válido', () => {
  const result = validateOrderBody({
    items: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ],
  });
  assert.strictEqual(result.valid, true);
});