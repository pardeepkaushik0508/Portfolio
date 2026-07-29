"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { moreProjects, projectCollections } from "@/data/projects";
import { personal } from "@/data/personal";
import type { ProjectCategory } from "@/types";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function MoreProjectsSection() {
  const [active, setActive] = useState<ProjectCategory>("wordpress");

  const filtered = useMemo(
    () => moreProjects.filter((p) => p.category === active),
    [active],
  );

  return (
    <section id="more-projects" className="section-shell border-t border-border bg-surface">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">More Projects</p>
          <TypedHeading
            text="Additional client work by platform."
            className="section-heading mt-4"
          />
          <p className="section-lead">{personal.portfolioNote}</p>
        </Reveal>

        <div
          className="mt-10 flex flex-wrap gap-2"
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
                "rounded-lg px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.06em] transition",
                active === item.id
                  ? "bg-dark text-white shadow-sm"
                  : "border border-border bg-background text-muted hover:border-primary/30 hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Stagger
          key={active}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <StaggerItem key={project.id}>
              <a
                href={project.url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("project_view", {
                    project: project.id,
                    source: "more_projects",
                  })
                }
                className="surface-card group flex h-full flex-col overflow-hidden bg-white"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={`${project.title} website preview`}
                    width={640}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
                        {project.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">{project.role}</p>
                    </div>
                    <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Visit website
                    <ExternalLink className="size-3.5" aria-hidden />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
