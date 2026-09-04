"use client";

import {
  Code2,
  Database,
  Layout,
  Server,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { TiltCard } from "@/components/motion/TiltCard";
import { Floating } from "@/components/motion/Floating";
import { Spotlight } from "@/components/motion/Spotlight";

const groupIcons: Record<string, LucideIcon> = {
  frontend: Layout,
  backend: Code2,
  databases: Database,
  cms: ShoppingBag,
  deployment: Server,
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="section-shell relative overflow-hidden border-t border-border bg-surface"
    >
      <div className="container-shell relative">
        <Reveal variant="blur">
          <p className="eyebrow">Skills & Stack</p>
          <TypedHeading
            text="Technologies I use to ship production work."
            className="section-heading mt-4"
          />
          <p className="section-lead">
            Organised by layer—so you can see how frontend, backend, CMS and
            deployment fit together on real projects.
          </p>
        </Reveal>

        <Stagger
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3"
          stagger={0.09}
        >
          {skillGroups.map((group, index) => {
            const Icon = groupIcons[group.id] ?? Code2;
            return (
              <StaggerItem key={group.id} variant="rotate-in">
                <TiltCard
                  intensity={6}
                  lift={6}
                  className="h-full overflow-hidden rounded-[var(--radius-lg)]"
                >
                  <Spotlight size={220} className="h-full rounded-[var(--radius-lg)]">
                    <article className="surface-card group h-full !transform-none p-5 sm:p-6">
                      <div
                        className="flex items-center gap-3"
                        style={{ transform: "translateZ(24px)" }}
                      >
                        <Floating
                          amplitude={4}
                          duration={5.5 + index * 0.4}
                          delay={index * 0.2}
                        >
                          <span
                            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                            aria-hidden
                          >
                            <Icon className="size-5" strokeWidth={2} />
                          </span>
                        </Floating>
                        <h3 className="font-display text-lg font-semibold tracking-tight">
                          {group.title}
                        </h3>
                      </div>
                      <ul
                        className="mt-5 flex flex-wrap gap-2"
                        style={{ transform: "translateZ(14px)" }}
                      >
                        {group.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-[11px] font-medium tracking-wide text-foreground/85 transition duration-200 hover:border-primary/30 hover:-translate-y-0.5 hover:text-primary"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
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
