import React from 'react';
import { ShoppingBag, LayoutDashboard, Store } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import { CurrencySwitcher } from './CurrencySwitcher';

export function Navbar() {
  const { activeView, setActiveView, cartCount, setIsCartOpen } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-[#E3B025]/20 bg-[#1A1919]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setActiveView('storefront')}
          className="text-left focus:outline-none cursor-pointer"
        >
          <BrandLogo size="md" />
        </button>

        {/* Navigation Links (Storefront anchor links when in storefront mode) */}
        {activeView === 'storefront' && (
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.18em] uppercase text-[#F5F2EB]/80">
            <a href="#heritage" className="hover:text-[#E3B025] transition-colors">
              Heritage
            </a>
            <a href="#catalog" className="hover:text-[#E3B025] transition-colors">
              Collection
            </a>
            <a href="#values" className="hover:text-[#E3B025] transition-colors">
              Promise
            </a>
          </nav>
        )}

        <div className="flex items-center gap-3 sm:gap-4">
          <CurrencySwitcher />

          {/* Role Switcher: Storefront / Order Dashboard */}
          <div
            className="inline-flex items-center rounded-full border border-[#E3B025]/25 bg-[#242323] p-0.5"
            role="group"
            aria-label="Workspace view switcher"
          >
            <button
              type="button"
              onClick={() => setActiveView('storefront')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeView === 'storefront'
                  ? 'bg-[#E3B025]/15 text-[#E3B025] border border-[#E3B025]/40'
                  : 'text-[#F5F2EB]/70 hover:text-[#F5F2EB] border border-transparent'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('dashboard')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-[#E3B025]/15 text-[#E3B025] border border-[#E3B025]/40'
                  : 'text-[#F5F2EB]/70 hover:text-[#F5F2EB] border border-transparent'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Order Dashboard</span>
            </button>
          </div>

          {/* Cart Button */}
          {activeView === 'storefront' && (
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
              className="relative inline-flex items-center gap-2 rounded-full border border-[#E3B025]/35 bg-[#242323] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#F5F2EB] hover:border-[#E3B025] hover:text-[#E3B025] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#E3B025]" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E3B025] px-1.5 text-[11px] font-bold text-[#1A1919]">
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
