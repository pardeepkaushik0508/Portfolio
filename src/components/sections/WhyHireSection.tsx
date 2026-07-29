"use client";

import { whyHire } from "@/data/personal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";

export function WhyHireSection() {
  return (
    <section id="why-hire" className="section-shell section-mesh border-y border-border">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">Why Clients Hire Me</p>
          <TypedHeading
            text="Practical advantages for remote project delivery."
            className="section-heading mt-4"
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyHire.map((item, index) => (
            <StaggerItem key={item.id}>
              <div className="surface-card h-full p-6 transition duration-300 hover:-translate-y-0.5">
                <p className="inline-flex size-8 items-center justify-center rounded-md bg-primary/10 font-mono text-[12px] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-xl tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-[0.9375rem]">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
