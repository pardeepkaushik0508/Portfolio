"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";

const points = [
  "Direct developer communication",
  "Clear milestones and staging before launch",
  "Responsive WordPress, Shopify and full stack delivery",
  "Post-launch support and project ownership handoff",
] as const;

/** Global-first trust block for homepage / conversion SEO. */
export function GlobalTrustSection() {
  return (
    <section
      id="worldwide"
      className="section-shell border-y border-border bg-surface"
    >
      <div className="container-shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
        <Reveal variant="fade-up">
          <p className="eyebrow">Worldwide</p>
          <TypedHeading
            text="Web Development for Businesses Worldwide"
            className="section-heading mt-4"
          />
          <p className="section-lead">
            Based in India and available for remote projects worldwide.{" "}
            {personal.name} delivers WordPress websites, Shopify stores and
            custom React/Next.js applications with clear communication and
            accountable ownership.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li
                key={point}
                className="relative pl-5 text-[0.95rem] leading-relaxed text-foreground before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-primary"
              >
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal variant="fade-up" delay={0.08}>
          <div className="rounded-[1.25rem] border border-border bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
              Remote workflow
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              Async updates by default, scheduled overlap calls when decisions
              need real-time discussion, staging demos before production, and
              handoff of credentials plus source/project files you own after
              delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/remote-web-developer" magnetic>
                Remote developer page
              </Button>
              <Button
                href="/contact"
                variant="dark"
                magnetic
                className="border border-border bg-white text-foreground shadow-sm hover:border-primary hover:bg-white hover:text-primary"
              >
                Get a Free Project Estimate
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">
              Prefer India-focused hiring? See{" "}
              <Link
                href="/web-developer-india"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Web Developer in India
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
