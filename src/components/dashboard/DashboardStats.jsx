import React from 'react';
import { DollarSign, Package, Clock, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatCurrency';

export function DashboardStats({ orders }) {
  const { currency } = useStore();

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total?.[currency] ?? 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue, currency),
      subtext: `Displayed in ${currency}`,
      icon: DollarSign,
    },
    {
      label: 'Total Orders',
      value: String(totalOrders),
      subtext: 'All-time export dispatches',
      icon: Package,
    },
    {
      label: 'Pending Orders',
      value: String(pendingOrders),
      subtext: 'Awaiting fulfillment',
      icon: Clock,
    },
    {
      label: 'Delivered Orders',
      value: String(deliveredOrders),
      subtext: 'Completed global deliveries',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="luxury-card gold-border-hover rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                {stat.label}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-gold)] bg-[var(--accent-gold)]/12 text-[var(--accent-gold)]">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-3 font-serif text-3xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-[var(--text-secondary)]">{stat.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
