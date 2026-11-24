import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ORDER_STATUSES } from '../services/orderService';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { OrdersTable } from '../components/dashboard/OrdersTable';
import { OrderDetailDrawer } from '../components/dashboard/OrderDetailDrawer';

const FILTER_OPTIONS = ['All', ...ORDER_STATUSES];

export function AdminDashboardPage() {
  const { orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesQuery =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.country.toLowerCase().includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [orders, searchQuery, statusFilter]);

  const selectedOrder = useMemo(
    () => orders.find((o) => o.id === selectedOrderId) || null,
    [orders, selectedOrderId]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-gold)] pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-[var(--accent-gold)] uppercase">
            Export Operations Console
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Order Management Dashboard
          </h1>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          Real-time dispatch tracking synced with{' '}
          <code className="text-[var(--accent-gold)] font-mono">orderService</code>
        </p>
      </div>

      {/* KPI Cards */}
      <DashboardStats orders={orders} />

      {/* Search & Status Filter Toolbar */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Customer Name, or Country..."
            className="w-full rounded-full border border-[var(--border-gold)] bg-[var(--bg-card)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/65 focus:border-[var(--accent-gold)] focus:outline-none transition-colors duration-300"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter orders by status">
          {FILTER_OPTIONS.map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)]'
                    : 'border-[var(--border-gold)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-gold-strong)] hover:text-[var(--text-primary)]'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders}
        onSelectOrder={(order) => setSelectedOrderId(order.id)}
      />

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrderId(null)}
      />
    </div>
  );
}
