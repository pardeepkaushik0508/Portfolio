"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ScrollIndicatorProps = {
  href?: string;
  className?: string;
  label?: string;
};

export function ScrollIndicator({
  href = "#work",
  className,
  label = "Scroll",
}: ScrollIndicatorProps) {
  const reduced = useReducedMotion();

  return (
    <a
      href={href}
      className={cn(
        "group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55 transition hover:text-white/90",
        className,
      )}
      aria-label={label}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
        {label}
      </span>
      <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/25 pt-1.5">
        <motion.span
          aria-hidden
          className="block size-1.5 rounded-full bg-accent"
          animate={
            reduced
              ? undefined
              : {
                  y: [0, 14, 0],
                  opacity: [1, 0.35, 1],
                }
          }
          transition={{
            duration: DURATION.ambient * 0.7,
            repeat: Infinity,
            ease: EASE.inOut,
          }}
        />
      </span>
    </a>
  );
}
