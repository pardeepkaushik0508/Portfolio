export type PricingCurrency = "INR" | "USD";

const USD_PER_INR = 1 / 83;
const STORAGE_KEY = "pk-pricing-currency";

export function detectDefaultCurrency(): PricingCurrency {
  if (typeof navigator === "undefined") return "INR";
  const locale =
    navigator.languages?.[0] ||
    navigator.language ||
    Intl.DateTimeFormat().resolvedOptions().locale ||
    "en-IN";
  const lower = locale.toLowerCase();
  if (lower.includes("-in") || lower.endsWith("_in") || lower === "hi") {
    return "INR";
  }
  // Region from locale like en-US
  const region = lower.split(/[-_]/)[1];
  if (region === "in") return "INR";
  return "USD";
}

export function readStoredCurrency(): PricingCurrency | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "INR" || raw === "USD") return raw;
  } catch {
    /* ignore */
  }
  return null;
}

export function storeCurrency(currency: PricingCurrency) {
  try {
    localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    /* ignore */
  }
}

export function convertInr(amountInr: number, currency: PricingCurrency) {
  if (currency === "INR") return amountInr;
  return Math.round(amountInr * USD_PER_INR);
}

export function formatPrice(
  amountInr: number,
  currency: PricingCurrency,
  prefix?: string,
) {
  const value = convertInr(amountInr, currency);
  const formatted =
    currency === "INR"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(value)
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value);

  return prefix ? `${prefix} ${formatted}` : formatted;
}

export const CURRENCY_DISCLAIMER =
  "Approx local currency · final quote after brief";
