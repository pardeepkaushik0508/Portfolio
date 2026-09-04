"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  once?: boolean;
};

export function ImageReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  once = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, {
    once,
    amount: VIEWPORT.amount,
    margin: VIEWPORT.margin,
  });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    direction === "left"
      ? { opacity: 0, x: -36, scale: 1.02 }
      : direction === "right"
        ? { opacity: 0, x: 36, scale: 1.02 }
        : direction === "scale"
          ? { opacity: 0, scale: 1.08 }
          : { opacity: 0, y: 28, scale: 1.02 };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={hidden}
        animate={
          inView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }
            : undefined
        }
        transition={{
          duration: DURATION.section,
          delay,
          ease: EASE.out,
        }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
