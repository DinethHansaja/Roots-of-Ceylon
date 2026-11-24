import React from 'react';
import { useStore } from '../../context/StoreContext';

export function CurrencySwitcher({ className = '' }) {
  const { currency, setCurrency } = useStore();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[var(--border-gold)] bg-[var(--bg-secondary)] p-0.5 transition-colors duration-300 ${className}`}
      role="group"
      aria-label="Currency selector"
    >
      {['USD', 'LKR'].map((code) => {
        const isActive = currency === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setCurrency(code)}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              isActive
                ? 'bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
