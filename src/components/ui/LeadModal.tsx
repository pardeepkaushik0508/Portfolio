"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock3, LayoutTemplate, MonitorPlay, X } from "lucide-react";
import { LeadForm } from "@/components/ui/LeadForm";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const OFFERS = [
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

function canShowExitIntent() {
  try {
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

export function openLeadModal(source = "cta") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("open-lead-modal", { detail: { source } }),
  );
}

export function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("cta");
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const exitArmed = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    markDismissed();
  }, []);

  const openModal = useCallback((src: string) => {
    setSource(src);
    setOpen(true);
    trackEvent("lead_modal_open", { source: src });
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
      // Allow modifier/new-tab
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      openModal("contact_link");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [openModal]);

  // Exit intent (desktop)
  useEffect(() => {
    function onMouseOut(e: MouseEvent) {
      if (open) return;
      if (!canShowExitIntent()) return;
      if (e.clientY > 12) return;
      if (exitArmed.current) return;
      // Ignore relatedTarget inside document
      const related = e.relatedTarget as Node | null;
      if (related && document.documentElement.contains(related)) return;
      exitArmed.current = true;
      openModal("exit_intent");
    }
    // Arm after short dwell so first paint doesn't trigger
    const t = window.setTimeout(() => {
      document.addEventListener("mouseout", onMouseOut);
    }, 8000);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [open, openModal]);

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
          className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-5"
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
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className={cn(
              "relative z-[1] grid max-h-[90vh] w-full max-w-4xl overflow-x-hidden overflow-y-auto rounded-[1.25rem] border border-border bg-background shadow-[0_32px_80px_rgba(12,18,16,0.28)]",
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
                Share your requirement — I&apos;ll reply with a practical plan.
              </p>
              <ul className="mt-4 space-y-2">
                {OFFERS.map((item) => (
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
                Tell me what you need
              </p>
              <LeadForm
                source={source}
                idPrefix={`modal-${source}`}
                submitLabel="Claim free estimate"
                compact
                className="!shadow-none !rounded-none !bg-transparent !p-0"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
