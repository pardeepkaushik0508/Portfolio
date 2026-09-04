"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { TiltCard } from "@/components/motion/TiltCard";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ExperienceSection({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="section-shell section-mesh border-t border-border"
    >
      <div className="container-shell">
        {showHeading ? (
          <Reveal variant="blur">
            <p className="eyebrow">Experience</p>
            <TypedHeading
              text="Professional experience"
              className="section-heading mt-4"
            />
            <p className="section-lead">
              Roles and responsibilities drawn directly from verified resume
              history.
            </p>
          </Reveal>
        ) : null}

        <div
          ref={trackRef}
          className={cn("relative", showHeading ? "mt-6 lg:mt-14" : "mt-0")}
        >          <div
            aria-hidden
            className="absolute bottom-0 left-[11px] top-2 w-px overflow-hidden bg-border md:left-1/2 md:-translate-x-px"
          >
            <motion.div
              style={{
                scaleY: reduced ? 1 : lineScale,
                transformOrigin: "top",
              }}
              className="h-full w-full bg-gradient-to-b from-primary via-primary/70 to-primary/20"
            />
          </div>

          <ol className="space-y-8">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <Reveal
                  key={item.id}
                  delay={index * 0.05}
                  variant={isLeft ? "slide-right" : "slide-left"}
                >
                  <li className="relative grid gap-4 md:grid-cols-2 md:gap-10">
                    <div
                      className={
                        isLeft
                          ? "pl-10 md:pl-0 md:pr-10 md:text-right"
                          : "pl-10 md:col-start-2 md:pl-10"
                      }
                    >
                      <TiltCard intensity={4} lift={8}>
                        <motion.article
                          initial={
                            reduced
                              ? false
                              : {
                                  opacity: 0,
                                  rotateY: isLeft ? 8 : -8,
                                  z: -20,
                                }
                          }
                          whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                          viewport={{
                            once: true,
                            amount: VIEWPORT.amount,
                            margin: VIEWPORT.margin,
                          }}
                          transition={{
                            duration: DURATION.section,
                            ease: EASE.out,
                          }}
                          className="surface-card !transform-none p-5 text-left sm:p-6"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-primary">
                            {item.startDate} — {item.endDate}
                          </p>
                          <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            {item.company} · {item.location}
                          </p>

                          <ul className="mt-4 space-y-2">
                            {item.responsibilities.map((point) => (
                              <li
                                key={point}
                                className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-primary/70"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>

                          {item.technologies.length ? (
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {item.technologies.map((tech) => (
                                <li
                                  key={tech}
                                  className="rounded-md border border-primary/15 bg-primary/8 px-2.5 py-1 font-mono text-[11px] text-primary"
                                >
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </motion.article>
                      </TiltCard>
                    </div>

                    <motion.span
                      aria-hidden
                      initial={reduced ? false : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{
                        once: true,
                        amount: VIEWPORT.amount,
                        margin: VIEWPORT.margin,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 18,
                        delay: 0.1,
                      }}
                      className="absolute left-[7px] top-6 size-2.5 rounded-full border-2 border-primary bg-surface shadow-[0_0_0_4px_rgba(15,118,110,0.15)] md:left-1/2 md:-translate-x-1/2"
                    />
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
