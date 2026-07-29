"use client";

import { services } from "@/data/services";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";

export function ServicesSection() {
  return (
    <section id="services" className="section-shell bg-surface">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">Services</p>
          <TypedHeading
            text="Focused delivery for websites, stores and web applications."
            className="section-heading mt-4"
          />
          <p className="section-lead">
            Four service areas with clear outcomes—so you know what can be
            built, managed and launched.
          </p>
        </Reveal>

        <Stagger className="lg:mt-12 mt-6 grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <StaggerItem key={service.id}>
              <article className="surface-card flex h-full flex-col p-6 transition duration-300 hover:-translate-y-0.5 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[13px] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <span className="rounded-md bg-background px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted">
                    {service.relevantProject}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-tight md:text-[1.65rem]">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted md:text-base">
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
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
                >
                  Discuss This Service
                  <span aria-hidden>→</span>
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
