"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, personal } from "@/data/personal";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { trackEvent } from "@/lib/analytics";

const MERGED_FOOTER_PATHS = new Set(["/", "/contact"]);

/**
 * Standalone footer for pages that do not include ContactSection
 * (Contact + Footer are merged on home and /contact).
 */
export function Footer() {
  const pathname = usePathname();
  if (MERGED_FOOTER_PATHS.has(pathname)) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-background px-4 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pt-4">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-border-dark bg-dark text-white shadow-[0_28px_70px_rgba(12,18,16,0.18)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 45% 50% at 100% 0%, rgba(15,118,110,0.22), transparent), radial-gradient(ellipse 35% 40% at 0% 100%, rgba(196,120,42,0.12), transparent)",
            }}
          />

          <div className="relative px-6 py-10 sm:px-8 sm:py-11 md:px-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
              <div className="max-w-sm">
                <p className="font-display text-lg font-bold tracking-tight">
                  {personal.name}
                  <span className="text-accent">.</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                  Full Stack, WordPress & Shopify Developer
                </p>
                <p className="mt-1 text-sm text-on-dark-muted">
                  {personal.brandLine}
                </p>
                <p className="mt-3 text-sm text-on-dark-muted">
                  {personal.availability}
                </p>
              </div>

              <nav aria-label="Footer">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-on-dark-muted">
                  Navigate
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-on-dark-muted">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="motion-link-underline cursor-pointer transition duration-200 hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/#work"
                      className="motion-link-underline cursor-pointer transition duration-200 hover:text-white"
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/experience"
                      className="motion-link-underline cursor-pointer transition duration-200 hover:text-white"
                    >
                      Experience
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reviews"
                      className="motion-link-underline cursor-pointer transition duration-200 hover:text-white"
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Main services">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-on-dark-muted">
                  Services
                </p>
                <ul className="flex flex-col gap-2 text-sm text-on-dark-muted">
                  <li>
                    <Link
                      href="/wordpress-developer"
                      className="motion-link-underline transition hover:text-white"
                    >
                      WordPress
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shopify-developer"
                      className="motion-link-underline transition hover:text-white"
                    >
                      Shopify
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/full-stack-developer"
                      className="motion-link-underline transition hover:text-white"
                    >
                      Full Stack
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/remote-web-developer"
                      className="motion-link-underline transition hover:text-white"
                    >
                      Remote / Worldwide
                    </Link>
                  </li>
                </ul>
              </nav>

              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-on-dark-muted">
                  Connect
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-on-dark-muted">
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("linkedin_click", { location: "footer" })
                    }
                    className="inline-flex cursor-pointer items-center gap-2 transition duration-200 hover:-translate-y-0.5 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="size-4" />
                    <span className="sm:hidden">LinkedIn</span>
                  </a>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-2 transition duration-200 hover:-translate-y-0.5 hover:text-white"
                    aria-label="GitHub"
                  >
                    <GitHubIcon className="size-4" />
                    <span className="sm:hidden">GitHub</span>
                  </a>
                  <a
                    href={personal.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("upwork_click", { location: "footer" })
                    }
                    className="motion-link-underline cursor-pointer transition duration-200 hover:text-white"
                  >
                    Upwork
                  </a>
                  <a
                    href={`tel:+${personal.phoneRaw}`}
                    onClick={() =>
                      trackEvent("book_call_click", { location: "footer" })
                    }
                    className="motion-link-underline cursor-pointer transition duration-200 hover:text-white"
                  >
                    Call
                  </a>
                  <a
                    href={`mailto:${personal.email}`}
                    onClick={() =>
                      trackEvent("email_click", { location: "footer" })
                    }
                    className="motion-link-underline cursor-pointer transition duration-200 hover:text-white"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {year} {personal.name}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <a
                  href="/feed.xml"
                  className="motion-link-underline cursor-pointer transition hover:text-white"
                >
                  RSS
                </a>
                <a
                  href="/sitemap"
                  className="motion-link-underline cursor-pointer transition hover:text-white"
                >
                  Sitemap
                </a>
                <p>Available Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
