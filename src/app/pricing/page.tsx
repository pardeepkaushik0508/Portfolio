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
  title: "Web Development Pricing | WordPress, Shopify & Full Stack",
  description: `Transparent starting packages for WordPress websites, Shopify stores and full-stack MVPs from ${personal.name}. View INR or USD estimates, or request a custom quote.`,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `Web Development Pricing — ${personal.name}`,
    description:
      "Transparent WordPress, Shopify and Full Stack MVP packages with INR/USD estimates and custom quote options.",
    url: absoluteUrl("/pricing"),
    type: "website",
  },
};

export default function PricingPage() {
  const schemas = [
    personJsonLd(),
    webPageJsonLd({
      path: "/pricing",
      name: "Web Development Pricing for WordPress, Shopify & Full Stack",
      description: `Transparent starting packages for WordPress, Shopify and full-stack MVPs from ${personal.name}.`,
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
        title="Web Development Pricing for WordPress, Shopify & Full Stack"
        description="Transparent starting packages for WordPress websites, Shopify stores and full-stack MVPs. View INR or USD estimates, or request a custom quote for your project."
      />

      <section className="section-shell-tight border-b border-border bg-white">
        <div className="container-shell flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/wordpress-developer" className="text-primary hover:underline">
            WordPress developer
          </Link>
          <Link href="/shopify-developer" className="text-primary hover:underline">
            Shopify developer
          </Link>
          <Link href="/full-stack-developer" className="text-primary hover:underline">
            Full stack developer
          </Link>
          <Link href="/remote-web-developer" className="text-primary hover:underline">
            Remote web developer
          </Link>
          <Link href="/wordpress-developer-india" className="text-primary hover:underline">
            WordPress developer in India
          </Link>
          <Link href="/shopify-developer-india" className="text-primary hover:underline">
            Shopify developer in India
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
