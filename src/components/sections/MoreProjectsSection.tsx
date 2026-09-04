"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { moreProjects, projectCollections } from "@/data/projects";
import { personal } from "@/data/personal";
import type { ProjectCategory } from "@/types";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { TiltCard } from "@/components/motion/TiltCard";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { EASE, STAGGER } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { openLeadModal } from "@/components/ui/LeadModal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function MoreProjectsSection() {
  const [active, setActive] = useState<ProjectCategory>("wordpress");

  const filtered = useMemo(() => {
    const list = moreProjects.filter((p) => p.category === active);
    return [...list].sort((a, b) => {
      if (a.disabled && !b.disabled) return 1;
      if (!a.disabled && b.disabled) return -1;
      return 0;
    });
  }, [active]);

  return (
    <section
      id="more-projects"
      className="section-shell border-t border-border bg-surface"
    >
      <div className="container-shell">
        <Reveal variant="blur">
          <p className="eyebrow">More Projects</p>
          <TypedHeading
            text="Additional WordPress, Shopify and full-stack websites."
            className="section-heading mt-4"
          />
          <p className="section-lead">{personal.portfolioNote}</p>
        </Reveal>

        <div
          className="mt-6 flex flex-wrap gap-2 lg:mt-10"
          role="tablist"
          aria-label="Project categories"
        >
          {projectCollections.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "relative cursor-pointer rounded-lg px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.06em] transition duration-200",
                active === item.id
                  ? "bg-dark text-white shadow-sm"
                  : "border border-border bg-background text-muted hover:border-primary/30 hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE.out }}
          >
            <Stagger
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3"
              stagger={STAGGER.base}
            >
              {filtered.map((project, i) => {
                const isDisabled = Boolean(project.disabled);
                const hasUrl = Boolean(project.url) && !isDisabled;
                const CardTag = hasUrl ? "a" : "div";
                const linkProps = hasUrl
                  ? {
                      href: project.url!,
                      target: "_blank" as const,
                      rel: "noopener noreferrer",
                      onClick: () =>
                        trackEvent("project_view", {
                          project: project.id,
                          source: "more_projects",
                        }),
                    }
                  : {};

                return (
                  <StaggerItem
                    key={project.id}
                    variant={i % 2 === 0 ? "depth" : "scale"}
                  >
                    <TiltCard
                      intensity={isDisabled ? 0 : 6}
                      lift={isDisabled ? 0 : 8}
                      className="h-full overflow-hidden rounded-[var(--radius-lg)]"
                    >
                      <CardTag
                        {...linkProps}
                        aria-disabled={isDisabled || undefined}
                        className={cn(
                          "surface-card group flex h-full flex-col overflow-hidden bg-white !transform-none",
                          hasUrl ? "cursor-pointer" : "cursor-default",
                          isDisabled && "opacity-70 grayscale-[0.35]",
                        )}
                      >
                        <ImageReveal
                          direction="up"
                          delay={i * 0.04}
                          className="relative aspect-[16/10] max-h-[220px] overflow-hidden bg-slate-100"
                        >
                          <Image
                            src={project.image}
                            alt={`${project.title} website preview`}
                            width={640}
                            height={400}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            className={cn(
                              "h-full w-full object-cover object-top transition duration-700 ease-out",
                              !isDisabled && "group-hover:scale-[1.07]",
                            )}
                          />
                          {isDisabled ? (
                            <span className="absolute left-3 top-3 rounded-md bg-dark/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
                              Offline
                            </span>
                          ) : (
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                              aria-hidden
                            />
                          )}
                        </ImageReveal>
                        <div
                          className="flex flex-1 flex-col p-5"
                          style={{ transform: "translateZ(16px)" }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p
                                className={cn(
                                  "font-display text-lg font-semibold tracking-tight text-foreground transition duration-200",
                                  !isDisabled && "group-hover:text-primary",
                                )}
                              >
                                {project.title}
                              </p>
                              <p className="mt-1 text-sm text-muted">
                                {project.role}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary transition duration-200",
                                !isDisabled &&
                                  "group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-12",
                              )}
                            >
                              <ArrowUpRight className="size-3.5" aria-hidden />
                            </span>
                          </div>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
                            {project.description}
                          </p>
                          {project.technologies?.length ? (
                            <ul className="mt-4 flex flex-wrap gap-1.5">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <li
                                  key={tech}
                                  className="rounded-md bg-background px-2 py-1 font-mono text-[10px] text-muted"
                                >
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {hasUrl ? (
                            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                              Visit website
                              <ExternalLink className="size-3.5" aria-hidden />
                            </span>
                          ) : isDisabled ? (
                            <span className="mt-4 text-sm font-medium text-muted">
                              Website temporarily unavailable
                            </span>
                          ) : null}
                        </div>
                      </CardTag>
                    </TiltCard>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </motion.div>
        </AnimatePresence>

        <Reveal variant="fade-up" className="mt-12 lg:mt-16">
          <div className="rounded-[1.35rem] border border-border bg-white px-6 py-8 text-center sm:px-10 sm:py-10">
            <p className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold tracking-tight text-foreground">
              Many more growing businesses already have websites I built.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
              Beyond this shortlist, I&apos;ve shipped sites for service brands,
              ecommerce stores and full-stack products that keep converting.
              Why wait to take your business online?
            </p>
            <Button
              type="button"
              magnetic
              className="mt-6"
              onClick={() => {
                trackEvent("hero_cta_click", { cta: "portfolio_more" });
                openLeadModal("portfolio_cta");
              }}
            >
              Discuss Your Project
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
