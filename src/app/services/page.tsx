import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyHireSection } from "@/components/sections/WhyHireSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services | WordPress, Shopify, Full-Stack & Speed Optimization",
  description: `Hire ${personal.name} for full-stack development, WordPress, WooCommerce, Shopify, website redesign and Core Web Vitals / PageSpeed optimization.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services — ${personal.name}`,
    description:
      "Full-stack apps, WordPress & WooCommerce, Shopify stores, redesign and speed optimization.",
    url: absoluteUrl("/services"),
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Services"
        title="Focused delivery for websites, stores and web apps."
        description="WordPress, WooCommerce, Shopify, React/Next.js and performance work—with clear outcomes and post-launch support."
      />
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
