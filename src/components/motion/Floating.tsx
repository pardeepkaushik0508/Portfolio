"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FloatingProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
};

export function Floating({
  children,
  className,
  style,
  amplitude = 10,
  duration = DURATION.ambient,
  delay = 0,
  rotate = 0,
}: FloatingProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={style}
      animate={{
        y: [0, -amplitude, 0],
        rotate: rotate ? [0, rotate, 0] : undefined,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

type PerspectiveProps = {
  children: ReactNode;
  className?: string;
  perspective?: number;
};

export function Perspective({
  children,
  className,
  perspective = 1000,
}: PerspectiveProps) {
  return (
    <div
      className={cn(className)}
      style={{ perspective, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

type AmbientOrbProps = {
  className?: string;
  color?: "primary" | "accent";
};

export function AmbientOrb({ className, color = "primary" }: AmbientOrbProps) {
  const reduced = useReducedMotion();
  const bg = color === "accent" ? "bg-accent/20" : "bg-primary/25";

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        bg,
        className,
      )}
      animate={
        reduced
          ? undefined
          : {
              x: [0, 24, -12, 0],
              y: [0, -18, 10, 0],
              scale: [1, 1.08, 0.96, 1],
            }
      }
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: EASE.inOut,
      }}
    />
  );
}
