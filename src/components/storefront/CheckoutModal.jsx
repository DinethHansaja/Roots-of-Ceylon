import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatCurrency';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  address: '',
  country: 'United Kingdom',
  notes: '',
};

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotals, currency, placeOrder } = useStore();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Full name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Valid email address is required.';
    }
    if (!form.phone.trim() || form.phone.trim().length < 7) {
      nextErrors.phone = 'Valid phone or WhatsApp number is required.';
    }
    if (!form.address.trim()) nextErrors.address = 'Shipping address is required.';
    if (!form.country.trim()) nextErrors.country = 'Destination country is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate() || cart.length === 0) return;

    placeOrder({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      country: form.country.trim(),
      notes: form.notes.trim(),
    });
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/55 focus:border-[var(--accent-gold)] focus:outline-none transition-colors duration-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'var(--overlay-backdrop)' }}
        onClick={() => setIsCheckoutOpen(false)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border-gold-strong)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-2xl transition-colors duration-300"
      >
        <div className="flex items-start justify-between border-b border-[var(--border-gold)] pb-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent-gold)] uppercase">
              Direct Export Dispatch
            </p>
            <h2 id="checkout-title" className="mt-1 font-serif text-3xl font-semibold text-[var(--text-primary)]">
              Complete Your Order
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="rounded-full p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                Customer Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="e.g. Amara Jayasinghe"
                className={inputClass}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                Email Address *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@domain.com"
                className={inputClass}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+94 77 123 4567"
                className={inputClass}
              />
              {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                Destination Country *
              </label>
              <input
                type="text"
                value={form.country}
                onChange={handleChange('country')}
                placeholder="United Kingdom"
                className={inputClass}
              />
              {errors.country && <p className="mt-1 text-xs text-rose-500">{errors.country}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
              Shipping Address *
            </label>
            <textarea
              rows={2}
              value={form.address}
              onChange={handleChange('address')}
              placeholder="Street address, suite/apt, city, postal code"
              className={inputClass}
            />
            {errors.address && <p className="mt-1 text-xs text-rose-500">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase">
              Export / Gift Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={handleChange('notes')}
              placeholder="Custom packaging requests, phytosanitary paperwork, or delivery window..."
              className={inputClass}
            />
          </div>

          {/* Order Summary Strip */}
          <div className="rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-4 transition-colors duration-300">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>Items in Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>Active Currency: {currency}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--text-primary)]">Order Total</span>
              <span className="font-serif text-2xl font-bold text-[var(--accent-gold)]">
                {formatCurrency(cartTotals[currency], currency)}
              </span>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center justify-between gap-3 pt-2 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Export invoice &amp; tracking confirmed via email/WhatsApp</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-[var(--accent-gold)] px-8 py-3 text-xs font-bold tracking-[0.18em] text-[var(--accent-gold-contrast)] uppercase transition-all hover:bg-[var(--accent-gold-hover)] cursor-pointer"
            >
              Confirm Export Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
