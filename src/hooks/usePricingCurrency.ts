"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type PricingCurrency,
  detectDefaultCurrency,
  formatPrice,
  readStoredCurrency,
  storeCurrency,
  CURRENCY_DISCLAIMER,
} from "@/lib/pricing-currency";

export function usePricingCurrency() {
  const [currency, setCurrencyState] = useState<PricingCurrency>("INR");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredCurrency();
    setCurrencyState(stored ?? detectDefaultCurrency());
    setReady(true);
  }, []);

  const setCurrency = useCallback((next: PricingCurrency) => {
    setCurrencyState(next);
    storeCurrency(next);
  }, []);

  const format = useCallback(
    (amountInr: number, prefix?: string) =>
      formatPrice(amountInr, currency, prefix),
    [currency],
  );

  return {
    currency,
    setCurrency,
    format,
    ready,
    disclaimer: CURRENCY_DISCLAIMER,
  };
}
