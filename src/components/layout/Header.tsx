"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, personal } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#work");
  const menuId = useId();
  const onHero = !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["work", "services", "about", "experience", "process", "contact", "home"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          const id = visible.target.id;
          if (id === "home") return;
          setActive(`#${id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          onHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md",
        )}
      >
        <div className="container-shell flex h-16 items-center justify-between gap-4">
          <a
            href="#home"
            className={cn(
              "font-display text-[1rem] font-bold tracking-[-0.03em] transition-colors md:text-[1.05rem]",
              onHero ? "text-white" : "text-foreground",
            )}
          >
            {personal.firstName}
            <span className={onHero ? "text-accent" : "text-primary"}>.</span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors",
                  onHero
                    ? active === item.href
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                    : active === item.href
                      ? "text-primary"
                      : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
                {active === item.href ? (
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full",
                      onHero ? "bg-accent" : "bg-primary",
                    )}
                  />
                ) : null}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="#contact"
              size="sm"
              magnetic
              className="hidden sm:inline-flex"
              onClick={() => trackEvent("hero_cta_click", { location: "header" })}
            >
              Start a Project
            </Button>

            <button
              type="button"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-lg border lg:hidden",
                onHero
                  ? "border-white/25 text-white"
                  : "border-border text-foreground",
              )}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-md lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-24">
              <nav className="flex flex-1 flex-col gap-1" aria-label="Mobile">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className={cn(
                      "border-b border-border-dark py-4 font-display text-3xl tracking-tight",
                      active === item.href ? "text-accent" : "text-white",
                    )}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <Button
                href="#contact"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  trackEvent("hero_cta_click", { location: "mobile_menu" });
                }}
              >
                Start a Project
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
