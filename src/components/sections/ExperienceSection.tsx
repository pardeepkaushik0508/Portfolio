"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-shell section-mesh border-t border-border">
      <div className="container-shell">
        <Reveal>
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

        <div className="relative lg:mt-14 mt-6">
          <div
            aria-hidden
            className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent md:left-1/2 md:-translate-x-px"
          />

          <ol className="space-y-8">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <Reveal key={item.id} delay={index * 0.06}>
                  <li className="relative grid gap-4 md:grid-cols-2 md:gap-10">
                    <div
                      className={
                        isLeft
                          ? "pl-10 md:pl-0 md:pr-10 md:text-right"
                          : "pl-10 md:col-start-2 md:pl-10"
                      }
                    >
                      <motion.article
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 16 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="surface-card p-5 text-left sm:p-6"
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
                                className="rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1 font-mono text-[11px] text-primary"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </motion.article>
                    </div>

                    <span
                      aria-hidden
                      className="absolute left-[7px] top-6 size-2.5 rounded-full border-2 border-primary bg-surface md:left-1/2 md:-translate-x-1/2"
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
