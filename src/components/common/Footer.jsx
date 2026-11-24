import React from 'react';
import { Globe, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="border-t border-[#E3B025]/20 bg-[#1A1919] text-[#F5F2EB]/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <BrandLogo size="md" />
            <p className="max-w-sm text-sm leading-relaxed text-[#B8B2A6]">
              Curating single-origin Sri Lankan spices and high-grown orthodox teas for
              discerning culinary houses, luxury hospitality, and private pantries worldwide.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-[#E3B025]">
              Export House &amp; Tasting Room
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B8B2A6]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E3B025] shrink-0 mt-0.5" />
                <span>24 Horton Place, Cinnamon Gardens, Colombo 07, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E3B025] shrink-0" />
                <span>concierge@rootsofceylon.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#E3B025] shrink-0" />
                <span>Worldwide Air-Freight &amp; Express Export</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-[#E3B025]">
              Export Standards
            </h3>
            <div className="rounded-xl border border-[#E3B025]/20 bg-[#242323]/70 p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-[#F5F2EB]">
                <ShieldCheck className="w-4 h-4 text-[#E3B025]" />
                <span>Pure Ceylon Provenance</span>
              </div>
              <p className="text-xs leading-relaxed text-[#B8B2A6]">
                Every lot is lab-tested for essential oil density, moisture, and purity—shipped
                hermetically sealed from harvest estates in Matale, Galle, Ampara, and Nuwara Eliya.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E3B025]/15 pt-8 text-xs text-[#B8B2A6] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Roots of Ceylon (Pvt) Ltd. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase text-[#E3B025]/80">
            Natural &bull; Healthy &bull; Quality &bull; Tropical &bull; Handcrafted
          </p>
        </div>
      </div>
    </footer>
  );
}
