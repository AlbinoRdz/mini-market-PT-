import { useEffect, useState } from 'react';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { OrderHistory } from './components/OrderHistory';
import { useCart } from './hooks/useCart';
import { getProducts, createOrder, getOrders } from './api/client';

function App() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const [confirming, setConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState(null);

  const cart = useCart();

  async function loadProducts() {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setProductsError(err.message);
    } finally {
      setProductsLoading(false);
    }
  }

  async function loadOrders() {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setOrdersError(err.message);
    } finally {
      setOrdersLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  async function handleConfirm() {
    setConfirming(true);
    setConfirmError(null);
    try {
      const items = cart.items.map((it) => ({
        productId: it.productId,
        quantity: it.quantity,
      }));

      await createOrder(items);

      cart.clear();
      await loadOrders();
    } catch (err) {
      setConfirmError(err.message);
    } finally {
      setConfirming(false);
    }
  }

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="text-primary"> Mini Marketplace</h1>
        
      </header>

      <div className="row g-4">
        <div className="col-lg-8">
          <h4 className="mb-3">Productos</h4>
          <ProductList
            products={products}
            loading={productsLoading}
            error={productsError}
            onAdd={cart.addProduct}
            cartItems={cart.items}
          />
        </div>

        <div className="col-lg-4">
          <div className="position-sticky" style={{ top: '1rem' }}>
            <Cart
              items={cart.items}
              total={cart.total}
              onAdd={cart.addProduct}
              onDecrement={cart.decrement}
              onRemove={cart.removeProduct}
              onConfirm={handleConfirm}
              confirming={confirming}
              error={confirmError}
            />

            <div className="card shadow-sm mt-4">
              <div className="card-header">
                <h5 className="mb-0"> Historial de pedidos</h5>
              </div>
              <div className="card-body">
                <OrderHistory
                  orders={orders}
                  loading={ordersLoading}
                  error={ordersError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;