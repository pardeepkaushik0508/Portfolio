import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
            Open a dedicated page for each focus area—capabilities, process,
            FAQs and related projects.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {landings.map((landing, index) =>
              landing ? (
                <li key={landing.slug}>
                  <Link
                    href={`/${landing.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-border bg-white p-5 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_40px_rgba(12,18,16,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition duration-300 group-hover:scale-x-100"
                      aria-hidden
                    />
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary">
                        {String(index + 1).padStart(2, "0")} · Service page
                      </span>
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary transition duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-12">
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </div>
                    <span className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground transition group-hover:text-primary">
                      {landing.title}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                      {landing.metaDescription}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      View service page
                      <ArrowUpRight
                        className="size-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
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
