import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { SpiceArtwork } from '../../assets/spicePatterns';

export function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotals,
    currency,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    setIsCheckoutOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm transition-opacity"
        style={{ backgroundColor: 'var(--overlay-backdrop)' }}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[var(--border-gold)] bg-[var(--bg-secondary)] shadow-2xl transition-colors duration-300"
        aria-label="Shopping Bag"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-gold)] px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[var(--accent-gold)]" />
            <h2 className="font-serif text-2xl font-semibold text-[var(--text-primary)]">
              Your Export Bag
            </h2>
            <span className="rounded-full bg-[var(--accent-gold)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--accent-gold)]">
              {cartCount}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            className="rounded-full p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-gold)] bg-[var(--bg-card)]">
                <ShoppingBag className="w-7 h-7 text-[var(--accent-gold)]" />
              </div>
              <p className="font-serif text-xl text-[var(--text-primary)]">Your bag is empty</p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-[var(--text-secondary)]">
                Explore our single-origin spices and high-grown Ceylon tea to begin your order.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-4 transition-colors duration-300"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                    <SpiceArtwork spiceKey={item.artworkKey} className="h-14 w-14" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)] leading-tight">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-[var(--accent-gold)]">Pack: {item.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId, item.size)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[var(--text-secondary)] hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-[var(--border-gold)] bg-[var(--bg-secondary)] px-1.5 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.productId, item.size, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-xs font-semibold text-[var(--text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.productId, item.size, 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {formatCurrency(item.unitPrice[currency] * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[var(--border-gold)] bg-[var(--bg-card)] px-6 py-5 space-y-4 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                Estimated Subtotal
              </span>
              <span className="font-serif text-2xl font-bold text-[var(--accent-gold)]">
                {formatCurrency(cartTotals[currency], currency)}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">
              Complimentary moisture-sealed export packaging included with every order.
            </p>
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent-gold)] py-3.5 text-xs font-bold tracking-[0.18em] text-[var(--accent-gold-contrast)] uppercase transition-all hover:bg-[var(--accent-gold-hover)] cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
