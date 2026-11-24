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
        <p className="font-serif text-2xl text-[#F5F2EB]">No matching orders found</p>
        <p className="mt-2 text-sm text-[#B8B2A6]">
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
            <tr className="border-b border-[#E3B025]/20 bg-[#1A1919]/70 text-[11px] font-semibold tracking-[0.18em] text-[#B8B2A6] uppercase">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total ({currency})</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3B025]/10">
            {orders.map((order) => {
              const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
              return (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-[#1A1919]/45"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-mono text-xs font-semibold text-[#E3B025]">
                      {order.id}
                    </span>
                    <p className="mt-0.5 text-[11px] text-[#B8B2A6]">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#F5F2EB]">{order.customer.name}</p>
                    <p className="text-xs text-[#B8B2A6]">{order.customer.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#F5F2EB]/85">
                      <MapPin className="w-3.5 h-3.5 text-[#E3B025]" />
                      {order.customer.country}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs text-[#B8B2A6]">
                    {itemCount} {itemCount === 1 ? 'pack' : 'packs'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-[#F5F2EB]">
                    {formatCurrency(order.total?.[currency] ?? 0, currency)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <OrderStatusBadge status={order.status} />
                      <select
                        aria-label={`Update status for ${order.id}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="rounded-lg border border-[#E3B025]/25 bg-[#1A1919] px-2 py-1 text-xs text-[#F5F2EB] focus:border-[#E3B025] focus:outline-none cursor-pointer"
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
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E3B025]/30 bg-[#1A1919] px-3.5 py-1.5 text-xs font-medium text-[#E3B025] hover:border-[#E3B025] hover:bg-[#E3B025]/10 transition-all cursor-pointer"
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
