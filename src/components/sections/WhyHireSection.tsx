"use client";

import {
  CheckCircle2,
  Headphones,
  MessageSquare,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { whyHire } from "@/data/personal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { TiltCard } from "@/components/motion/TiltCard";
import { Spotlight } from "@/components/motion/Spotlight";

const whyIcons: LucideIcon[] = [
  MessageSquare,
  Workflow,
  CheckCircle2,
  MonitorSmartphone,
  ShieldCheck,
  Headphones,
  Server,
];

export function WhyHireSection() {
  return (
    <section
      id="why-hire"
      className="section-shell section-mesh border-y border-border"
    >
      <div className="container-shell">
        <Reveal variant="blur">
          <p className="eyebrow">Why Clients Hire Me</p>
          <TypedHeading
            text="Practical advantages for remote project delivery."
            className="section-heading mt-4"
          />
        </Reveal>

        <Stagger
          className="mt-6 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-3"
          stagger={0.07}
        >
          {whyHire.map((item, index) => {
            const Icon = whyIcons[index % whyIcons.length];
            return (
              <StaggerItem
                key={item.id}
                variant={index % 3 === 0 ? "depth" : "fade-up"}
              >
                <TiltCard
                  intensity={5}
                  lift={6}
                  className="h-full overflow-hidden rounded-[var(--radius-lg)]"
                >
                  <Spotlight size={200} className="h-full rounded-[var(--radius-lg)]">
                    <div className="surface-card h-full !transform-none p-6">
                      <span
                        className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition duration-300"
                        aria-hidden
                        style={{ transform: "translateZ(22px)" }}
                      >
                        <Icon className="size-5" strokeWidth={2} />
                      </span>
                      <h3
                        className="mt-4 font-display text-xl tracking-tight"
                        style={{ transform: "translateZ(16px)" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="mt-3 text-sm leading-relaxed text-muted md:text-[0.9375rem]"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        {item.description}
                      </p>
                    </div>
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
