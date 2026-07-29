"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TypedHeadingProps = {
  text: string;
  className?: string;
  /** Delay before typing starts (ms). */
  delay?: number;
  /** Ms per character. */
  charMs?: number;
  /** Semantic element. */
  as?: "h1" | "h2" | "h3" | "p";
  /** Start when heading enters the viewport (sections). Hero can set false. */
  startOnView?: boolean;
};

/**
 * Stable typewriter heading:
 * - Full text reserves layout height first (no jump / no upward shift)
 * - Visible typed layer overlays the reserved box
 * - Avoids text-balance / pre-wrap mid-type (those reflow lines)
 */
export function TypedHeading({
  text,
  className,
  delay = 180,
  charMs = 26,
  as = "h2",
  startOnView = true,
}: TypedHeadingProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLHeadingElement | null>(null);
  const [active, setActive] = useState(!startOnView);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced || !startOnView) return;

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, startOnView]);

  useEffect(() => {
    if (reduced) return;
    if (!active) return;

    let cancelled = false;
    let charTimer: ReturnType<typeof setTimeout> | undefined;
    let i = 0;

    const startTimer = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setCount(i);
        if (i >= text.length) {
          setDone(true);
          return;
        }
        charTimer = setTimeout(tick, charMs);
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      if (charTimer) clearTimeout(charTimer);
    };
  }, [text, delay, charMs, reduced, active]);

  const Tag = as as ElementType;
  const visibleCount = reduced ? text.length : count;
  const isDone = reduced || done;

  return (
    <Tag ref={rootRef} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative block w-full">
        <span className="invisible block w-full whitespace-normal break-words">
          {text}
        </span>
        <span className="absolute inset-x-0 top-0 w-full whitespace-normal break-words">
          {text.slice(0, visibleCount)}
          {!reduced ? (
            <span
              className={cn(
                "typed-cursor",
                isDone && "typed-cursor--idle",
              )}
            />
          ) : null}
        </span>
      </span>
    </Tag>
  );
}

/** Hero helper — same engine, starts immediately (not on scroll). */
export function TypedHeadline(
  props: Omit<TypedHeadingProps, "as" | "startOnView">,
) {
  return <TypedHeading {...props} as="h1" startOnView={false} />;
}
