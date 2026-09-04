"use client";

import {
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { EASE, PERSPECTIVE, TILT } from "@/lib/motion";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  lift?: number;
  disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Subtle 3D tilt — no extra shadow layer (that caused the white box behind cards).
 */
export function TiltCard({
  children,
  className,
  intensity,
  lift = 8,
  disabled = false,
  ...rest
}: TiltCardProps) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, EASE.tilt);
  const springY = useSpring(ry, EASE.tilt);
  const elevate = useSpring(0, EASE.tilt);
  const max =
    intensity ??
    (typeof window !== "undefined" && window.innerWidth < 1024
      ? TILT.tablet
      : TILT.desktop);
  const active = !disabled && !reduced && fine && max > 0;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
  }

  function onEnter() {
    if (!active) return;
    elevate.set(lift);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    elevate.set(0);
  }

  if (!active) {
    return (
      <div ref={ref} className={cn(className)} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: PERSPECTIVE.mid }}
      className={cn("transform-gpu", className)}
      {...rest}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          y: elevate,
          transformStyle: "preserve-3d",
        }}
        className="h-full overflow-hidden rounded-[inherit] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
