"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type CSSProperties,
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
 * Typewriter heading — one crawler-readable copy of the phrase.
 *
 * SSR / reduced-motion / finished: a single real text node.
 * While animating: sr-only full phrase + aria-hidden painted glyphs (no invisible text clone).
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
  const rootRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(!startOnView);
  const [hydrated, setHydrated] = useState(false);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (reduced || !startOnView) return;

    const node = rootRef.current;
    if (!node) return;

    let settled = false;
    const activate = () => {
      if (settled) return;
      settled = true;
      setActive(true);
    };

    const isVisiblyNear = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      return rect.top < vh * 0.95 && rect.bottom > vh * 0.05;
    };

    if (isVisiblyNear()) {
      activate();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 18% 0px" },
    );

    observer.observe(node);

    const fallback = window.setTimeout(() => {
      if (isVisiblyNear()) activate();
    }, 900);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduced, startOnView]);

  useLayoutEffect(() => {
    if (!hydrated || reduced) return;
    const node = rootRef.current;
    if (!node) return;

    const width = node.clientWidth || node.getBoundingClientRect().width;
    if (!width) return;

    const cs = window.getComputedStyle(node);
    const probe = document.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    probe.textContent = text;
    probe.style.cssText = [
      "position:absolute",
      "left:-99999px",
      "top:0",
      "visibility:hidden",
      "pointer-events:none",
      "display:block",
      "white-space:normal",
      "overflow-wrap:break-word",
      "word-break:break-word",
      `width:${width}px`,
      `font:${cs.font}`,
      `letter-spacing:${cs.letterSpacing}`,
      `line-height:${cs.lineHeight}`,
      `text-transform:${cs.textTransform}`,
    ].join(";");
    document.body.appendChild(probe);
    setMinHeight(probe.offsetHeight);
    document.body.removeChild(probe);
  }, [hydrated, reduced, text, className]);

  useEffect(() => {
    if (reduced) return;
    if (!hydrated) return;
    if (!active) return;

    let cancelled = false;
    let charTimer: ReturnType<typeof setTimeout> | undefined;
    let i = 0;
    setCount(0);
    setDone(false);

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
  }, [text, delay, charMs, reduced, active, hydrated]);

  const Tag = as as ElementType;
  // Keep a single real text node until the typewriter should run (avoids
  // blanking every section heading on hydrate). SSR always gets one copy.
  const showStatic = !hydrated || reduced || done || !active;
  const style: CSSProperties | undefined =
    hydrated && !reduced && active && !done && minHeight
      ? { minHeight }
      : undefined;

  if (showStatic) {
    return (
      <Tag ref={rootRef} className={cn(className)} style={style}>
        {text}
      </Tag>
    );
  }

  // Client animation path: one sr-only semantic phrase; painted typewriter is decorative.
  return (
    <Tag ref={rootRef} className={cn("relative", className)} style={style}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 w-full whitespace-normal break-words"
      >
        {active ? text.slice(0, count) : null}
        {active ? <span className="typed-cursor" /> : null}
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
