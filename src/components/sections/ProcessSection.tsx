"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/data/process";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="section-shell border-t border-border bg-surface">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">Process</p>
          <TypedHeading
            text="A clear path from discovery to launch."
            className="section-heading mt-4"
          />
          <p className="section-lead">
            Four connected steps keep scope, build quality and production
            readiness aligned.
          </p>
        </Reveal>

        <div ref={ref} className="relative lg:mt-14 mt-6">
          <div
            aria-hidden
            className="absolute left-[8%] right-[8%] top-10 hidden h-px bg-border md:block"
          />
          <motion.div
            aria-hidden
            style={{ scaleX: reduced ? 1 : scaleX, transformOrigin: "left" }}
            className="absolute left-[8%] right-[8%] top-10 hidden h-px bg-primary md:block"
          />

          <Stagger className="grid gap-4 md:grid-cols-4 md:gap-5">
            {processSteps.map((step) => (
              <StaggerItem key={step.id}>
                <div className="surface-card relative h-full p-5 transition duration-300 hover:-translate-y-0.5 sm:p-6">
                  <span className="relative z-10 flex size-9 items-center justify-center rounded-md bg-primary font-mono text-[12px] font-medium text-white">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
