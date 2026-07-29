"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { personal } from "@/data/personal";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { RotatingRoles } from "@/components/motion/RotatingRoles";
import { TypedHeadline } from "@/components/motion/TypedHeadline";
import { HeroLines } from "@/components/sections/HeroLines";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function HeroWorkCard({
  project,
  side,
  reduced,
}: {
  project: Project;
  side: "left" | "right";
  reduced: boolean | null;
}) {
  const isLeft = side === "left";

  return (
    <motion.a
      href={project.url ?? "#work"}
      target={project.url ? "_blank" : undefined}
      rel={project.url ? "noopener noreferrer" : undefined}
      onClick={() =>
        trackEvent("project_view", {
          project: project.id,
          source: "hero_float",
        })
      }
      initial={reduced ? false : { opacity: 0, y: isLeft ? 18 : 24, scale: 0.94 }}
      animate={
        reduced
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: [0, isLeft ? -7 : -10, 0],
              scale: 1,
            }
      }
      transition={
        reduced
          ? { duration: 0.4 }
          : {
              opacity: { duration: 0.55, delay: isLeft ? 0.35 : 0.48 },
              scale: { duration: 0.55, delay: isLeft ? 0.35 : 0.48 },
              y: {
                duration: isLeft ? 5.2 : 6.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: isLeft ? 0.6 : 1.1,
              },
            }
      }
      whileHover={reduced ? undefined : { y: -4, scale: 1.03 }}
      className={cn(
        "hero-work-card group absolute z-20 hidden sm:block",
        isLeft
          ? "hero-work-card--left left-0 top-[11%] w-[46%] max-w-[210px] -translate-x-[18%] lg:-translate-x-[28%]"
          : "hero-work-card--right bottom-[7%] right-0 w-[50%] max-w-[230px] translate-x-[12%] lg:translate-x-[22%]",
      )}
      aria-label={`View ${project.title}`}
    >
      <div className="hero-work-card__glow" aria-hidden />
      <div className="hero-work-card__shell">
        <div className="hero-work-card__media">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="230px"
            className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="hero-work-card__veil" aria-hidden />
        </div>
        <div className="hero-work-card__meta">
          <span className="hero-work-card__live" aria-hidden>
            <i />
            Live
          </span>
          <p className="hero-work-card__title">{project.title}</p>
          <p className="hero-work-card__type">
            {project.type ?? project.category}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export function HeroSection() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const [leftPreview, rightPreview] = featuredProjects;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  }

  return (
    <section
      id="home"
      onMouseMove={onMove}
      className="relative overflow-hidden bg-dark pt-[var(--header-h)] text-white"
    >
      <div className="hero-glow" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <HeroLines />

      <div className="container-shell relative grid min-h-[calc(100svh-var(--header-h))] items-center gap-12 py-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-12">
        <div className="relative z-10 max-w-2xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-display text-[clamp(1.65rem,3.2vw,1.5rem)] font-bold tracking-[-0.04em] text-white"
          >
            {personal.name}
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04 }}
            className="mt-2 font-mono text-[12px] uppercase tracking-[0.16em] text-accent"
          >
            {personal.title} · {personal.location}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mt-6 max-w-[36rem]"
          >
            <TypedHeadline
              text={personal.headline}
              className="font-display text-[clamp(2rem,4.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.045em]"
              delay={400}
              charMs={24}
            />
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-on-dark-muted md:text-lg"
          >
            {personal.supportingCopy}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              href="#work"
              magnetic
              onClick={() => trackEvent("hero_cta_click", { cta: "view_work" })}
            >
              View Selected Work
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              magnetic
              onClick={() => trackEvent("hero_cta_click", { cta: "discuss" })}
            >
              Discuss Your Project
            </Button>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
            className="mt-8 inline-flex items-center gap-2.5 text-sm text-on-dark-muted"
          >
            <span className="size-2 rounded-full bg-success" aria-hidden />
            {personal.availability}
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={reduced ? undefined : { x: sx, y: sy }}
          className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end"
        >
          <div className="relative px-2 sm:px-6 lg:px-8">
            <div
              className="absolute -inset-3 rounded-[1.35rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/20 blur-xl"
              aria-hidden
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem] border border-border-dark bg-dark-elevated shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
              <Image
                src={personal.profileImage}
                alt="Pardeep Kaushik, full-stack web developer"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="scale-[1.05] object-cover object-[50%_18%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-display text-lg font-bold tracking-tight">
                  {personal.name}
                </p>
                <RotatingRoles />
              </div>
            </div>

            {leftPreview ? (
              <HeroWorkCard
                project={leftPreview}
                side="left"
                reduced={reduced}
              />
            ) : null}
            {rightPreview ? (
              <HeroWorkCard
                project={rightPreview}
                side="right"
                reduced={reduced}
              />
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
