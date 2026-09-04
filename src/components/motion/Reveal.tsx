"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { DURATION, EASE, STAGGER, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealVariant =
  | "fade-up"
  | "fade"
  | "scale"
  | "slide-left"
  | "slide-right"
  | "blur"
  | "clip-up"
  | "clip-left"
  | "rotate-in"
  | "depth";

function getVariants(variant: RevealVariant | undefined, y: number) {
  switch (variant) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.94 },
        show: { opacity: 1, scale: 1 },
      };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: -36 },
        show: { opacity: 1, x: 0 },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: 36 },
        show: { opacity: 1, x: 0 },
      };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
        show: { opacity: 1, filter: "blur(0px)", y: 0 },
      };
    // Soft y-rise only — full clip-path hides text forever if IO misses.
    case "clip-up":
      return {
        hidden: { opacity: 0, y: Math.max(y, 28) },
        show: { opacity: 1, y: 0 },
      };
    case "clip-left":
      return {
        hidden: { opacity: 0, x: -28 },
        show: { opacity: 1, x: 0 },
      };
    case "rotate-in":
      return {
        hidden: {
          opacity: 0,
          rotateX: 14,
          y: 28,
          transformPerspective: 900,
        },
        show: {
          opacity: 1,
          rotateX: 0,
          y: 0,
          transformPerspective: 900,
        },
      };
    case "depth":
      return {
        hidden: { opacity: 0, z: -40, scale: 0.96, y: 20 },
        show: { opacity: 1, z: 0, scale: 1, y: 0 },
      };
    default:
      return {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0 },
      };
  }
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  variant?: RevealVariant;
  duration?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  once = true,
  variant = "fade-up",
  duration = DURATION.reveal,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const v = getVariants(variant, y);
  const inView = useInView(ref, {
    once,
    amount: VIEWPORT.amount,
    margin: VIEWPORT.margin,
  });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={v.hidden}
      animate={inView ? v.show : v.hidden}
      transition={{
        duration,
        delay,
        ease: EASE.out,
      }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.04,
    },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  stagger?: number;
  delayChildren?: number;
};

export function Stagger({
  children,
  className,
  once = true,
  stagger = STAGGER.base,
  delayChildren = 0.04,
}: StaggerProps) {
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

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={{
        ...containerVariants,
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
};

export function StaggerItem({
  children,
  className,
  variant = "fade-up",
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const v = getVariants(variant, 24);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: v.hidden,
        show: {
          ...v.show,
          transition: {
            duration: DURATION.reveal,
            ease: EASE.out,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
