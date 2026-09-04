import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyHireSection } from "@/components/sections/WhyHireSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { getAllServiceSlugs, getServiceLanding } from "@/data/service-landings";
import { faqs } from "@/data/faqs";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdScript,
  personJsonLd,
  webPageJsonLd,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services | WordPress, Shopify, Full Stack & Speed Optimization",
  description: `Hire ${personal.name} for WordPress, Elementor, WooCommerce, Shopify Liquid, full-stack apps, website redesign, migrations and Core Web Vitals optimization.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services — ${personal.name}`,
    description:
      "WordPress, Shopify, Elementor, WooCommerce, full-stack apps, redesign, migration and speed optimization.",
    url: absoluteUrl("/services"),
    type: "website",
  },
};

export default function ServicesPage() {
  const landings = getAllServiceSlugs()
    .map((slug) => getServiceLanding(slug))
    .filter(Boolean);

  const schemas = [
    personJsonLd(),
    webPageJsonLd({
      path: "/services",
      name: "Web Development Services",
      description:
        "WordPress, Shopify, full-stack development, speed optimization, migrations and API integrations.",
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    faqPageJsonLd(faqs),
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
        eyebrow="Services"
        title="WordPress, Shopify, web apps and speed optimization."
        description={`${personal.name} helps businesses create websites and stores with WordPress, Elementor, WooCommerce, Shopify Liquid, React/Next.js, migrations and API integrations.`}
      />

      <section className="section-shell-tight border-b border-border bg-surface">
        <div className="container-shell">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Service pages
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            Detailed pages for each focus area—capabilities, process, FAQs and
            related projects.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {landings.map((landing) =>
              landing ? (
                <li key={landing.slug}>
                  <Link
                    href={`/${landing.slug}`}
                    className="block rounded-lg border border-border bg-white px-4 py-3 transition hover:border-primary/35"
                  >
                    <span className="font-medium text-foreground">
                      {landing.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted line-clamp-2">
                      {landing.metaDescription}
                    </span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </section>

      <PillarsSection />
      <ServicesSection showHeading={false} />
      <WhyHireSection />
      <TestimonialsSection />
      <FaqSection />
      <section className="section-shell-tight border-t border-border">
        <div className="container-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl tracking-tight">
              Need a scoped estimate?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Share goals, stack preferences and timeline—I&apos;ll reply with a
              practical plan.
            </p>
          </div>
          <Button href="/contact" magnetic>
            Start a Project
          </Button>
        </div>
      </section>
    </main>
  );
}
