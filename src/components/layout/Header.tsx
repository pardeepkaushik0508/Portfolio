"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, LayoutGroup } from "framer-motion";
import { navItems, personal } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-5" aria-hidden>
      <motion.span
        className="absolute left-0 top-[5px] h-[1.5px] w-5 origin-center rounded-full bg-current"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        transition={{ duration: DURATION.hover, ease: EASE.out }}
      />
      <motion.span
        className="absolute left-0 top-[9.5px] h-[1.5px] w-5 rounded-full bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: DURATION.micro }}
      />
      <motion.span
        className="absolute left-0 top-[14px] h-[1.5px] w-5 origin-center rounded-full bg-current"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        transition={{ duration: DURATION.hover, ease: EASE.out }}
      />
    </span>
  );
}

function isItemActive(pathname: string, itemHref: string, homeHash: string) {
  if (itemHref === "/blog") return pathname.startsWith("/blog");
  if (itemHref.startsWith("/#")) {
    return pathname === "/" && homeHash === itemHref.replace("/", "");
  }
  if (itemHref.startsWith("#")) {
    return pathname === "/" && homeHash === itemHref;
  }
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [homeScrolled, setHomeScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [homeActive, setHomeActive] = useState("#home");
  const [entered, setEntered] = useState(false);
  const menuId = useId();
  const reduced = useReducedMotion();

  const scrolled = onHome ? homeScrolled : true;
  const onHero = onHome && !scrolled;

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (!onHome) return;

    const hashIds = navItems
      .filter((item) => item.href.includes("#"))
      .map((item) => item.href.split("#")[1])
      .filter(Boolean) as string[];

    const sectionIds = ["work", "services", "about", "experience", "process", "testimonials", "faq", "contact"];
    const ids = [...new Set([...hashIds, ...sectionIds])];

    const sections = ["home", ...ids]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let ticking = false;

    function updateFromScroll() {
      ticking = false;
      const y = window.scrollY;
      setHomeScrolled(y > 20);

      if (!sections.length) return;

      const headerOffset = 96;
      const probe = y + headerOffset + window.innerHeight * 0.22;
      let current = "home";

      for (const section of sections) {
        if (section.offsetTop <= probe) {
          current = section.id;
        }
      }

      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 48;
      if (nearBottom) {
        current = "contact";
      }

      const href = current === "home" ? "#home" : `#${current}`;
      setHomeActive((prev) => (prev === href ? prev : href));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateFromScroll);
    }

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

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

  function handleNavClick() {
    setOpen(false);
  }

  const items = [
    ...navItems.map((item) => ({
      label: item.label,
      href: item.href,
      key: item.href,
    })),
    { label: "Blog", href: "/blog", key: "/blog" },
  ];

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -24, opacity: 0 }}
        animate={entered ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.55, ease: EASE.out }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          onHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border/80 bg-white/88 shadow-[0_1px_0_rgba(12,18,16,0.04),0_12px_32px_rgba(12,18,16,0.06)] backdrop-blur-xl",
        )}
      >
        <div className="container-shell flex h-16 items-center justify-between gap-4">
          <Link
            href={onHome ? "#home" : "/"}
            onClick={() => handleNavClick()}
            className={cn(
              "font-display text-[1rem] font-bold tracking-[-0.03em] transition-colors duration-200 md:text-[1.05rem]",
              onHero ? "text-white" : "text-foreground",
            )}
          >
            {personal.firstName}
            <span className={onHero ? "text-accent" : "text-primary"}>.</span>
          </Link>

          <LayoutGroup id="nav-pill">
            <nav
              className="hidden items-center gap-0.5 lg:flex"
              aria-label="Primary"
            >
              {items.map((item) => {
                const isActive = isItemActive(pathname, item.key, homeActive);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => handleNavClick()}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative cursor-pointer px-2.5 py-2 text-sm transition-colors duration-200 xl:px-3",
                      onHero
                        ? isActive
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : isActive
                          ? "text-primary"
                          : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className={cn(
                          "absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full",
                          onHero ? "bg-accent" : "bg-primary",
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>

          <div className="flex items-center gap-2">
            <Button
              href="/contact"
              size="sm"
              magnetic
              className="hidden sm:inline-flex"
              onClick={() => {
                handleNavClick();
                trackEvent("hero_cta_click", { location: "header" });
              }}
            >
              Start a Project
            </Button>

            <button
              type="button"
              className={cn(
                "inline-flex size-11 cursor-pointer items-center justify-center rounded-lg border transition duration-200 lg:hidden",
                onHero
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-border text-foreground hover:bg-background",
              )}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: EASE.out }}
            className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-xl lg:hidden"
            style={{ perspective: 1200 }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse 50% 40% at 80% 10%, rgba(15,118,110,0.35), transparent), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(196,120,42,0.2), transparent)",
              }}
            />
            <div className="relative flex h-full flex-col px-6 pb-10 pt-24">
              <nav className="flex flex-1 flex-col gap-1" aria-label="Mobile">
                {items.map((item, i) => {
                  const isActive = isItemActive(pathname, item.key, homeActive);
                  return (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      onClick={() => handleNavClick()}
                      aria-current={isActive ? "page" : undefined}
                      initial={
                        reduced
                          ? false
                          : { opacity: 0, y: 28, rotateX: -18, z: -40 }
                      }
                      animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                      transition={{
                        delay: 0.08 + STAGGER.base * i,
                        duration: 0.5,
                        ease: EASE.out,
                      }}
                      className={cn(
                        "border-b border-border-dark py-4 font-display text-3xl tracking-tight",
                        isActive ? "text-accent" : "text-white",
                      )}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </nav>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <Button
                  href="/contact"
                  className="w-full"
                  magnetic
                  onClick={() => {
                    handleNavClick();
                    trackEvent("hero_cta_click", { location: "mobile_menu" });
                  }}
                >
                  Start a Project
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
