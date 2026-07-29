"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ROLES = [
  "Full-Stack Developer",
  "WordPress Developer",
  "Shopify Developer",
  "Next.js Developer",
] as const;

const INTERVAL_MS = 2750;

type RotatingRolesProps = {
  className?: string;
};

export function RotatingRoles({ className }: RotatingRolesProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return (
      <p className={cn("mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-accent", className)}>
        {ROLES[0]}
      </p>
    );
  }

  return (
    <div
      className={cn(
        "relative mt-1 h-[1.125rem] overflow-hidden font-mono text-[12px] uppercase tracking-[0.12em] text-accent",
        className,
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={ROLES[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 m-0 leading-[1.125rem]"
        >
          {ROLES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
