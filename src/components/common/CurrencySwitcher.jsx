import React from 'react';
import { useStore } from '../../context/StoreContext';

export function CurrencySwitcher({ className = '' }) {
  const { currency, setCurrency } = useStore();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[#E3B025]/25 bg-[#1A1919] p-0.5 ${className}`}
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
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              isActive
                ? 'bg-[#E3B025] text-[#1A1919] shadow-sm'
                : 'text-[#F5F2EB]/70 hover:text-[#F5F2EB]'
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
