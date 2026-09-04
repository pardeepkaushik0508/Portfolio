"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PARALLAX } from "@/lib/motion";
import { cn } from "@/lib/utils";

function strengthFactor() {
  if (typeof window === "undefined") return PARALLAX.desktop;
  if (window.innerWidth < 768) return PARALLAX.mobile;
  if (window.innerWidth < 1024) return PARALLAX.tablet;
  return PARALLAX.desktop;
}

type ParallaxProps = {
  children?: ReactNode;
  className?: string;
  offset?: number;
  xOffset?: number;
  scaleRange?: [number, number];
};

export function Parallax({
  children,
  className,
  offset = 40,
  xOffset = 0,
  scaleRange,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const factor = reduced ? 0 : strengthFactor();
  const y = useTransform(scrollYProgress, [0, 1], [
    -offset * factor,
    offset * factor,
  ]);
  const x = useTransform(scrollYProgress, [0, 1], [
    -xOffset * factor,
    xOffset * factor,
  ]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleRange ?? [1, 1],
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        x,
        scale: scaleRange ? scale : undefined,
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

export function useClipReveal(progress: MotionValue<number>) {
  return useTransform(progress, [0, 1], [
    "inset(0 0 100% 0)",
    "inset(0 0 0% 0)",
  ]);
}
