"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { personal } from "@/data/personal";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { RotatingRoles } from "@/components/motion/RotatingRoles";
import { TextReveal } from "@/components/motion/TextReveal";
import { AmbientOrb, Perspective } from "@/components/motion/Floating";
import { ScrollIndicator } from "@/components/motion/ScrollIndicator";
import { HeroLines } from "@/components/sections/HeroLines";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { DURATION, EASE } from "@/lib/motion";
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
              opacity: { duration: 0.55, delay: isLeft ? 0.55 : 0.7 },
              scale: { duration: 0.55, delay: isLeft ? 0.55 : 0.7 },
              y: {
                duration: isLeft ? 5.2 : 6.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: isLeft ? 0.9 : 1.3,
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
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="hero-work-card__glow" aria-hidden />
      <div className="hero-work-card__shell">
        <div className="hero-work-card__media">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="230px"
            quality={65}
            loading="lazy"
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
  const parallax = usePointerParallax({ strength: 18 });
  const midX = useTransform(parallax.x, (v) => v * 0.55);
  const midY = useTransform(parallax.y, (v) => v * 0.55);
  const farX = useTransform(parallax.x, (v) => v * 0.25);
  const farY = useTransform(parallax.y, (v) => v * 0.25);
  const nearX = useTransform(parallax.x, (v) => v * 1.15);
  const nearY = useTransform(parallax.y, (v) => v * 1.15);
  const rotY = useTransform(parallax.x, (v) => v * 0.35);
  const rotX = useTransform(parallax.y, (v) => -v * 0.3);
  const [leftPreview, rightPreview] = featuredProjects;

  return (
    <section
      id="home"
      onMouseMove={parallax.onMove}
      onMouseLeave={parallax.onLeave}
      className="relative overflow-hidden bg-dark pt-[var(--header-h)] text-white"
    >
      <div className="hero-glow" aria-hidden />
      <motion.div
        aria-hidden
        style={parallax.enabled ? { x: farX, y: farY } : undefined}
        className="hero-grid will-change-transform"
      />
      <HeroLines />

      <AmbientOrb className="-left-24 top-1/4 size-[28rem]" color="primary" />
      <AmbientOrb
        className="-right-16 bottom-0 size-[22rem]"
        color="accent"
      />

      <div className="container-shell relative grid min-h-[calc(100svh-var(--header-h))] items-center gap-12 py-6 pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-12 lg:pb-16">
        <motion.div
          style={parallax.enabled ? { x: midX, y: midY } : undefined}
          className="relative z-10 max-w-2xl will-change-transform"
        >
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: DURATION.reveal, ease: EASE.out }}
            className="font-display text-[clamp(1.65rem,3.2vw,1.5rem)] font-bold tracking-[-0.04em] text-white"
          >
            {personal.name}
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE.out }}
            className="mt-2 font-mono text-[12px] uppercase tracking-[0.16em] text-accent"
          >
            {personal.brandLine}
          </motion.p>

          <div className="mt-6 max-w-[36rem]">
            {reduced ? (
              <h1 className="font-display text-[clamp(2rem,4.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.045em]">
                {personal.headline}
              </h1>
            ) : (
              <TextReveal
                text={personal.headline}
                as="h1"
                mode="words"
                delay={0.2}
                className="font-display text-[clamp(2rem,4.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.045em]"
              />
            )}
          </div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: EASE.out }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-on-dark-muted md:text-lg"
          >
            {personal.supportingCopy}
          </motion.p>

          <motion.ul
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.62, ease: EASE.out }}
            className="mt-5 flex max-w-xl flex-wrap gap-2"
            aria-label="Primary services"
          >
            {personal.heroServices.map((service) => (
              <li
                key={service}
                className="rounded-md border border-white/12 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-on-dark-muted"
              >
                {service}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.72, ease: EASE.out }}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Button
              href="#contact"
              magnetic
              className="w-full justify-center sm:w-auto"
              onClick={() => trackEvent("hero_cta_click", { cta: "estimate" })}
            >
              Get a Free Project Estimate
            </Button>
            <Button
              href="#work"
              variant="secondary"
              magnetic
              className="w-full justify-center sm:w-auto"
              onClick={() => trackEvent("hero_cta_click", { cta: "view_work" })}
            >
              View My Work
            </Button>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.45 }}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-on-dark-muted"
          >
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-success opacity-40 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {personal.availability}
          </motion.div>
        </motion.div>

        <Perspective className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 48, rotateX: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{
              duration: DURATION.hero,
              delay: 0.28,
              ease: EASE.out,
            }}
            style={
              parallax.enabled
                ? { x: nearX, y: nearY, rotateX: rotX, rotateY: rotY }
                : undefined
            }
            className="relative will-change-transform"
          >
            <div className="relative px-2 sm:px-6 lg:px-8">
              <div
                className="absolute -inset-3 rounded-[1.35rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/20 blur-xl"
                aria-hidden
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem] border border-border-dark bg-dark-elevated shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
                <Image
                  src={personal.heroImage}
                  alt="Pardeep Kaushik, full-stack web developer"
                  fill
                  priority
                  fetchPriority="high"
                  quality={65}
                  sizes="(max-width: 1024px) 70vw, 420px"
                  className="object-cover object-[50%_12%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-90" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(15,118,110,0.35), transparent)",
                  }}
                  aria-hidden
                />
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
        </Perspective>
      </div>

      <ScrollIndicator href="#work" className="hidden sm:flex" />
    </section>
  );
}
