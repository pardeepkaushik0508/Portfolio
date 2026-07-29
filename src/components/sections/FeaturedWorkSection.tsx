"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  ExternalLink,
  Lightbulb,
  ListChecks,
  Target,
  Trophy,
} from "lucide-react";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/types";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function InfoCard({
  icon,
  label,
  children,
  iconClassName,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  iconClassName: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-lg",
            iconClassName,
          )}
          aria-hidden
        >
          {icon}
        </span>
        <p className="font-display text-[0.95rem] font-semibold tracking-tight text-foreground">
          {label}
        </p>
      </div>
      <div className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}

function CaseStudy({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      id={`case-${project.id}`}
      className={cn(
        "surface-card overflow-hidden lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]",
        index > 0 && "mt-7",
      )}
    >
      {/* Left — browser mockup */}
      <div className="border-b border-border bg-[linear-gradient(165deg,#f4f7f8_0%,#e8eef1_100%)] p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
        <div className="preview-frame group h-full min-h-[220px] lg:min-h-[420px]">
          <div className="preview-chrome">
            <span className="preview-dot bg-[#ff5f57]" />
            <span className="preview-dot bg-[#febc2e]" />
            <span className="preview-dot bg-[#28c840]" />
            <span className="ml-2 truncate font-mono text-[11px] text-muted">
              {project.url?.replace(/^https?:\/\//, "") ?? project.title}
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0f172a] lg:aspect-auto lg:h-[calc(100%-2.5rem)] lg:min-h-[360px]">
            <Image
              src={project.image}
              alt={`${project.title} website preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Right — case study content */}
      <div className="flex flex-col p-5 sm:p-7 lg:p-8">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-primary">
            {String(index + 1).padStart(2, "0")} — Featured case study
          </p>
          <h3 className="mt-2 font-display text-[clamp(1.65rem,3vw,2.15rem)] font-bold tracking-tight text-foreground">
            {project.title}
          </h3>
          {project.type ? (
            <p className="mt-1.5 text-[0.95rem] font-medium text-foreground/80">
              {project.type}
            </p>
          ) : null}
          <p className="mt-2 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-accent">
            {project.role}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.hasLiveUrl && project.url ? (
            <Button
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("project_view", {
                  project: project.id,
                  source: "case_study",
                })
              }
            >
              Visit Website
              <ExternalLink className="size-3.5" aria-hidden />
            </Button>
          ) : null}
          <Button
            href="#contact"
            variant="dark"
            onClick={() =>
              trackEvent("case_study_view", { project: project.id })
            }
          >
            Discuss Similar Work
          </Button>
        </div>

        <div className="mt-7 grid flex-1 gap-3 sm:grid-cols-2">
          {project.challenge ? (
            <InfoCard
              label="Challenge"
              iconClassName="bg-primary/10 text-primary"
              icon={<Target className="size-4" strokeWidth={2} />}
            >
              <p>{project.challenge}</p>
            </InfoCard>
          ) : null}

          {project.solution ? (
            <InfoCard
              label="Solution"
              iconClassName="bg-success/10 text-success"
              icon={<Lightbulb className="size-4" strokeWidth={2} />}
            >
              <p>{project.solution}</p>
            </InfoCard>
          ) : null}

          {project.functionality?.length ? (
            <InfoCard
              label="Functionality"
              iconClassName="bg-accent/15 text-accent"
              icon={<ListChecks className="size-4" strokeWidth={2} />}
            >
              <ul className="grid gap-1.5">
                {project.functionality.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          ) : null}

          {project.result ? (
            <InfoCard
              label="Result"
              iconClassName="bg-primary/10 text-primary"
              icon={<Trophy className="size-4" strokeWidth={2} />}
            >
              <p className="text-foreground">{project.result}</p>
              {project.approach ? (
                <p className="mt-2.5 text-sm leading-relaxed">
                  <span className="font-medium text-foreground">Approach — </span>
                  {project.approach}
                </p>
              ) : null}
            </InfoCard>
          ) : null}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 font-mono text-[11px] font-medium text-primary"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function FeaturedWorkSection() {
  return (
    <section id="work" className="section-shell section-mesh">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
          <TypedHeading
            text="Featured case studies from recent full-stack delivery."
            className="section-heading mt-4"
          />
          <p className="section-lead">
            Three detailed projects showing context, responsibility, stack and
            outcome—without inflated metrics.
          </p>
        </Reveal>

        <div className="mt-12">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06} variant="scale">
              <CaseStudy project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
