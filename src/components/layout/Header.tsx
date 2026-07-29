"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, personal } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SECTION_IDS = navItems
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href.replace("#", ""));

function resolveHref(href: string, onHome: boolean) {
  if (href.startsWith("http") || href.startsWith("/")) return href;
  if (href.startsWith("#")) return onHome ? href : `/${href}`;
  return href;
}

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onBlog = pathname?.startsWith("/blog") ?? false;
  const [scrolled, setScrolled] = useState(!onHome);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(onBlog ? "/blog" : "#home");
  const menuId = useId();
  const onHero = onHome && !scrolled;

  useEffect(() => {
    if (!onHome) {
      setScrolled(true);
      setActive(onBlog ? "/blog" : "");
      return;
    }

    const sections = ["home", ...SECTION_IDS]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let ticking = false;

    function updateFromScroll() {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 20);

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
        current = SECTION_IDS[SECTION_IDS.length - 1] ?? current;
      }

      const href = current === "home" ? "#home" : `#${current}`;
      setActive((prev) => (prev === href ? prev : href));
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
  }, [onHome, onBlog]);

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

  function handleNavClick(href: string) {
    setActive(href);
    setOpen(false);
  }

  const items = [
    ...navItems.map((item) => ({
      label: item.label,
      href: resolveHref(item.href, onHome),
      key: item.href,
    })),
    { label: "Blog", href: "/blog", key: "/blog" },
  ];

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
          <Link
            href={onHome ? "#home" : "/"}
            onClick={() => handleNavClick(onHome ? "#home" : "/")}
            className={cn(
              "font-display text-[1rem] font-bold tracking-[-0.03em] transition-colors md:text-[1.05rem]",
              onHero ? "text-white" : "text-foreground",
            )}
          >
            {personal.firstName}
            <span className={onHero ? "text-accent" : "text-primary"}>.</span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {items.map((item) => {
              const isActive =
                item.key === "/blog"
                  ? onBlog
                  : onHome && active === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => handleNavClick(item.key)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm transition-colors",
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
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full",
                        onHero ? "bg-accent" : "bg-primary",
                      )}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={onHome ? "#contact" : "/#contact"}
              size="sm"
              magnetic
              className="hidden sm:inline-flex"
              onClick={() => {
                handleNavClick("#contact");
                trackEvent("hero_cta_click", { location: "header" });
              }}
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
                {items.map((item, i) => {
                  const isActive =
                    item.key === "/blog"
                      ? onBlog
                      : onHome && active === item.key;
                  return (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      onClick={() => handleNavClick(item.key)}
                      aria-current={isActive ? "page" : undefined}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className={cn(
                        "border-b border-border-dark py-4 font-display text-3xl tracking-tight",
                        isActive ? "text-accent" : "text-white",
                      )}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </nav>

              <Button
                href={onHome ? "#contact" : "/#contact"}
                className="w-full"
                onClick={() => {
                  handleNavClick("#contact");
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
