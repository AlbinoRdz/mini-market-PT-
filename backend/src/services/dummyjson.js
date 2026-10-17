const DUMMYJSON_URL = 'https://dummyjson.com/products?limit=20';

async function fetchProducts() {
  const response = await fetch(DUMMYJSON_URL);
  if (!response.ok) {
    throw new Error('Error al consultar el catálogo externo');
  }
  const data = await response.json();
  return data.products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    thumbnail: p.thumbnail,
  }));
}

module.exports = { fetchProducts };