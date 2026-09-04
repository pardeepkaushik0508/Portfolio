import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experience | Professional Background & Roles",
  description: `Explore ${personal.name}'s professional experience building WordPress, Shopify and full-stack products for clients worldwide.`,
  alternates: { canonical: "/experience" },
  openGraph: {
    title: `Experience — ${personal.name}`,
    description: "Roles, responsibilities and technologies across client projects.",
    url: absoluteUrl("/experience"),
    type: "website",
  },
};

export default function ExperiencePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Experience"
        title="Professional work across CMS, eCommerce and full-stack apps."
        description="Hands-on delivery from discovery through launch—WordPress, Shopify, React/Next.js and performance-focused work."
      />
      <ExperienceSection showHeading={false} />
      <TestimonialsSection />
      <section className="section-shell-tight border-t border-border">
        <div className="container-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-muted">
            Want a similar engagement for your product or business site?
          </p>
          <Button href="/contact" magnetic>
            Discuss a Project
          </Button>
        </div>
      </section>
    </main>
  );
}
