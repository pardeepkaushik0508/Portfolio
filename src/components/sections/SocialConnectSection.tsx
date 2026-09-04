"use client";

import {
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { personal } from "@/data/personal";
import { LinkedInProfileCard } from "@/components/ui/LinkedInProfileCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type SocialConnectSectionProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

const channels = [
  {
    id: "call",
    label: "Call",
    detail: personal.phone,
    href: `tel:+${personal.phoneRaw}`,
    icon: Phone,
    event: "book_call_click" as const,
    tone: "primary",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: "Quick project chat",
    href: personal.whatsapp,
    icon: MessageCircle,
    event: "whatsapp_click" as const,
    tone: "success",
  },
  {
    id: "email",
    label: "Email",
    detail: personal.email,
    href: `mailto:${personal.email}`,
    icon: Mail,
    event: "email_click" as const,
    tone: "neutral",
  },
];

export function SocialConnectSection({
  className,
  eyebrow = "Connect",
  title = "Prefer a direct conversation?",
  description = "Call, WhatsApp, email, or open my LinkedIn / Upwork profile — whichever is easiest for you.",
}: SocialConnectSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-border bg-[linear-gradient(165deg,#f7faf9_0%,#eef4f2_45%,#f8f5ef_100%)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 0%, rgba(15,118,110,0.12), transparent), radial-gradient(ellipse 40% 35% at 100% 100%, rgba(196,120,42,0.1), transparent)",
        }}
      />

      <div className="container-shell relative section-shell">
        <Reveal variant="fade-up">
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-heading mt-4">{title}</h2>
            <p className="section-lead">{description}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <Reveal variant="slide-left" className="min-w-0">
            <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-white/90 shadow-[0_24px_60px_rgba(12,18,16,0.08)] backdrop-blur-sm">
              <div className="border-b border-border bg-dark px-6 py-6 text-white sm:px-8 sm:py-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
                  Direct contact
                </p>
                <a
                  href={`tel:+${personal.phoneRaw}`}
                  onClick={() =>
                    trackEvent("book_call_click", { location: "social_hero" })
                  }
                  className="mt-3 inline-block font-display text-[clamp(1.75rem,4vw,2.35rem)] font-bold tracking-tight transition hover:text-accent"
                >
                  {personal.phone}
                </a>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
                  {personal.location} · {personal.availability}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    href={`tel:+${personal.phoneRaw}`}
                    magnetic
                    onClick={() =>
                      trackEvent("book_call_click", { location: "cta_primary" })
                    }
                    icon={<Phone className="size-4" aria-hidden />}
                  >
                    Call Now
                  </Button>
                  <Button
                    href={personal.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    magnetic
                    onClick={() =>
                      trackEvent("whatsapp_click", { location: "cta_primary" })
                    }
                    icon={<MessageCircle className="size-4" aria-hidden />}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
                {channels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target={item.id === "whatsapp" ? "_blank" : undefined}
                      rel={
                        item.id === "whatsapp"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      onClick={() =>
                        trackEvent(item.event, { location: "channel_tile" })
                      }
                      className="group flex flex-col rounded-xl border border-border bg-background/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-sm)]"
                    >
                      <span
                        className={cn(
                          "inline-flex size-10 items-center justify-center rounded-lg",
                          item.tone === "primary" && "bg-primary/10 text-primary",
                          item.tone === "success" && "bg-success/10 text-success",
                          item.tone === "neutral" && "bg-dark/5 text-foreground",
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="mt-4 flex items-center justify-between gap-2">
                        <span className="font-display text-base font-semibold tracking-tight">
                          {item.label}
                        </span>
                        <ArrowUpRight className="size-4 text-muted transition group-hover:text-primary" />
                      </span>
                      <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                        {item.detail}
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-border px-5 py-5 sm:px-6">
                <a
                  href={personal.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("upwork_click", { location: "social_footer" })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  Upwork profile
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("linkedin_click", { location: "social_footer" })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-[#0a66c2]/25 bg-[#0a66c2]/8 px-4 py-2 text-sm font-medium text-[#0a66c2] transition hover:bg-[#0a66c2] hover:text-white"
                >
                  LinkedIn
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-sm text-muted underline-offset-2 transition hover:text-primary hover:underline"
                >
                  {personal.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal variant="slide-right" className="min-w-0">
            <LinkedInProfileCard className="h-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
