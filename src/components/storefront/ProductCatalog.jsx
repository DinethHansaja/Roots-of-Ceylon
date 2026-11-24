import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';

export function ProductCatalog() {
  return (
    <section
      id="catalog"
      className="bg-[var(--bg-secondary)] py-20 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-subtle)] pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--accent-gold)] uppercase">
              Signature Export Collection
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Single-Origin Spices &amp; Orthodox Tea
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-secondary)]">
            Select your preferred pack size from 100g tasting tins to 1kg culinary export
            pouches. Prices update automatically in your chosen currency.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
