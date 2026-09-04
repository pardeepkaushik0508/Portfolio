"use client";

import { useState } from "react";
import {
  pricingCategories,
  type PricingCategoryId,
} from "@/data/pricing";
import { usePricingCurrency } from "@/hooks/usePricingCurrency";
import { PricingCompareTable } from "@/components/pricing/PricingCompareTable";
import { cn } from "@/lib/utils";

export function PricingPackagesSection() {
  const [active, setActive] = useState<PricingCategoryId>("wordpress");
  const { currency, setCurrency, format, disclaimer } = usePricingCurrency();
  const category =
    pricingCategories.find((c) => c.id === active) ?? pricingCategories[0];

  return (
    <section className="section-shell border-b border-border bg-surface">
      <div className="container-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Packages</p>
            <h2 className="section-heading mt-3">Compare plans side by side</h2>
            <p className="section-lead">
              Starting prices with a written scope. Pick a package or request a
              custom quote below if you need something different.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div
              className="inline-flex rounded-lg border border-border bg-white p-1"
              role="group"
              aria-label="Currency"
            >
              {(["INR", "USD"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] transition",
                    currency === code
                      ? "bg-dark text-white"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted">{disclaimer}</p>
          </div>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Pricing categories"
        >
          {pricingCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "cursor-pointer rounded-lg px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.06em] transition duration-200",
                active === item.id
                  ? "bg-dark text-white shadow-sm"
                  : "border border-border bg-background text-muted hover:border-primary/30 hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8" role="tabpanel">
          <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {category.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            {category.description}
          </p>
          <PricingCompareTable
            category={category}
            formatPrice={format}
          />
        </div>
      </div>
    </section>
  );
}
