import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CouponBanner } from "@/components/pricing/CouponBanner";
import { PricingPackagesSection } from "@/components/pricing/PricingPackagesSection";
import { PricingCustomRequest } from "@/components/pricing/PricingCustomRequest";
import { PricingFaqSection } from "@/components/pricing/PricingFaqSection";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { pricingFaqs } from "@/data/pricing";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdScript,
  personJsonLd,
  webPageJsonLd,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Web Development Pricing India | WordPress, Shopify & Full Stack",
  description: `Affordable WordPress, Shopify and full stack packages from ${personal.name} — clear starting prices, timelines and custom quotes for projects in India and worldwide.`,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `Pricing — ${personal.name}`,
    description:
      "WordPress, Shopify and Full Stack MVP packages with starting prices, compare tables and custom quote options.",
    url: absoluteUrl("/pricing"),
    type: "website",
  },
};

export default function PricingPage() {
  const schemas = [
    personJsonLd(),
    webPageJsonLd({
      path: "/pricing",
      name: "Web Development Pricing India",
      description: `Affordable WordPress, Shopify and full stack packages from ${personal.name}.`,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ]),
    faqPageJsonLd([...pricingFaqs]),
  ];

  return (
    <main id="main">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(schema)}
        />
      ))}

      <PageHero
        eyebrow="Pricing"
        title="Affordable web development packages in India"
        description={`${personal.name} — WordPress, Shopify and Full Stack MVP plans with clear starting prices. Prefer a custom scope? Request a quote below.`}
      />

      <section className="section-shell-tight border-b border-border bg-white">
        <div className="container-shell flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/wordpress-developer-india" className="text-primary hover:underline">
            WordPress developer in India
          </Link>
          <Link href="/shopify-developer-india" className="text-primary hover:underline">
            Shopify developer in India
          </Link>
          <Link href="/full-stack-developer-india" className="text-primary hover:underline">
            Full stack developer in India
          </Link>
          <Link href="/services" className="text-primary hover:underline">
            All services
          </Link>
        </div>
      </section>

      <CouponBanner />

      <div id="packages">
        <PricingPackagesSection />
      </div>
      <PricingCustomRequest />
      <PricingFaqSection />

      <section className="section-shell-tight">
        <div className="container-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl tracking-tight">
              Ready to start?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Share your brief for a practical next step — package or custom.
            </p>
          </div>
          <Button href="/contact" magnetic>
            Discuss Your Project
          </Button>
        </div>
      </section>
    </main>
  );
}
