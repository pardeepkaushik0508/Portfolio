"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 left-5 z-40 inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-[var(--shadow-md)] hover:border-primary hover:text-primary max-[430px]:bottom-4 max-[430px]:left-4"
          aria-label="Back to top"
        >
          <ArrowUp className="size-4" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
