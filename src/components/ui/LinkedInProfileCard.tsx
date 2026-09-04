"use client";

import Image from "next/image";
import { Clock3, ExternalLink, LayoutTemplate, MonitorPlay, Sparkles } from "lucide-react";
import { personal } from "@/data/personal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { openLeadModal } from "@/components/ui/LeadModal";

const OFFERS = [
  {
    icon: Clock3,
    title: "Free estimate",
    blurb: "Clear scope & timeline",
  },
  {
    icon: LayoutTemplate,
    title: "Sample design",
    blurb: "See direction first",
  },
  {
    icon: MonitorPlay,
    title: "Demo path",
    blurb: "Preview before build",
  },
] as const;

/**
 * Always-visible LinkedIn profile card (light theme).
 * Uniform radius on all corners via overflow clip — no mismatched header radius.
 */
export function LinkedInProfileCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_18px_50px_rgba(12,18,16,0.08)]",
        className,
      )}
    >
      <div className="relative bg-[linear-gradient(135deg,#0a66c2_0%,#004182_100%)] px-4 pb-11 pt-4 sm:px-5 sm:pb-12 sm:pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
          LinkedIn
        </p>
        <p className="mt-1 font-display text-base font-semibold text-white sm:text-lg">
          Professional profile
        </p>
      </div>

      <div className="relative -mt-10 px-4 sm:-mt-11 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
          <Image
            src={personal.profileImage}
            alt={`${personal.name} profile photo`}
            width={88}
            height={88}
            sizes="88px"
            quality={70}
            className="size-[76px] shrink-0 rounded-full border-4 border-white object-cover object-[50%_18%] shadow-md sm:size-[88px]"
            loading="lazy"
          />
          <div className="min-w-0 pb-0.5 pt-1 sm:pt-8">
            <p className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {personal.name}
            </p>
            <p className="mt-1 text-sm leading-snug text-muted">
              {personal.title} · WordPress · Shopify · Next.js
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4 pt-3 sm:gap-5 sm:px-5 sm:pb-5 sm:pt-4">
        <p className="text-sm leading-relaxed text-muted">
          {personal.location} · Available for freelance · WordPress, Shopify and
          full-stack websites for clients worldwide.
        </p>

        <div className="rounded-xl border border-[#0a66c2]/15 bg-[linear-gradient(180deg,#f3f8fc_0%,#ffffff_100%)] p-3 sm:p-3.5">
          <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#0a66c2]">
            <Sparkles className="size-3" aria-hidden />
            Why connect
          </p>
          <ul className="mt-2.5 grid gap-2 sm:grid-cols-3 sm:gap-2">
            {OFFERS.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-2 rounded-lg border border-border/80 bg-white px-2.5 py-2"
              >
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-[#0a66c2]/10 text-[#0a66c2]">
                  <item.icon className="size-3" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted">
                    {item.blurb}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              trackEvent("linkedin_click", { location: "linkedin_card_offer" });
              openLeadModal("linkedin_card");
            }}
            className="mt-3 w-full rounded-lg border border-[#0a66c2]/20 bg-white px-3 py-2 text-xs font-semibold text-[#0a66c2] transition hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white sm:text-sm"
          >
            Claim free estimate in 2 minutes
          </button>
        </div>

        <a
          href={`${personal.linkedin}?trk=profile-badge`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("linkedin_click", { location: "linkedin_card" })
          }
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a66c2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#004182]"
        >
          View LinkedIn profile
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
