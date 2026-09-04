"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgePercent,
  Clock3,
  LayoutTemplate,
  MonitorPlay,
  X,
} from "lucide-react";
import { LeadForm } from "@/components/ui/LeadForm";
import {
  COUPON,
  canShowCouponPromo,
  markCouponClaimed,
  markCouponDismissed,
  wasCouponClaimedThisSession,
} from "@/data/coupon";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const OFFERS = [
  {
    icon: BadgePercent,
    title: `Flat ${COUPON.percent}% off first project`,
    blurb: `Use code ${COUPON.code} on Starter/Standard packages.`,
  },
  {
    icon: Clock3,
    title: "Free estimation time",
    blurb: "Clear scope + timeline before you commit.",
  },
  {
    icon: LayoutTemplate,
    title: "Free sample design",
    blurb: "See direction for your brand before full build.",
  },
  {
    icon: MonitorPlay,
    title: "Free demo website",
    blurb: "Preview a working concept when the brief fits.",
  },
] as const;

const STORAGE_KEY = "pk-lead-modal-dismissed";
const EXIT_COOLDOWN_MS = 1000 * 60 * 60 * 12; // 12h after dismiss
const SUPPRESS_CHATBOT_KEY = "pk-suppress-chatbot-auto";

function canShowExitIntent() {
  try {
    if (wasCouponClaimedThisSession()) return false;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return true;
    return Date.now() - ts > EXIT_COOLDOWN_MS;
  } catch {
    return true;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

function suppressChatbotAuto() {
  try {
    sessionStorage.setItem(SUPPRESS_CHATBOT_KEY, "1");
  } catch {
    /* ignore */
  }
}

function isCouponSource(src: string) {
  return src.startsWith("coupon");
}

export function openLeadModal(source = "cta") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("open-lead-modal", { detail: { source } }),
  );
}

/** Opens the lead modal in coupon claim mode. */
export function openCouponModal(source = "coupon_claim") {
  openLeadModal(source.startsWith("coupon") ? source : `coupon_${source}`);
}

export function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("cta");
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const exitArmed = useRef(false);
  const couponArmed = useRef(false);
  const openRef = useRef(false);

  const couponMode = isCouponSource(source);

  const close = useCallback(() => {
    setOpen(false);
    openRef.current = false;
    markDismissed();
    if (isCouponSource(source)) markCouponDismissed();
  }, [source]);

  const openModal = useCallback((src: string) => {
    openRef.current = true;
    setSource(src);
    setOpen(true);
    suppressChatbotAuto();
    trackEvent("lead_modal_open", { source: src });
    if (isCouponSource(src)) {
      trackEvent("coupon_modal_open", { source: src });
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      openModal(detail?.source || "cta");
    }
    window.addEventListener("open-lead-modal", onOpen);
    return () => window.removeEventListener("open-lead-modal", onOpen);
  }, [openModal]);

  // Intercept Contact CTAs site-wide
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const isContact =
        href === "/contact" ||
        href.startsWith("/contact?") ||
        href === "#contact" ||
        href.endsWith("/#contact");
      if (!isContact) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      openModal("contact_link");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [openModal]);

  // Timed coupon promo (pricing faster; elsewhere after dwell)
  useEffect(() => {
    if (!canShowCouponPromo()) return;
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const delay =
      path === "/pricing" ? COUPON.delayPricingMs : COUPON.delayHomeMs;

    const t = window.setTimeout(() => {
      if (couponArmed.current) return;
      if (openRef.current) return;
      if (!canShowCouponPromo()) return;
      couponArmed.current = true;
      openModal(path === "/pricing" ? "coupon_pricing" : "coupon_auto");
    }, delay);

    return () => window.clearTimeout(t);
  }, [openModal]);

  // Exit intent (desktop) — skip if coupon already claimed this session
  useEffect(() => {
    function onMouseOut(e: MouseEvent) {
      if (openRef.current) return;
      if (!canShowExitIntent()) return;
      if (e.clientY > 12) return;
      if (exitArmed.current) return;
      const related = e.relatedTarget as Node | null;
      if (related && document.documentElement.contains(related)) return;
      exitArmed.current = true;
      if (canShowCouponPromo()) {
        openModal("coupon_exit");
      } else {
        openModal("exit_intent");
      }
    }
    const t = window.setTimeout(() => {
      document.addEventListener("mouseout", onMouseOut);
    }, 8000);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [openModal]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-3 pt-[10vh] pb-[10vh] sm:items-center sm:p-5 sm:pt-5 sm:pb-5"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close dialog backdrop"
            className="absolute inset-0 bg-dark/55 backdrop-blur-[2px]"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className={cn(
              "relative z-[1] grid max-h-[calc(100dvh-20vh)] w-full max-w-4xl overflow-x-hidden overflow-y-auto overscroll-contain rounded-[1.25rem] border border-border bg-background shadow-[0_32px_80px_rgba(12,18,16,0.28)]",
              "sm:max-h-[90vh]",
              "lg:grid-cols-[0.92fr_1.08fr]",
            )}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:border-primary hover:text-primary"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="border-b border-border bg-dark px-5 py-5 text-white sm:px-6 sm:py-6 lg:border-b-0 lg:border-r lg:border-border-dark lg:px-7 lg:py-7">
              {couponMode ? (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    New client offer
                  </p>
                  <p className="mt-3 font-display text-[clamp(2.4rem,6vw,3.25rem)] font-bold leading-none tracking-tight text-white">
                    {COUPON.title}
                  </p>
                  <h2
                    id={titleId}
                    className="mt-3 font-display text-[clamp(1.15rem,2vw,1.45rem)] font-bold leading-[1.2] tracking-tight"
                  >
                    {COUPON.subtitle}
                  </h2>
                  <p className="mt-3 inline-flex items-center rounded-lg border border-accent/40 bg-accent/15 px-3 py-1.5 font-mono text-sm tracking-[0.12em] text-accent">
                    Code: {COUPON.code}
                  </p>
                  <p className="mt-3 text-sm leading-snug text-on-dark-muted">
                    {COUPON.blurb}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Free project kickoff
                  </p>
                  <h2
                    id={titleId}
                    className="mt-2 font-display text-[clamp(1.25rem,2.2vw,1.6rem)] font-bold leading-[1.15] tracking-tight"
                  >
                    Get a free estimate, sample design &amp; demo path
                  </h2>
                  <p className="mt-2 text-sm leading-snug text-on-dark-muted">
                    Share your requirement — I&apos;ll reply with a practical
                    plan. New clients can also claim flat {COUPON.percent}% off
                    with code {COUPON.code}.
                  </p>
                </>
              )}
              <ul className="mt-4 space-y-2">
                {(couponMode ? OFFERS : OFFERS.slice(1)).map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-accent">
                      <item.icon className="size-3.5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold leading-snug">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-on-dark-muted">
                        {item.blurb}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
              <p className="mb-3 pr-9 font-display text-lg font-semibold tracking-tight text-foreground">
                {couponMode ? "Claim your 10% off" : "Tell me what you need"}
              </p>
              <LeadForm
                key={source}
                source={source}
                idPrefix={`modal-${source}`}
                submitLabel={
                  couponMode ? "Claim 10% off" : "Claim free estimate"
                }
                defaultDetails={
                  couponMode ? COUPON.requirementPrefill : ""
                }
                compact
                className="!shadow-none !rounded-none !bg-transparent !p-0"
                onSuccess={() => {
                  if (couponMode) {
                    markCouponClaimed();
                    trackEvent("coupon_form_submit", { source });
                  }
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
