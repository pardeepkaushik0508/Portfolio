"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

type LinkedInBadgeProps = {
  className?: string;
  theme?: "light" | "dark";
  size?: "medium" | "large";
  type?: "HORIZONTAL" | "VERTICAL";
};

/**
 * Official LinkedIn profile badge.
 * Re-inits after script load / client navigation so the badge renders in Next.js.
 */
export function LinkedInBadge({
  className,
  theme = "dark",
  size = "large",
  type = "HORIZONTAL",
}: LinkedInBadgeProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const win = window as Window & {
      IN?: { parse?: (node?: HTMLElement) => void };
    };
    const parse = () => {
      win.IN?.parse?.(hostRef.current ?? undefined);
    };
    parse();
    const t = window.setTimeout(parse, 400);
    return () => window.clearTimeout(t);
  }, [theme, size, type]);

  return (
    <div ref={hostRef} className={cn("linkedin-badge-host", className)}>
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
        onLoad={() => {
          const win = window as Window & {
            IN?: { parse?: (node?: HTMLElement) => void };
          };
          win.IN?.parse?.(hostRef.current ?? undefined);
        }}
      />
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size={size}
        data-theme={theme}
        data-type={type}
        data-vanity={personal.linkedinVanity}
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href={`${personal.linkedin}?trk=profile-badge`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {personal.name}
        </a>
      </div>
    </div>
  );
}
