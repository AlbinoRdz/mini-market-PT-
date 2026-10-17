const express = require('express');
const { fetchProducts } = require('../services/dummyjson');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json({ products });
  } catch (error) {
    res.status(502).json({ message: 'No se pudo obtener el catálogo externo' });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'El id debe ser un entero positivo' });
  }

  try {
    const products = await fetchProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({ message: `Producto ${id} no encontrado` });
    }

    res.json({ product });
  } catch (error) {
    res.status(502).json({ message: 'No se pudo obtener el catálogo externo' });
  }
});

module.exports = router;