import { INITIAL_ORDERS } from '../data/initialOrders';

const ORDERS_STORAGE_KEY = 'roots_of_ceylon_orders_v1';

export const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered'];

/**
 * Order Service Abstraction Layer
 * -------------------------------
 * Currently backed by localStorage for zero-backend operation.
 * Swap these method bodies with fetch/axios/Supabase/Firebase calls
 * without touching any UI components or StoreContext consumers.
 */
export const orderService = {
  /**
   * Fetch all orders sorted newest first.
   * @returns {Array}
   */
  getOrders() {
    if (typeof window === 'undefined') return INITIAL_ORDERS;

    try {
      const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
      if (!raw) {
        window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
        return INITIAL_ORDERS;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : INITIAL_ORDERS;
    } catch (error) {
      console.warn('orderService.getOrders failed:', error);
      return INITIAL_ORDERS;
    }
  },

  /**
   * Retrieve a single order by ID.
   * @param {string} orderId
   * @returns {object | null}
   */
  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find((order) => order.id === orderId) || null;
  },

  /**
   * Persist a new order and return the updated orders list.
   * @param {object} newOrder
   * @returns {{ order: object, orders: Array }}
   */
  createOrder(newOrder) {
    const existing = this.getOrders();
    const orderRecord = {
      ...newOrder,
      createdAt: newOrder.createdAt || new Date().toISOString(),
      status: newOrder.status || 'Pending',
    };
    const updated = [orderRecord, ...existing];
    this._saveOrders(updated);
    return { order: orderRecord, orders: updated };
  },

  /**
   * Update the status of an existing order.
   * @param {string} orderId
   * @param {'Pending' | 'Processing' | 'Shipped' | 'Delivered'} nextStatus
   * @returns {Array}
   */
  updateOrderStatus(orderId, nextStatus) {
    if (!ORDER_STATUSES.includes(nextStatus)) {
      throw new Error(`Invalid order status: ${nextStatus}`);
    }
    const updated = this.getOrders().map((order) =>
      order.id === orderId ? { ...order, status: nextStatus } : order
    );
    this._saveOrders(updated);
    return updated;
  },

  /**
   * Delete an order by ID.
   * @param {string} orderId
   * @returns {Array}
   */
  deleteOrder(orderId) {
    const updated = this.getOrders().filter((order) => order.id !== orderId);
    this._saveOrders(updated);
    return updated;
  },

  /**
   * Reset stored orders back to seed data.
   * @returns {Array}
   */
  resetOrders() {
    this._saveOrders(INITIAL_ORDERS);
    return INITIAL_ORDERS;
  },

  _saveOrders(orders) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.warn('orderService._saveOrders failed:', error);
    }
  },
};
