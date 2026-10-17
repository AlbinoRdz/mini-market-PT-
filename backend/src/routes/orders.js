const express = require('express');
const { validateOrderBody } = require('../utils/validateOrder');
const { createOrder, listOrders } = require('../services/orders');

const router = express.Router();

router.post('/', async (req, res) => {
  const validation = validateOrderBody(req.body);
  if (!validation.valid) {
    return res.status(validation.status).json({ message: validation.message });
  }

  const result = await createOrder(req.body.items);
  if (!result.ok) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(201).json(result.order);
});

router.get('/', (req, res) => {
  res.json({ orders: listOrders() });
});

module.exports = router;