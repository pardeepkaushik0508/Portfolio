"use client";

import { useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { personal, navItems } from "@/data/personal";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";
import { AmbientOrb, Floating } from "@/components/motion/Floating";
import { LeadForm } from "@/components/ui/LeadForm";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { useFinePointer } from "@/hooks/useFinePointer";
import { trackEvent } from "@/lib/analytics";

/** Contact + Footer merged into one dark section shell. */
export function ContactSection() {
  const shellRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const year = new Date().getFullYear();

  function onSpotMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!fine || reduced || !shellRef.current) return;
    const rect = shellRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    shellRef.current.style.setProperty("--spot-x", `${x}%`);
    shellRef.current.style.setProperty("--spot-y", `${y}%`);
  }

  const channels = [
    {
      label: "Email",
      href: `mailto:${personal.email}`,
      onClick: () => trackEvent("email_click", { location: "contact" }),
    },
    {
      label: "WhatsApp",
      href: personal.whatsapp,
      external: true,
      onClick: () => trackEvent("whatsapp_click", { location: "contact" }),
    },
    {
      label: "Call",
      href: `tel:+${personal.phoneRaw}`,
      onClick: () => trackEvent("book_call_click", { location: "contact" }),
    },
  ];

  return (
    <section
      id="contact"
      className="bg-background px-4 pb-6 pt-[clamp(4.5rem,9vw,7.5rem)] sm:px-6 sm:pb-8"
    >
      <div className="container-shell">
        <div
          ref={shellRef}
          onMouseMove={onSpotMove}
          className="contact-spotlight-host section-ink relative overflow-hidden rounded-[1.5rem] border border-border-dark text-white shadow-[0_28px_70px_rgba(12,18,16,0.18)]"
        >
          <div className="contact-spotlight" aria-hidden />
          <AmbientOrb
            className="-right-20 -top-10 size-[22rem] opacity-70"
            color="primary"
          />
          <Floating
            amplitude={12}
            duration={8}
            className="pointer-events-none absolute bottom-8 left-8 size-24 rounded-full border border-white/10 opacity-30"
          />

          <div className="relative grid gap-8 px-5 py-8 sm:px-7 sm:py-10 md:px-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10 lg:py-11">
            <Reveal variant="rotate-in">
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                Free estimate · Sample design · Demo
              </p>
              {reduced ? (
                <TypedHeading
                  text="Get a free project estimate — no fluff."
                  className="mt-3 max-w-[22ch] font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.045em]"
                />
              ) : (
                <TextReveal
                  text="Get a free project estimate — no fluff."
                  as="h2"
                  mode="words"
                  className="mt-3 max-w-[22ch] font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.045em]"
                />
              )}
              <p className="mt-3 max-w-md text-sm leading-relaxed text-on-dark-muted md:text-[0.9375rem]">
                Share your requirement and I&apos;ll reply with a practical plan —
                plus free estimation, sample design direction and a demo path when
                the brief fits.
              </p>

              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-on-dark-muted">
                <li className="inline-flex items-center gap-1.5">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  Free estimation
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  Sample design
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  Demo path
                </li>
              </ul>

              <div className="mt-5 space-y-2.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-on-dark-muted">
                  Prefer a direct channel?
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {channels.map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target={ch.external ? "_blank" : undefined}
                      rel={ch.external ? "noopener noreferrer" : undefined}
                      onClick={ch.onClick}
                      className="inline-flex min-h-10 cursor-pointer items-center rounded-lg border border-border-dark bg-dark-elevated px-3.5 py-2 text-sm text-on-dark transition duration-200 hover:border-accent hover:text-accent"
                    >
                      {ch.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal variant="depth" delay={0.1}>
              <LeadForm
                source="contact_section"
                idPrefix="contact"
                submitLabel="Get Free Estimate"
                compact
                className="!p-4 sm:!p-5"
              />
            </Reveal>
          </div>

          <div className="relative border-t border-white/10 px-6 py-8 sm:px-8 md:px-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
              <div className="max-w-sm">
                <p className="font-display text-lg font-bold tracking-tight">
                  {personal.name}
                  <span className="text-accent">.</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                  Full-Stack Developer · {personal.location}
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
                      href="/blog"
                      className="motion-link-underline cursor-pointer transition duration-200 hover:text-white"
                    >
                      Blog
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

            <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
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
    </section>
  );
}
