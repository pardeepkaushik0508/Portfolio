"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { personal } from "@/data/personal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Always-visible LinkedIn profile card (light theme).
 * Uniform radius on all corners via overflow clip — no mismatched header radius.
 */
export function LinkedInProfileCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_18px_50px_rgba(12,18,16,0.08)]",
        className,
      )}
    >
      <div className="relative bg-[linear-gradient(135deg,#0a66c2_0%,#004182_100%)] px-5 pb-10 pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
          LinkedIn
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-white">
          Professional profile
        </p>
      </div>

      <div className="relative -mt-9 px-5">
        <div className="flex items-end gap-4">
          <Image
            src={personal.profileImage}
            alt={`${personal.name} profile photo`}
            width={88}
            height={88}
            className="size-[88px] rounded-full border-4 border-white object-cover object-[50%_18%] shadow-md"
            priority
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

      <div className="flex flex-1 flex-col gap-5 px-5 pb-5 pt-4">
        <p className="text-sm leading-relaxed text-muted">
          {personal.location} · Freelancing · WordPress website development,
          Shopify store design and full-stack websites for clients worldwide.
        </p>

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
