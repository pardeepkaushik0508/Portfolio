"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
};

export function Spotlight({
  children,
  className,
  size = 280,
  color = "rgba(15, 118, 110, 0.14)",
}: SpotlightProps) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const opacity = useMotionValue(0);
  const sx = useSpring(x, EASE.parallax);
  const sy = useSpring(y, EASE.parallax);
  const so = useSpring(opacity, { stiffness: 120, damping: 20 });
  const active = !reduced && fine;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - size / 2);
    y.set(e.clientY - rect.top - size / 2);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => active && opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className={cn("relative overflow-hidden", className)}
    >
      {active ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            width: size,
            height: size,
            x: sx,
            y: sy,
            opacity: so,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          }}
        />
      ) : null}
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
