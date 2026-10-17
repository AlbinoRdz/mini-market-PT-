const orders = [];

function getAll() {
  return orders;
}

function add(order) {
  orders.push(order);
  return order;
}

module.exports = { getAll, add };