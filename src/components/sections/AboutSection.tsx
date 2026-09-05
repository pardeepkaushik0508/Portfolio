"use client";

import Image from "next/image";
import { personal } from "@/data/personal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Parallax } from "@/components/motion/Parallax";
import { AmbientOrb } from "@/components/motion/Floating";
import { Button } from "@/components/ui/Button";
import { openLeadModal } from "@/components/ui/LeadModal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function AboutSection({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  return (
    <section id="about" className="section-shell section-mesh relative overflow-hidden">
      <AmbientOrb
        className="-right-32 top-1/3 size-[20rem] opacity-60"
        color="primary"
      />
      <div
        className="pointer-events-none absolute -left-10 bottom-10"
        aria-hidden
      >
        <Parallax
          offset={30}
          className="size-40 rounded-full border border-primary/10 opacity-40"
        />
      </div>

      <div className="container-shell relative grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal variant="rotate-in">
          <TiltCard intensity={6} lift={10} className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative">
              <Parallax offset={24} className="absolute -inset-3 rounded-[1.35rem]">
                <div
                  className="h-full w-full rounded-[1.35rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/15 blur-lg"
                  aria-hidden
                />
              </Parallax>
              <ImageReveal direction="up" className="relative overflow-hidden rounded-[1.15rem] border border-border bg-surface shadow-[var(--shadow-md)]">
                <Image
                  src={personal.profileImage}
                  alt="Pardeep Kaushik, Full Stack, WordPress and Shopify developer"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 80vw, 400px"
                  quality={70}
                  loading="lazy"
                  className="h-auto w-full object-cover object-top"
                />
              </ImageReveal>
            </div>
          </TiltCard>
        </Reveal>

        <div>
          {showHeading ? (
            <Reveal variant="blur" delay={0.05}>
              <p className="eyebrow">About</p>
              <TypedHeading
                text="Full Stack, WordPress & Shopify Developer for businesses worldwide."
                className="section-heading mt-4"
              />
            </Reveal>
          ) : null}

          <Reveal variant="slide-right" delay={0.12}>
            <p
              className={cn(
                "max-w-xl text-[0.9375rem] leading-relaxed text-muted md:text-base",
                showHeading ? "mt-5" : "mt-0",
              )}
            >
              {personal.aboutIntro}
            </p>
          </Reveal>

          <Stagger className="mt-8 space-y-3.5" stagger={0.07}>
            {personal.aboutPoints.map((point) => (
              <StaggerItem key={point} variant="clip-left">
                <div className="flex gap-3 text-[0.9375rem] leading-relaxed text-foreground">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span>{point}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal variant="fade-up" delay={0.2}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href={personal.resume}
                download
                magnetic
                className="w-full justify-center sm:w-auto"
                onClick={() =>
                  trackEvent("resume_download", { location: "about" })
                }
              >
                Download Resume
              </Button>
              <Button
                type="button"
                variant="dark"
                magnetic
                className="w-full justify-center sm:w-auto"
                onClick={() => openLeadModal("about")}
              >
                Discuss Your Project
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
