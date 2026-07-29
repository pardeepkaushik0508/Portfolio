"use client";

import { testimonials } from "@/data/testimonials";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";

export function TestimonialsSection() {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="section-shell section-mesh">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">Testimonials</p>
          <TypedHeading
            text="What clients have said."
            className="section-heading mt-4"
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-8 lg:grid-cols-2">
          {testimonials.map((item) => (
            <StaggerItem key={item.id}>
              <figure className="border-t border-border pt-8">
                <blockquote className="text-[1.05rem] leading-relaxed text-foreground">
                  “{item.feedback}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-base font-semibold">
                    {item.name}
                  </p>
                  {(item.company || item.project) && (
                    <p className="mt-1 text-sm text-muted">
                      {[item.project, item.company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-sm text-primary hover:text-primary-hover"
                    >
                      {item.sourceLabel || "View source"}
                    </a>
                  ) : null}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
