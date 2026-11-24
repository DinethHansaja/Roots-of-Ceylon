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
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => setCompletedOrder(null)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-[#E3B025]/35 bg-[#1A1919] p-8 text-center shadow-2xl"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <p className="text-[11px] font-semibold tracking-[0.24em] text-[#E3B025] uppercase">
          Order Confirmed
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#F5F2EB]">
          Thank You, {completedOrder.customer.name}
        </h2>
        <p className="mt-2 text-sm text-[#B8B2A6]">
          Your Roots of Ceylon reserve order has been logged for export dispatch to{' '}
          <span className="text-[#F5F2EB]">{completedOrder.customer.country}</span>.
        </p>

        <div className="mt-6 rounded-xl border border-[#E3B025]/20 bg-[#242323] p-4 text-left">
          <div className="flex items-center justify-between text-xs text-[#B8B2A6]">
            <span>Order Reference</span>
            <span className="font-mono font-semibold text-[#E3B025]">{completedOrder.id}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[#B8B2A6]">
            <span>Status</span>
            <span className="font-semibold text-amber-300">{completedOrder.status}</span>
          </div>
          <div className="mt-3 border-t border-[#E3B025]/15 pt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-[#F5F2EB]">Total Value</span>
            <span className="font-serif text-xl font-bold text-[#E3B025]">
              {formatCurrency(completedOrder.total[currency], currency)}
            </span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setCompletedOrder(null)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E3B025]/35 bg-[#242323] px-6 py-2.5 text-xs font-semibold tracking-wider text-[#F5F2EB] uppercase hover:border-[#E3B025] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#E3B025]" />
            <span>Continue Shopping</span>
          </button>
          <button
            type="button"
            onClick={handleViewDashboard}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E3B025] px-6 py-2.5 text-xs font-bold tracking-wider text-[#1A1919] uppercase hover:bg-[#F2CC59] cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Track in Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
