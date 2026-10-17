import { useState, useEffect } from 'react';

const STORAGE_KEY = 'mini-market-cart';
const MAX_QTY = 10;

export function useCart() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addProduct(product) {
    setItems((prev) => {
      const existing = prev.find((it) => it.productId === product.id);
      if (existing) {
        if (existing.quantity >= MAX_QTY) return prev;
        return prev.map((it) =>
          it.productId === product.id
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ];
    });
  }

  function decrement(productId) {
    setItems((prev) =>
      prev
        .map((it) =>
          it.productId === productId
            ? { ...it, quantity: it.quantity - 1 }
            : it
        )
        .filter((it) => it.quantity > 0)
    );
  }

  function removeProduct(productId) {
    setItems((prev) => prev.filter((it) => it.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce(
    (acc, it) => acc + it.price * it.quantity,
    0
  );

  const totalItems = items.reduce((acc, it) => acc + it.quantity, 0);

  return {
    items,
    total: Math.round(total * 100) / 100,
    totalItems,
    addProduct,
    decrement,
    removeProduct,
    clear,
    MAX_QTY,
  };
}