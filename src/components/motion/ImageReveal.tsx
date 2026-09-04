"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  once?: boolean;
};

/**
 * Scroll-in for project media. Uses whileInView so images never stay
 * stuck at opacity 0 after the first intersection.
 */
export function ImageReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  once = true,
}: ImageRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    direction === "left"
      ? { opacity: 0, x: -20, scale: 1.02 }
      : direction === "right"
        ? { opacity: 0, x: 20, scale: 1.02 }
        : direction === "scale"
          ? { opacity: 0, scale: 1.05 }
          : { opacity: 0, y: 16, scale: 1.02 };

  const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={reduced ? false : { ...hidden, opacity: 0.35 }}
        whileInView={shown}
        viewport={{
          once,
          amount: 0.01,
          margin: "0px 0px 120px 0px",
        }}
        transition={{
          duration: Math.min(DURATION.section, 0.45),
          delay: Math.min(delay, 0.08),
          ease: EASE.out,
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
