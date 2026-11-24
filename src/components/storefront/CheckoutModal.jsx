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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => setIsCheckoutOpen(false)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E3B025]/30 bg-[#1A1919] p-6 sm:p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-[#E3B025]/20 pb-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#E3B025] uppercase">
              Direct Export Dispatch
            </p>
            <h2 id="checkout-title" className="mt-1 font-serif text-3xl font-semibold text-[#F5F2EB]">
              Complete Your Order
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="rounded-full p-1.5 text-[#B8B2A6] hover:bg-[#242323] hover:text-[#F5F2EB] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium tracking-wider text-[#B8B2A6] uppercase">
                Customer Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="e.g. Amara Jayasinghe"
                className="mt-1.5 w-full rounded-xl border border-[#E3B025]/25 bg-[#242323] px-4 py-2.5 text-sm text-[#F5F2EB] placeholder-[#B8B2A6]/45 focus:border-[#E3B025] focus:outline-none"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wider text-[#B8B2A6] uppercase">
                Email Address *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@domain.com"
                className="mt-1.5 w-full rounded-xl border border-[#E3B025]/25 bg-[#242323] px-4 py-2.5 text-sm text-[#F5F2EB] placeholder-[#B8B2A6]/45 focus:border-[#E3B025] focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium tracking-wider text-[#B8B2A6] uppercase">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+94 77 123 4567"
                className="mt-1.5 w-full rounded-xl border border-[#E3B025]/25 bg-[#242323] px-4 py-2.5 text-sm text-[#F5F2EB] placeholder-[#B8B2A6]/45 focus:border-[#E3B025] focus:outline-none"
              />
              {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wider text-[#B8B2A6] uppercase">
                Destination Country *
              </label>
              <input
                type="text"
                value={form.country}
                onChange={handleChange('country')}
                placeholder="United Kingdom"
                className="mt-1.5 w-full rounded-xl border border-[#E3B025]/25 bg-[#242323] px-4 py-2.5 text-sm text-[#F5F2EB] placeholder-[#B8B2A6]/45 focus:border-[#E3B025] focus:outline-none"
              />
              {errors.country && <p className="mt-1 text-xs text-rose-400">{errors.country}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wider text-[#B8B2A6] uppercase">
              Shipping Address *
            </label>
            <textarea
              rows={2}
              value={form.address}
              onChange={handleChange('address')}
              placeholder="Street address, suite/apt, city, postal code"
              className="mt-1.5 w-full rounded-xl border border-[#E3B025]/25 bg-[#242323] px-4 py-2.5 text-sm text-[#F5F2EB] placeholder-[#B8B2A6]/45 focus:border-[#E3B025] focus:outline-none"
            />
            {errors.address && <p className="mt-1 text-xs text-rose-400">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wider text-[#B8B2A6] uppercase">
              Export / Gift Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={handleChange('notes')}
              placeholder="Custom packaging requests, phytosanitary paperwork, or delivery window..."
              className="mt-1.5 w-full rounded-xl border border-[#E3B025]/25 bg-[#242323] px-4 py-2.5 text-sm text-[#F5F2EB] placeholder-[#B8B2A6]/45 focus:border-[#E3B025] focus:outline-none"
            />
          </div>

          {/* Order Summary Strip */}
          <div className="rounded-xl border border-[#E3B025]/20 bg-[#242323]/80 p-4">
            <div className="flex items-center justify-between text-xs text-[#B8B2A6]">
              <span>Items in Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>Active Currency: {currency}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#F5F2EB]">Order Total</span>
              <span className="font-serif text-2xl font-bold text-[#E3B025]">
                {formatCurrency(cartTotals[currency], currency)}
              </span>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center justify-between gap-3 pt-2 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-[#B8B2A6]">
              <ShieldCheck className="w-4 h-4 text-[#E3B025]" />
              <span>Export invoice &amp; tracking confirmed via email/WhatsApp</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-[#E3B025] px-8 py-3 text-xs font-bold tracking-[0.18em] text-[#1A1919] uppercase transition-all hover:bg-[#F2CC59] cursor-pointer"
            >
              Confirm Export Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
