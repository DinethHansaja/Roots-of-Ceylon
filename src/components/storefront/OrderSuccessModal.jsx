import React from 'react';
import { CheckCircle2, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatCurrency';

export function OrderSuccessModal() {
  const { completedOrder, setCompletedOrder, currency, setActiveView } = useStore();

  if (!completedOrder) return null;

  const handleViewDashboard = () => {
    setCompletedOrder(null);
    setActiveView('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'var(--overlay-backdrop)' }}
        onClick={() => setCompletedOrder(null)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border-gold-strong)] bg-[var(--bg-secondary)] p-8 text-center shadow-2xl transition-colors duration-300"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-500">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <p className="text-[11px] font-semibold tracking-[0.24em] text-[var(--accent-gold)] uppercase">
          Order Confirmed
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-[var(--text-primary)]">
          Thank You, {completedOrder.customer.name}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Your Roots of Ceylon reserve order has been logged for export dispatch to{' '}
          <span className="text-[var(--text-primary)] font-medium">{completedOrder.customer.country}</span>.
        </p>

        <div className="mt-6 rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-4 text-left transition-colors duration-300">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Order Reference</span>
            <span className="font-mono font-semibold text-[var(--accent-gold)]">{completedOrder.id}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Status</span>
            <span className="font-semibold text-amber-600 dark:text-amber-300">{completedOrder.status}</span>
          </div>
          <div className="mt-3 border-t border-[var(--border-subtle)] pt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--text-primary)]">Total Value</span>
            <span className="font-serif text-xl font-bold text-[var(--accent-gold)]">
              {formatCurrency(completedOrder.total[currency], currency)}
            </span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setCompletedOrder(null)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-gold)] bg-[var(--bg-card)] px-6 py-2.5 text-xs font-semibold tracking-wider text-[var(--text-primary)] uppercase hover:border-[var(--accent-gold)] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[var(--accent-gold)]" />
            <span>Continue Shopping</span>
          </button>
          <button
            type="button"
            onClick={handleViewDashboard}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-gold)] px-6 py-2.5 text-xs font-bold tracking-wider text-[var(--accent-gold-contrast)] uppercase hover:bg-[var(--accent-gold-hover)] cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Track in Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
