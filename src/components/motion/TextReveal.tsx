"use client";

import { useRef, type ElementType } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { DURATION, EASE, STAGGER, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.tight,
      delayChildren: 0.06,
    },
  },
};

const wordItem: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
    rotateX: 40,
  },
  show: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: DURATION.reveal,
      ease: EASE.out,
    },
  },
};

type TextRevealProps = {
  text: string;
  className?: string;
  as?: ElementType;
  mode?: "words" | "lines" | "chars";
  delay?: number;
  once?: boolean;
};

/**
 * Animated reveal of a single semantic text node.
 * Words/chars are the real heading/paragraph content — no aria-label clone.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "p",
  mode = "words",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, {
    once,
    amount: VIEWPORT.amount,
    margin: VIEWPORT.margin,
  });
  const parts =
    mode === "lines"
      ? text.split("\n")
      : mode === "chars"
        ? text.split("")
        : text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={cn(className)}>
      <motion.span
        className="inline"
        variants={wordContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delayChildren: delay }}
      >
        {parts.map((part, i) => (
          <span
            key={`${part}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ perspective: 600 }}
          >
            <motion.span
              className="inline-block origin-bottom"
              variants={wordItem}
              style={{ transformStyle: "preserve-3d" }}
            >
              {part}
              {mode === "words" && i < parts.length - 1 ? "\u00A0" : null}
              {mode === "lines" && i < parts.length - 1 ? <br /> : null}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
