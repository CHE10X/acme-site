"use client";

import { useState } from "react";
import CheckoutConfirm from "./CheckoutConfirm";
import {
  getCheckoutProduct,
  type CheckoutProductKey,
} from "../lib/stripeProducts";

type PricingCheckoutButtonProps = {
  productKey: CheckoutProductKey;
  children: React.ReactNode;
  className: string;
  priceLabel?: string;
  fallbackUrl?: string;
};

export default function PricingCheckoutButton({
  productKey,
  children,
  className,
  priceLabel,
  fallbackUrl,
}: PricingCheckoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const product = getCheckoutProduct(productKey);

  return (
    <>
      <button type="button" className={className} onClick={() => setIsOpen(true)}>
        {children}
      </button>
      {isOpen ? (
        <CheckoutConfirm
          productKey={productKey}
          label={product.displayName}
          priceLabel={priceLabel}
          fallbackUrl={fallbackUrl}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </>
  );
}
