"use client";

import { BadgeCheck, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating
              ? "fill-accent text-accent"
              : "fill-transparent text-border",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({
  showHeading = true,
  compact = false,
}: {
  showHeading?: boolean;
  compact?: boolean;
}) {
  if (!testimonials.length) return null;

  return (
    <section
      id="testimonials"
      className={cn(
        "section-shell section-mesh",
        compact && "border-t border-border",
      )}
    >
      <div className="container-shell">
        {showHeading ? (
          <Reveal variant="fade-up">
            <p className="eyebrow">Reviews</p>
            <TypedHeading
              text="Endorsements from past clients."
              className="section-heading mt-4"
            />
            <p className="section-lead">
              Real feedback from Upwork and LinkedIn — jewellery website
              delivery, WordPress builds and website projects.
            </p>
          </Reveal>
        ) : null}

        <Stagger
          className={cn(
            "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
            showHeading ? "mt-10 lg:mt-12" : "mt-0",
          )}
          stagger={0.08}
        >
          {testimonials.map((item) => (
            <StaggerItem key={item.id} variant="fade-up">
              <figure className="flex h-full flex-col rounded-[1.15rem] border border-border bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {typeof item.rating === "number" ? (
                    <Stars rating={item.rating} />
                  ) : null}
                  {item.verified ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 font-mono text-[10px] font-medium text-success">
                      <BadgeCheck className="size-3" aria-hidden />
                      Verified
                    </span>
                  ) : null}
                </div>

                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground">
                  “{item.feedback}”
                </blockquote>

                {item.endorsements?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.endorsements.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-display text-[0.95rem] font-semibold tracking-tight">
                    {item.name}
                  </p>
                  {(item.role || item.project) && (
                    <p className="mt-0.5 text-xs leading-snug text-muted">
                      {[item.role, item.project].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex text-xs text-primary transition hover:text-primary-hover"
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
