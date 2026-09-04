export const COUPON = {
  code: "PARDEEP10",
  percent: 10,
  title: "Flat 10% OFF",
  subtitle: "First project discount for new clients",
  blurb:
    "Applies to WordPress, Shopify and Full Stack Starter/Standard package starting prices. Custom quotes case-by-case. Mention the code when we confirm scope — applied on your invoice.",
  requirementPrefill:
    "Coupon PARDEEP10 – claiming flat 10% off on my first project (Starter/Standard package).",
  storageKey: "pk-coupon-dismissed",
  claimedKey: "pk-coupon-claimed",
  cooldownMs: 1000 * 60 * 60 * 24 * 7, // 7 days
  delayHomeMs: 35_000,
  delayPricingMs: 8_000,
} as const;

export function canShowCouponPromo() {
  try {
    if (sessionStorage.getItem(COUPON.claimedKey) === "1") return false;
    const raw = localStorage.getItem(COUPON.storageKey);
    if (!raw) return true;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return true;
    return Date.now() - ts > COUPON.cooldownMs;
  } catch {
    return true;
  }
}

export function markCouponDismissed() {
  try {
    localStorage.setItem(COUPON.storageKey, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function markCouponClaimed() {
  try {
    sessionStorage.setItem(COUPON.claimedKey, "1");
    localStorage.setItem(COUPON.storageKey, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function wasCouponClaimedThisSession() {
  try {
    return sessionStorage.getItem(COUPON.claimedKey) === "1";
  } catch {
    return false;
  }
}
