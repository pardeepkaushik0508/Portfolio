"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { personal } from "@/data/personal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Always-visible LinkedIn profile card (light theme).
 * Official badge iframe is unreliable in SPAs — we render a real card
 * and still attempt to hydrate the official badge when the script loads.
 */
export function LinkedInProfileCard({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [badgeReady, setBadgeReady] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      IN?: { parse?: (node?: HTMLElement) => void };
    };
    const tryParse = () => {
      if (!hostRef.current) return;
      win.IN?.parse?.(hostRef.current);
      const iframe = hostRef.current.querySelector("iframe");
      if (iframe) setBadgeReady(true);
    };
    tryParse();
    const t1 = window.setTimeout(tryParse, 600);
    const t2 = window.setTimeout(tryParse, 1600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-[0_18px_50px_rgba(12,18,16,0.08)]",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0a66c2_0%,#004182_100%)] px-5 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
          LinkedIn
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-white">
          Professional profile
        </p>
      </div>

      <div className="relative -mt-8 px-5">
        <div className="flex items-end gap-4">
          <Image
            src={personal.profileImage}
            alt={`${personal.name} profile photo`}
            width={88}
            height={88}
            className="size-[88px] rounded-full border-4 border-white object-cover object-[50%_18%] shadow-md"
          />
          <div className="min-w-0 pb-1">
            <p className="truncate font-display text-xl font-semibold tracking-tight text-foreground">
              {personal.name}
            </p>
            <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted">
              {personal.title} · WordPress · Shopify · Next.js
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <p className="text-sm leading-relaxed text-muted">
          {personal.location} · Freelancing · Full-stack websites, stores and
          performance work for clients worldwide.
        </p>

        <div
          ref={hostRef}
          className={cn(
            "linkedin-badge-host mt-4 min-h-[1px]",
            badgeReady ? "block" : "sr-only",
          )}
          aria-hidden={!badgeReady}
        >
          <Script
            src="https://platform.linkedin.com/badges/js/profile.js"
            strategy="lazyOnload"
            onLoad={() => {
              const win = window as Window & {
                IN?: { parse?: (node?: HTMLElement) => void };
              };
              win.IN?.parse?.(hostRef.current ?? undefined);
              window.setTimeout(() => {
                if (hostRef.current?.querySelector("iframe")) {
                  setBadgeReady(true);
                }
              }, 400);
            }}
          />
          <div
            className="badge-base LI-profile-badge"
            data-locale="en_US"
            data-size="large"
            data-theme="light"
            data-type="HORIZONTAL"
            data-vanity={personal.linkedinVanity}
            data-version="v1"
          >
            <a
              className="badge-base__link LI-simple-link"
              href={`${personal.linkedin}?trk=profile-badge`}
            >
              {personal.name}
            </a>
          </div>
        </div>

        <a
          href={`${personal.linkedin}?trk=profile-badge`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("linkedin_click", { location: "linkedin_card" })
          }
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a66c2] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004182]"
        >
          View LinkedIn profile
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
