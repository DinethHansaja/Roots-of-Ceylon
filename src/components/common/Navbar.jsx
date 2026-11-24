import React from 'react';
import { ShoppingBag, LayoutDashboard, Store } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import { CurrencySwitcher } from './CurrencySwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { activeView, setActiveView, cartCount, setIsCartOpen } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-gold)] bg-[var(--bg-nav)] backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setActiveView('storefront')}
          className="text-left focus:outline-none cursor-pointer shrink-0"
        >
          <BrandLogo size="md" />
        </button>

        {/* Navigation Links (Storefront anchor links when in storefront mode) */}
        {activeView === 'storefront' && (
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.18em] uppercase text-[var(--text-primary)]/80">
            <a href="#heritage" className="hover:text-[var(--accent-gold)] transition-colors">
              Heritage
            </a>
            <a href="#catalog" className="hover:text-[var(--accent-gold)] transition-colors">
              Collection
            </a>
            <a href="#values" className="hover:text-[var(--accent-gold)] transition-colors">
              Promise
            </a>
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <CurrencySwitcher />

          {/* Role Switcher: Storefront / Order Dashboard */}
          <div
            className="inline-flex items-center rounded-full border border-[var(--border-gold)] bg-[var(--bg-primary)] p-0.5 transition-colors duration-300"
            role="group"
            aria-label="Workspace view switcher"
          >
            <button
              type="button"
              onClick={() => setActiveView('storefront')}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeView === 'storefront'
                  ? 'bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] border border-[var(--border-gold-strong)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Storefront</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('dashboard')}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] border border-[var(--border-gold-strong)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Order Dashboard</span>
            </button>
          </div>

          {/* Cart Button */}
          {activeView === 'storefront' && (
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
              className="relative inline-flex items-center gap-2 rounded-full border border-[var(--border-gold)] bg-[var(--bg-primary)] px-3 sm:px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent-gold)] px-1.5 text-[11px] font-bold text-[var(--accent-gold-contrast)]">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
