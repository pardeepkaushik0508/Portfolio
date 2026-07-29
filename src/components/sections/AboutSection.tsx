"use client";

import Image from "next/image";
import { personal } from "@/data/personal";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function AboutSection() {
  return (
    <section id="about" className="section-shell section-mesh">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal variant="slide-left">
          <div className="relative mx-auto w-full max-w-[100%] lg:mx-0">
            <div
              className="absolute -inset-3 rounded-[1.35rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/15 blur-lg"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.15rem] border border-border bg-surface shadow-[var(--shadow-md)]">
              <Image
                src={personal.profileImage}
                alt="Pardeep Kaushik professional portrait"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 80vw, 400px"
                className="h-auto w-full object-cover object-[50%_18%]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} variant="slide-right">
          <p className="eyebrow">About</p>
          <TypedHeading
            text="Full-stack and CMS specialist based in Chandigarh."
            className="section-heading mt-4"
          />
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
            {personal.aboutIntro}
          </p>

          <ul className="mt-8 space-y-3">
            {personal.aboutPoints.map((point) => (
              <li key={point} className="flex gap-3 text-[0.9375rem] text-foreground">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              href={personal.resume}
              download
              onClick={() => trackEvent("resume_download", { location: "about" })}
            >
              Download Resume
            </Button>
            <Button href="#contact" variant="dark">
              Discuss Your Project
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
