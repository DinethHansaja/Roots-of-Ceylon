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
        className="fixed inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'var(--overlay-backdrop)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-[var(--border-gold)] bg-[var(--bg-secondary)] shadow-2xl transition-colors duration-300"
        aria-label="Order Details"
      >
        <div className="flex items-start justify-between border-b border-[var(--border-gold)] px-6 py-5">
          <div>
            <p className="font-mono text-xs font-semibold text-[var(--accent-gold)]">{order.id}</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-[var(--text-primary)]">
              Export Order Breakdown
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
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
            className="rounded-full p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Status Control */}
          <div className="rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-4 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
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
                        ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)]'
                        : 'border-[var(--border-gold)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--border-gold-strong)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Information */}
          <div className="rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-5 space-y-3 transition-colors duration-300">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[var(--accent-gold)] uppercase">
              Customer &amp; Consignee
            </h3>
            <p className="font-serif text-xl font-semibold text-[var(--text-primary)]">
              {order.customer.name}
            </p>
            <div className="space-y-2 text-xs text-[var(--text-secondary)]">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>{order.customer.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>{order.customer.phone}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                <span>
                  {order.customer.address},{' '}
                  <strong className="text-[var(--text-primary)]">{order.customer.country}</strong>
                </span>
              </p>
              {order.customer.notes && (
                <p className="flex items-start gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3 text-[var(--text-primary)]/90">
                  <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                  <span>{order.customer.notes}</span>
                </p>
              )}
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-5 transition-colors duration-300">
            <div className="mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-[var(--accent-gold)]" />
              <h3 className="text-xs font-semibold tracking-[0.2em] text-[var(--accent-gold)] uppercase">
                Line Items
              </h3>
            </div>
            <ul className="divide-y divide-[var(--border-subtle)]">
              {order.items.map((item, idx) => (
                <li key={`${item.productId}-${item.size}-${idx}`} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-serif text-lg font-medium text-[var(--text-primary)]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Pack: {item.size} &times; {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {formatCurrency((item.unitPrice?.[currency] ?? 0) * item.quantity, currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-[var(--border-gold)] pt-4">
              <span className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
                Order Total ({currency})
              </span>
              <span className="font-serif text-2xl font-bold text-[var(--accent-gold)]">
                {formatCurrency(order.total?.[currency] ?? 0, currency)}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
