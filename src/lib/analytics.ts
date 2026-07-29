export type AnalyticsEvent =
  | "hero_cta_click"
  | "project_view"
  | "case_study_view"
  | "resume_download"
  | "email_click"
  | "whatsapp_click"
  | "linkedin_click"
  | "book_call_click"
  | "contact_form_start"
  | "contact_form_submit";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getGaId() {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
}

export function trackEvent(event: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    // Analytics must never break the page
  }
}
