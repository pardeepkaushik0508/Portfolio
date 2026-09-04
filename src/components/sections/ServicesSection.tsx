"use client";

import {
  Code2,
  Gauge,
  RefreshCw,
  ShoppingBag,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { TiltCard } from "@/components/motion/TiltCard";
import { Spotlight } from "@/components/motion/Spotlight";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";

const serviceIcons: LucideIcon[] = [Code2, ShoppingBag, RefreshCw, Gauge, Zap];

export function ServicesSection({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  return (
    <section id="services" className="section-shell relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Parallax
          offset={50}
          className="absolute -right-20 top-20 size-64 rounded-full bg-primary/5 blur-3xl"
        />
        <Parallax
          offset={-35}
          className="absolute -left-16 bottom-10 size-48 rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      <div className="container-shell relative">
        {showHeading ? (
          <Reveal variant="clip-up">
            <p className="eyebrow">Services</p>
            <TypedHeading
              text="Focused delivery for websites, stores and web applications."
              className="section-heading mt-4"
            />
            <p className="section-lead">
              Service areas with clear outcomes—so you know what can be built,
              optimized and launched.
            </p>
          </Reveal>
        ) : null}

        <Stagger
          className={cn(
            "grid gap-5 lg:grid-cols-2",
            showHeading ? "mt-6 lg:mt-12" : "mt-0",
          )}
          stagger={0.1}
        >          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <StaggerItem key={service.id} variant="depth">
                <TiltCard intensity={7} lift={14} className="h-full">
                  <Spotlight className="h-full rounded-[var(--radius-lg)]">
                    <article className="surface-card motion-depth-card group flex h-full flex-col !transform-none p-6 sm:p-8">
                      <div
                        className="flex items-start justify-between gap-4"
                        style={{ transform: "translateZ(28px)" }}
                      >
                        <span
                          className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_8px_24px_rgba(15,118,110,0.35)]"
                          aria-hidden
                        >
                          <Icon className="size-5" strokeWidth={2} />
                        </span>
                        <span className="rounded-md bg-background px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted">
                          {service.relevantProject}
                        </span>
                      </div>
                      <p
                        className="mt-5 font-mono text-[12px] text-primary"
                        style={{ transform: "translateZ(18px)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3
                        className="mt-2 font-display text-2xl tracking-tight md:text-[1.65rem]"
                        style={{ transform: "translateZ(22px)" }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted md:text-base"
                        style={{ transform: "translateZ(12px)" }}
                      >
                        {service.outcome}
                      </p>
                      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                        {service.capabilities.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 rounded-lg bg-background px-3 py-2 text-sm text-foreground"
                          >
                            <span
                              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="/contact"
                        className="mt-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-primary transition duration-200 hover:gap-2.5 hover:text-primary-hover"
                        style={{ transform: "translateZ(24px)" }}
                      >
                        Discuss This Service
                        <span aria-hidden>→</span>
                      </a>
                    </article>
                  </Spotlight>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
