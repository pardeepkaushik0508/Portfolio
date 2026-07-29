"use client";

import { navItems, personal } from "@/data/personal";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/motion/Reveal";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background pb-6 sm:pb-8">
      <div className="container-shell">
        <Reveal y={20}>
          <div className="overflow-hidden rounded-b-[1.25rem] border border-t-0 border-border-dark bg-dark text-white shadow-[0_28px_70px_rgba(12,18,16,0.18)]">
            <div className="border-t border-border-dark px-6 py-8 sm:px-8 md:px-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-sm">
                  <p className="font-display text-lg font-bold tracking-tight">
                    {personal.name}
                    <span className="text-accent">.</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                    Full-Stack Developer · {personal.location}
                  </p>
                </div>

                <nav aria-label="Footer">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-on-dark-muted">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <a href={item.href} className="transition hover:text-white">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex flex-wrap items-center gap-4 text-sm text-on-dark-muted">
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("linkedin_click", { location: "footer" })
                    }
                    className="inline-flex items-center gap-2 transition hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="size-4" />
                    <span className="sm:hidden">LinkedIn</span>
                  </a>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition hover:text-white"
                    aria-label="GitHub"
                  >
                    <GitHubIcon className="size-4" />
                    <span className="sm:hidden">GitHub</span>
                  </a>
                  <a
                    href={`mailto:${personal.email}`}
                    onClick={() =>
                      trackEvent("email_click", { location: "footer" })
                    }
                    className="transition hover:text-white"
                  >
                    Email
                  </a>
                  <a
                    href={personal.resume}
                    download
                    onClick={() =>
                      trackEvent("resume_download", { location: "footer" })
                    }
                    className="transition hover:text-white"
                  >
                    Resume
                  </a>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2 border-t border-border-dark pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
                <p>
                  © {year} {personal.name}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <a href="/sitemap" className="transition hover:text-white">
                    Sitemap
                  </a>
                  <a href="/sitemap.xml" className="transition hover:text-white">
                    Sitemap XML
                  </a>
                  <p>Available Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
