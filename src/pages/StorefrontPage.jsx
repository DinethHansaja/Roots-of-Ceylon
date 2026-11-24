import React from 'react';
import { HeroSection } from '../components/storefront/HeroSection';
import { BrandStory } from '../components/storefront/BrandStory';
import { ProductCatalog } from '../components/storefront/ProductCatalog';
import { CartDrawer } from '../components/storefront/CartDrawer';
import { CheckoutModal } from '../components/storefront/CheckoutModal';
import { OrderSuccessModal } from '../components/storefront/OrderSuccessModal';

export function StorefrontPage() {
  return (
    <>
      <HeroSection />
      <BrandStory />
      <ProductCatalog />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
    </>
  );
}
