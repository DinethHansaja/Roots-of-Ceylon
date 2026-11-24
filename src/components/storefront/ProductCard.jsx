import React, { useState } from 'react';
import { MapPin, Plus, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Badge } from '../common/Badge';
import { SpiceArtwork } from '../../assets/spicePatterns';

export function ProductCard({ product }) {
  const { currency, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.size === selectedSize) || product.variants[0];

  const handleAdd = () => {
    addToCart(product, activeVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="luxury-card gold-border-hover group flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5">
      <div>
        {/* Top Row: Grade & Reserve Badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium tracking-[0.18em] text-[#B8B2A6] uppercase">
            {product.grade}
          </span>
          <Badge variant="gold">{product.badge}</Badge>
        </div>

        {/* Artwork Medallion */}
        <div className="my-6 flex items-center justify-center">
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-[#1A1919]/80 transition-transform duration-500 group-hover:scale-105">
            <SpiceArtwork spiceKey={product.artworkKey} className="h-32 w-32" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-serif text-2xl font-semibold text-[#F5F2EB]">{product.name}</h3>
        <p className="mt-1 text-xs font-medium text-[#E3B025]/90">{product.subtitle}</p>

        {/* Origin */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#B8B2A6]">
          <MapPin className="w-3.5 h-3.5 text-[#E3B025] shrink-0" />
          <span>{product.origin}</span>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-[#B8B2A6]">{product.description}</p>

        {/* Tasting Notes */}
        <div className="mt-4">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#F5F2EB]/60 uppercase">
            Tasting Notes
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {product.tastingNotes.map((note) => (
              <span
                key={note}
                className="rounded-md border border-[#E3B025]/15 bg-[#1A1919] px-2 py-0.5 text-[11px] text-[#F5F2EB]/80"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pack Size Selector & CTA */}
      <div className="mt-6 border-t border-[#E3B025]/15 pt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium tracking-wider text-[#B8B2A6] uppercase">Pack Size</span>
          <span className="text-[11px] text-[#E3B025]">{product.harvest}</span>
        </div>

        <div className="mt-2.5 grid grid-cols-4 gap-2">
          {product.variants.map((variant) => {
            const isSelected = variant.size === selectedSize;
            return (
              <button
                key={variant.size}
                type="button"
                onClick={() => setSelectedSize(variant.size)}
                className={`rounded-lg border py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#E3B025] bg-[#E3B025]/15 text-[#E3B025]'
                    : 'border-[#E3B025]/20 bg-[#1A1919] text-[#F5F2EB]/70 hover:border-[#E3B025]/45 hover:text-[#F5F2EB]'
                }`}
              >
                {variant.size}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#B8B2A6]">
              Export Price ({activeVariant.size})
            </p>
            <p className="font-serif text-2xl font-bold text-[#F5F2EB]">
              {formatCurrency(activeVariant.price[currency], currency)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-500 text-[#1A1919]'
                : 'bg-[#E3B025] text-[#1A1919] hover:bg-[#F2CC59]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
