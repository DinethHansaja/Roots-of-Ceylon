import React from 'react';
import { X, Mail, Phone, MapPin, FileText, Package } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { ORDER_STATUSES } from '../../services/orderService';
import { OrderStatusBadge } from './OrderStatusBadge';

export function OrderDetailDrawer({ order, onClose }) {
  const { currency, updateOrderStatus } = useStore();

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-[#E3B025]/25 bg-[#1A1919] shadow-2xl"
        aria-label="Order Details"
      >
        <div className="flex items-start justify-between border-b border-[#E3B025]/20 px-6 py-5">
          <div>
            <p className="font-mono text-xs font-semibold text-[#E3B025]">{order.id}</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-[#F5F2EB]">
              Export Order Breakdown
            </h2>
            <p className="mt-0.5 text-xs text-[#B8B2A6]">
              Placed on{' '}
              {new Date(order.createdAt).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="rounded-full p-1.5 text-[#B8B2A6] hover:bg-[#242323] hover:text-[#F5F2EB] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Status Control */}
          <div className="rounded-xl border border-[#E3B025]/20 bg-[#242323]/80 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wider text-[#B8B2A6] uppercase">
                Fulfillment Status
              </span>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {ORDER_STATUSES.map((status) => {
                const isActive = order.status === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateOrderStatus(order.id, status)}
                    className={`rounded-lg border py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#E3B025] bg-[#E3B025] text-[#1A1919]'
                        : 'border-[#E3B025]/20 bg-[#1A1919] text-[#F5F2EB]/75 hover:border-[#E3B025]/50'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Information */}
          <div className="rounded-xl border border-[#E3B025]/20 bg-[#242323]/80 p-5 space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E3B025] uppercase">
              Customer &amp; Consignee
            </h3>
            <p className="font-serif text-xl font-semibold text-[#F5F2EB]">
              {order.customer.name}
            </p>
            <div className="space-y-2 text-xs text-[#B8B2A6]">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E3B025]" />
                <span>{order.customer.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E3B025]" />
                <span>{order.customer.phone}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E3B025] shrink-0 mt-0.5" />
                <span>
                  {order.customer.address}, <strong className="text-[#F5F2EB]">{order.customer.country}</strong>
                </span>
              </p>
              {order.customer.notes && (
                <p className="flex items-start gap-2 rounded-lg border border-[#E3B025]/15 bg-[#1A1919] p-3 text-[#F5F2EB]/85">
                  <FileText className="w-3.5 h-3.5 text-[#E3B025] shrink-0 mt-0.5" />
                  <span>{order.customer.notes}</span>
                </p>
              )}
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-xl border border-[#E3B025]/20 bg-[#242323]/80 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#E3B025]" />
              <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E3B025] uppercase">
                Line Items
              </h3>
            </div>
            <ul className="divide-y divide-[#E3B025]/15">
              {order.items.map((item, idx) => (
                <li key={`${item.productId}-${item.size}-${idx}`} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-serif text-lg font-medium text-[#F5F2EB]">{item.name}</p>
                    <p className="text-xs text-[#B8B2A6]">
                      Pack: {item.size} &times; {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#F5F2EB]">
                    {formatCurrency((item.unitPrice?.[currency] ?? 0) * item.quantity, currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-[#E3B025]/25 pt-4">
              <span className="text-xs font-semibold tracking-wider text-[#B8B2A6] uppercase">
                Order Total ({currency})
              </span>
              <span className="font-serif text-2xl font-bold text-[#E3B025]">
                {formatCurrency(order.total?.[currency] ?? 0, currency)}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
