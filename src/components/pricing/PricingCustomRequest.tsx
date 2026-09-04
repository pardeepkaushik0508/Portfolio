"use client";

import { Button } from "@/components/ui/Button";
import { openLeadModal } from "@/components/ui/LeadModal";
import { customRequestCopy } from "@/data/pricing";
import { personal } from "@/data/personal";
import { trackEvent } from "@/lib/analytics";

export function PricingCustomRequest() {
  return (
    <section className="section-shell border-b border-border">
      <div className="container-shell">
        <div className="overflow-hidden rounded-[1.35rem] border border-border-dark bg-dark px-6 py-10 text-white shadow-[0_28px_70px_rgba(12,18,16,0.18)] sm:px-10 sm:py-12">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
            {customRequestCopy.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.65rem,3.5vw,2.35rem)] font-bold leading-[1.1] tracking-tight">
            {customRequestCopy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-on-dark-muted sm:text-base">
            {customRequestCopy.description}
          </p>
          <p className="mt-3 text-sm text-on-dark-muted">
            {customRequestCopy.trust}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button
              type="button"
              magnetic
              className="w-full justify-center sm:w-auto"
              onClick={() => {
                trackEvent("hero_cta_click", { cta: "pricing_custom" });
                openLeadModal("pricing_custom");
              }}
            >
              {customRequestCopy.primaryCta}
            </Button>
            <Button
              href="/contact?plan=custom"
              variant="secondary"
              magnetic
              className="w-full justify-center sm:w-auto"
            >
              {customRequestCopy.secondaryCta}
            </Button>
            <Button
              href={personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="w-full justify-center sm:w-auto"
              onClick={() =>
                trackEvent("whatsapp_click", { location: "pricing_custom" })
              }
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
