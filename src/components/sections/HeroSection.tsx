"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { personal } from "@/data/personal";
import { featuredProjects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { RotatingRoles } from "@/components/motion/RotatingRoles";
import { TypedHeadline } from "@/components/motion/TypedHeadline";
import { HeroLines } from "@/components/sections/HeroLines";
import { trackEvent } from "@/lib/analytics";

export function HeroSection() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const previews = featuredProjects.slice(0, 3);

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
            <span
              className="size-2 rounded-full bg-success"
              aria-hidden
            />
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
          <div className="relative">
            <div className="absolute -inset-3 rounded-[1.35rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/20 blur-xl" aria-hidden />
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

            <div className="absolute -left-4 top-8 hidden w-[42%] overflow-hidden rounded-xl border border-border-dark bg-dark-elevated/95 shadow-xl backdrop-blur-sm sm:block lg:-left-10">
              <div className="flex items-center gap-1 border-b border-border-dark px-2.5 py-1.5">
                <span className="size-1.5 rounded-full bg-white/25" />
                <span className="size-1.5 rounded-full bg-white/25" />
                <span className="size-1.5 rounded-full bg-white/25" />
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src={previews[0]?.image ?? personal.profileImage}
                  alt={`${previews[0]?.title ?? "Project"} preview`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-4 -right-2 hidden w-[46%] overflow-hidden rounded-xl border border-border-dark bg-dark-elevated/95 shadow-xl backdrop-blur-sm sm:block lg:-right-6">
              <div className="flex items-center gap-1 border-b border-border-dark px-2.5 py-1.5">
                <span className="size-1.5 rounded-full bg-white/25" />
                <span className="size-1.5 rounded-full bg-white/25" />
                <span className="size-1.5 rounded-full bg-white/25" />
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src={previews[1]?.image ?? personal.profileImage}
                  alt={`${previews[1]?.title ?? "Project"} preview`}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
