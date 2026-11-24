import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { orderService } from '../services/orderService';
import { generateOrderId } from '../utils/generateOrderId';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [currency, setCurrency] = useLocalStorage('roc_currency_v1', 'USD');
  const [cart, setCart] = useLocalStorage('roc_cart_v1', []);
  const [activeView, setActiveView] = useState('storefront'); // 'storefront' | 'dashboard'
  const [orders, setOrders] = useState(() => orderService.getOrders());

  // UI Drawer & Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const toggleCurrency = useCallback(() => {
    setCurrency((prev) => (prev === 'USD' ? 'LKR' : 'USD'));
  }, [setCurrency]);

  const addToCart = useCallback(
    (product, selectedVariant, quantity = 1) => {
      if (!product || !selectedVariant) return;

      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.productId === product.id && item.size === selectedVariant.size
        );
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            subtitle: product.subtitle,
            artworkKey: product.artworkKey,
            size: selectedVariant.size,
            unitPrice: selectedVariant.price,
            quantity,
          },
        ];
      });
      setIsCartOpen(true);
    },
    [setCart]
  );

  const updateCartQuantity = useCallback(
    (productId, size, delta) => {
      setCart((prev) =>
        prev
          .map((item) => {
            if (item.productId === productId && item.size === size) {
              const nextQty = item.quantity + delta;
              return nextQty > 0 ? { ...item, quantity: nextQty } : null;
            }
            return item;
          })
          .filter(Boolean)
      );
    },
    [setCart]
  );

  const removeFromCart = useCallback(
    (productId, size) => {
      setCart((prev) =>
        prev.filter((item) => !(item.productId === productId && item.size === size))
      );
    },
    [setCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotals = useMemo(
    () =>
      cart.reduce(
        (acc, item) => ({
          LKR: acc.LKR + item.unitPrice.LKR * item.quantity,
          USD: acc.USD + item.unitPrice.USD * item.quantity,
        }),
        { LKR: 0, USD: 0 }
      ),
    [cart]
  );

  const placeOrder = useCallback(
    (customerDetails) => {
      const newOrderPayload = {
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        status: 'Pending',
        currency,
        customer: customerDetails,
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        total: cartTotals,
      };

      const { order, orders: updatedOrders } = orderService.createOrder(newOrderPayload);
      setOrders(updatedOrders);
      clearCart();
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setCompletedOrder(order);
      return order;
    },
    [cart, cartTotals, currency, clearCart]
  );

  const updateOrderStatus = useCallback((orderId, nextStatus) => {
    const updatedOrders = orderService.updateOrderStatus(orderId, nextStatus);
    setOrders(updatedOrders);
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      toggleCurrency,
      activeView,
      setActiveView,
      cart,
      cartCount,
      cartTotals,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      completedOrder,
      setCompletedOrder,
      orders,
      placeOrder,
      updateOrderStatus,
    }),
    [
      currency,
      setCurrency,
      toggleCurrency,
      activeView,
      cart,
      cartCount,
      cartTotals,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      isCartOpen,
      isCheckoutOpen,
      completedOrder,
      orders,
      placeOrder,
      updateOrderStatus,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
