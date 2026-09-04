"use client";

import { useCallback, type MouseEvent } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";
import { EASE, PARALLAX } from "@/lib/motion";
import { useFinePointer } from "@/hooks/useFinePointer";

type Options = {
  strength?: number;
  spring?: SpringOptions;
};

export function usePointerParallax(options: Options = {}) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const strength = options.strength ?? 14;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, options.spring ?? EASE.parallax);
  const sy = useSpring(my, options.spring ?? EASE.parallax);
  const enabled = !reduced && fine;

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const factor =
        window.innerWidth < 768
          ? PARALLAX.mobile
          : window.innerWidth < 1024
            ? PARALLAX.tablet
            : PARALLAX.desktop;
      mx.set(((e.clientX - rect.left) / rect.width - 0.5) * strength * factor);
      my.set(
        ((e.clientY - rect.top) / rect.height - 0.5) * strength * 0.85 * factor,
      );
    },
    [enabled, mx, my, strength],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return {
    enabled,
    x: sx as MotionValue<number>,
    y: sy as MotionValue<number>,
    onMove,
    onLeave,
  };
}
