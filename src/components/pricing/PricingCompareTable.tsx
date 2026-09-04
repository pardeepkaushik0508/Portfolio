"use client";

import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type {
  FeatureCell,
  PricingCategory,
  PricingPlanId,
} from "@/data/pricing";
import { planContactHref } from "@/data/pricing";
import { cn } from "@/lib/utils";

function CellValue({ value }: { value: FeatureCell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center text-primary">
        <Check className="size-4" aria-label="Included" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center text-muted">
        <Minus className="size-4" aria-label="Not included" />
      </span>
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

function cellForPlan(
  row: PricingCategory["features"][number],
  planId: PricingPlanId,
): FeatureCell {
  if (planId === "starter") return row.starter;
  if (planId === "standard") return row.standard;
  return row.advanced;
}

type PricingCompareTableProps = {
  category: PricingCategory;
  formatPrice: (amountInr: number, prefix?: string) => string;
};

export function PricingCompareTable({
  category,
  formatPrice,
}: PricingCompareTableProps) {
  return (
    <div className="mt-6">
      <div className="max-h-[min(70vh,40rem)] overflow-auto rounded-[1.15rem] border border-border bg-white shadow-[var(--shadow-sm)]">
        <table className="min-w-[40rem] w-full border-collapse text-left">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 top-0 z-30 min-w-[9.5rem] border-b border-border bg-white px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.08em] text-muted"
              >
                Feature
              </th>
              {category.plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    "sticky top-0 z-20 min-w-[10.5rem] border-b border-border bg-white px-4 py-4 align-bottom",
                    plan.badge && "bg-primary/[0.04]",
                  )}
                >
                  <div className="space-y-1.5">
                    {plan.badge ? (
                      <span className="inline-flex rounded-md bg-primary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
                        {plan.badge}
                      </span>
                    ) : (
                      <span className="block h-[1.25rem]" aria-hidden />
                    )}
                    <p className="font-display text-lg font-bold tracking-tight text-foreground">
                      {plan.name}
                    </p>
                    <p className="text-base font-semibold text-primary">
                      {formatPrice(plan.priceInr, plan.pricePrefix)}
                    </p>
                    <p className="text-xs text-muted">{plan.timeline}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {category.features.map((row) => (
              <tr key={row.label} className="border-b border-border/80 last:border-b-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white px-4 py-3 text-sm font-medium text-foreground"
                >
                  {row.label}
                </th>
                {category.plans.map((plan) => (
                  <td
                    key={plan.id}
                    className={cn(
                      "px-4 py-3 text-center sm:text-left",
                      plan.badge && "bg-primary/[0.03]",
                    )}
                  >
                    <CellValue value={cellForPlan(row, plan.id)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {category.plans.map((plan) => (
          <Button
            key={plan.id}
            href={planContactHref(category.id, plan.id)}
            variant={plan.badge ? "primary" : "dark"}
            magnetic={Boolean(plan.badge)}
            className="w-full justify-center"
          >
            Choose {plan.name}
          </Button>
        ))}
      </div>

      <div className="mt-6 rounded-[1.15rem] border border-border bg-surface px-4 py-4 sm:px-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          Not included
        </p>
        <ul className="mt-2 grid gap-1.5 text-sm text-muted sm:grid-cols-2">
          {category.notIncluded.map((item) => (
            <li key={item} className="relative pl-4 before:absolute before:left-0 before:content-['–']">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
