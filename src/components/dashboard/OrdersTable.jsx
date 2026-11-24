import React from 'react';
import { Eye, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { ORDER_STATUSES } from '../../services/orderService';
import { OrderStatusBadge } from './OrderStatusBadge';

export function OrdersTable({ orders, onSelectOrder }) {
  const { currency, updateOrderStatus } = useStore();

  if (orders.length === 0) {
    return (
      <div className="luxury-card rounded-2xl p-12 text-center">
        <p className="font-serif text-2xl text-[var(--text-primary)]">No matching orders found</p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Try clearing your search query or switching the status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="luxury-card overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border-gold)] bg-[var(--bg-secondary)] text-[11px] font-semibold tracking-[0.18em] text-[var(--text-secondary)] uppercase transition-colors duration-300">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total ({currency})</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {orders.map((order) => {
              const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
              return (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-[var(--bg-secondary)]/60"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-mono text-xs font-semibold text-[var(--accent-gold)]">
                      {order.id}
                    </span>
                    <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[var(--text-primary)]">{order.customer.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{order.customer.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)]/90">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      {order.customer.country}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs text-[var(--text-secondary)]">
                    {itemCount} {itemCount === 1 ? 'pack' : 'packs'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-[var(--text-primary)]">
                    {formatCurrency(order.total?.[currency] ?? 0, currency)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <OrderStatusBadge status={order.status} />
                      <select
                        aria-label={`Update status for ${order.id}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="rounded-lg border border-[var(--border-gold)] bg-[var(--bg-secondary)] px-2 py-1 text-xs text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none cursor-pointer transition-colors duration-300"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectOrder(order)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-gold)] bg-[var(--bg-secondary)] px-3.5 py-1.5 text-xs font-medium text-[var(--accent-gold)] hover:border-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/12 transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
