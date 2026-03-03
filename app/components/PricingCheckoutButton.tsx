"use client";

import { useState } from "react";
import CheckoutConfirm from "./CheckoutConfirm";
import { getCheckoutProduct, type CheckoutSku } from "../lib/stripeProducts";

type PricingCheckoutButtonProps = {
  sku: CheckoutSku;
  children: React.ReactNode;
  className: string;
};

export default function PricingCheckoutButton({
  sku,
  children,
  className,
}: PricingCheckoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const product = getCheckoutProduct(sku);

  return (
    <>
      <button type="button" className={className} onClick={() => setIsOpen(true)}>
        {children}
      </button>
      {isOpen ? (
        <CheckoutConfirm
          sku={sku}
          label={product.displayName}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </>
  );
}
