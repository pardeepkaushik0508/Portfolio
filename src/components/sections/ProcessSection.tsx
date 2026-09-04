"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { processSteps } from "@/data/process";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { TiltCard } from "@/components/motion/TiltCard";
import { Spotlight } from "@/components/motion/Spotlight";

export function ProcessSection({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="section-shell border-t border-border bg-surface"
    >
      <div className="container-shell">
        {showHeading ? (
          <Reveal variant="clip-up">
            <p className="eyebrow">Process</p>
            <TypedHeading
              text="A clear path from research to launch."
              className="section-heading mt-4"
            />
            <p className="section-lead">
              Connected steps keep discovery, design, build quality and
              production readiness aligned.
            </p>
          </Reveal>
        ) : null}

        <div
          ref={ref}
          className={cn("relative", showHeading ? "mt-6 lg:mt-14" : "mt-0")}
        >
          <div
            aria-hidden
            className="absolute left-0 right-0 top-10 hidden h-px bg-border lg:block"
          />
          <motion.div
            aria-hidden
            style={{ scaleX: reduced ? 1 : scaleX, transformOrigin: "left" }}
            className="absolute left-0 right-0 top-10 hidden h-px bg-primary lg:block"
          />

          <Stagger
            className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            stagger={0.1}
          >
            {processSteps.map((step, index) => (
              <StaggerItem key={step.id} variant="rotate-in" className="min-w-0">
                <TiltCard intensity={5} lift={8} className="h-full">
                  <Spotlight size={180} className="h-full rounded-[var(--radius-lg)]">
                    <motion.div
                      className="surface-card relative h-full !transform-none p-5 sm:p-6"
                      whileHover={
                        reduced ? undefined : { y: -2, transition: { duration: 0.25 } }
                      }
                    >
                      <motion.span
                        initial={reduced ? false : { scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{
                          once: true,
                          amount: VIEWPORT.amount,
                          margin: VIEWPORT.margin,
                        }}
                        transition={{
                          delay: 0.08 * index,
                          duration: 0.45,
                          ease: EASE.out,
                        }}
                        className="relative z-10 flex size-9 items-center justify-center rounded-md bg-primary font-mono text-[12px] font-medium text-white shadow-[0_8px_20px_rgba(15,118,110,0.3)]"
                        style={{ transform: "translateZ(24px)" }}
                      >
                        {String(step.step).padStart(2, "0")}
                      </motion.span>
                      <h3
                        className="mt-5 font-display text-xl tracking-tight"
                        style={{ transform: "translateZ(18px)" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="mt-3 text-sm leading-relaxed text-muted"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  </Spotlight>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>        </div>
      </div>
    </section>
  );
}
