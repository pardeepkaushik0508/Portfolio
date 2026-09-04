"use client";

import Link from "next/link";
import { BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { openCouponModal } from "@/components/ui/LeadModal";
import { COUPON } from "@/data/coupon";
import { trackEvent } from "@/lib/analytics";

/** Non-blocking promo strip on the pricing page. */
export function CouponBanner() {
  return (
    <section className="section-shell-tight border-b border-border bg-primary/[0.06]">
      <div className="container-shell">
        <div className="flex flex-col gap-4 rounded-[1.15rem] border border-primary/25 bg-white px-5 py-4 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex gap-3">
            <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <BadgePercent className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
                New client offer: {COUPON.percent}% off with{" "}
                <span className="text-primary">{COUPON.code}</span>
              </p>
              <p className="mt-1 text-sm text-muted">
                Starter &amp; Standard packages · applied when we confirm your
                scope on the invoice.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button
              type="button"
              magnetic
              className="w-full justify-center sm:w-auto"
              onClick={() => {
                trackEvent("coupon_claim_click", { source: "pricing_banner" });
                openCouponModal("coupon_banner");
              }}
            >
              Claim {COUPON.percent}% off
            </Button>
            <Button
              href="#packages"
              variant="dark"
              className="w-full justify-center sm:w-auto"
            >
              See packages
            </Button>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-muted sm:text-left">
          Prefer email?{" "}
          <Link href="/contact?plan=coupon" className="text-primary hover:underline">
            Contact with code {COUPON.code}
          </Link>
        </p>
      </div>
    </section>
  );
}
