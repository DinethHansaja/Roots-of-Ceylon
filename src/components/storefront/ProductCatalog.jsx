import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';

export function ProductCatalog() {
  return (
    <section id="catalog" className="bg-[#1A1919] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E3B025]/15 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[#E3B025] uppercase">
              Signature Export Collection
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#F5F2EB] sm:text-4xl">
              Single-Origin Spices &amp; Orthodox Tea
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#B8B2A6]">
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
