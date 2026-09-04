"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { cn } from "@/lib/utils";

function FaqItemRow({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left transition hover:text-primary"
      >
        <span className="font-display text-lg tracking-tight text-foreground md:text-[1.15rem]">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "mt-1 size-5 shrink-0 text-muted transition duration-300",
            open && "rotate-180 text-primary",
          )}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        hidden={!open}
        className={cn(
          "pb-5 pr-4 text-[0.9375rem] leading-relaxed text-muted",
          !open && "hidden",
        )}
      >
        {answer}
      </div>
    </div>
  );
}

export function FaqSection({ showHeading = true }: { showHeading?: boolean }) {
  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section id="faq" className="section-shell border-t border-border bg-surface">
      <div className="container-shell">
        {showHeading ? (
          <Reveal variant="fade-up">
            <p className="eyebrow">FAQ</p>
            <TypedHeading
              text="Answers before you start a project."
              className="section-heading mt-4"
            />
            <p className="section-lead">
              Common questions about WordPress, speed optimization, timelines and
              working together.
            </p>
          </Reveal>
        ) : null}

        <div
          className={cn(
            "grid gap-x-10 gap-y-0 lg:grid-cols-2",
            showHeading ? "mt-10 lg:mt-12" : "mt-0",
          )}
        >
          <Stagger stagger={0.05}>
            {left.map((item, index) => (
              <StaggerItem key={item.id} variant="fade-up">
                <FaqItemRow
                  question={item.question}
                  answer={item.answer}
                  defaultOpen={index === 0}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger stagger={0.05} delayChildren={0.08}>
            {right.map((item) => (
              <StaggerItem key={item.id} variant="fade-up">
                <FaqItemRow question={item.question} answer={item.answer} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
