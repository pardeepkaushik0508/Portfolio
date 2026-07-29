"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  /** fade-up (default) | fade | scale | slide-left | slide-right */
  variant?: "fade-up" | "fade" | "scale" | "slide-left" | "slide-right";
};

function getInitial(
  variant: RevealProps["variant"],
  y: number,
): { opacity: number; y?: number; x?: number; scale?: number } {
  switch (variant) {
    case "fade":
      return { opacity: 0 };
    case "scale":
      return { opacity: 0, scale: 0.96 };
    case "slide-left":
      return { opacity: 0, x: -28 };
    case "slide-right":
      return { opacity: 0, x: 28 };
    default:
      return { opacity: 0, y };
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  variant = "fade-up",
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={getInitial(variant, y)}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount: 0.12, margin: "0px 0px -24px 0px" }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
};

/** Parent for staggered child reveals. Pair with `StaggerItem`. */
export function Stagger({ children, className, once = true }: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.12, margin: "0px 0px -32px 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
