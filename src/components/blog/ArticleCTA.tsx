"use client";

import Link from "next/link";
import type { BlogCtaFocus } from "@/lib/blog-types";
import { personal } from "@/data/personal";
import { whatsappUrl } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const COPY: Record<
  BlogCtaFocus | "default",
  { support: string }
> = {
  "full-stack": {
    support:
      "Need a custom application, API layer or full-stack build? Let’s map scope, stack and delivery clearly.",
  },
  wordpress: {
    support:
      "Looking for WordPress or WooCommerce support—build, redesign, speed or maintenance? Share what you need next.",
  },
  shopify: {
    support:
      "Planning Shopify development, theme work or conversion improvements? We can review your store and priorities.",
  },
  hiring: {
    support:
      "Need help planning a project or evaluating development options for your business? Start with a clear consultation.",
  },
  growth: {
    support:
      "Want a technical audit, performance pass or conversion-focused improvements? Let’s review what matters most.",
  },
  default: {
    support:
      "Whether you need a new site, a redesign or ongoing development support, we can discuss the right next step.",
  },
};

const WA_MESSAGE =
  "Hello Pardeep, I read one of your articles and would like to discuss a website or development project.";

export function ArticleCTA({
  focus = "default",
  location = "article",
}: {
  focus?: BlogCtaFocus | "default";
  location?: string;
}) {
  const copy = COPY[focus] ?? COPY.default;
  const wa = whatsappUrl(WA_MESSAGE);

  return (
    <aside className="blog-cta" aria-labelledby="blog-cta-heading">
      <p className="blog-kicker">Next step</p>
      <h2 id="blog-cta-heading" className="blog-cta__title">
        Need help with your website or web application?
      </h2>
      <p className="blog-cta__text">{copy.support}</p>
      <div className="blog-cta__actions">
        <Link
          href="/#contact"
          className="blog-cta__primary"
          onClick={() => trackEvent("blog_cta_click", { location, action: "discuss" })}
        >
          Discuss Your Project
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-cta__secondary"
          onClick={() => {
            trackEvent("blog_cta_click", { location, action: "whatsapp" });
            trackEvent("whatsapp_click", { location: `blog_${location}` });
          }}
        >
          WhatsApp Pardeep
        </a>
        <a
          href={`mailto:${personal.email}`}
          className="blog-cta__secondary"
          onClick={() => {
            trackEvent("blog_cta_click", { location, action: "email" });
            trackEvent("email_click", { location: `blog_${location}` });
          }}
        >
          Send an Email
        </a>
        <Link
          href="/#work"
          className="blog-cta__secondary"
          onClick={() => trackEvent("blog_cta_click", { location, action: "work" })}
        >
          View Selected Work
        </Link>
      </div>
    </aside>
  );
}
