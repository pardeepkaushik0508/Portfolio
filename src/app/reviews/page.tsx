import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reviews | Client Testimonials from Upwork & LinkedIn",
  description: `Read verified client reviews for ${personal.name} — including jewellery website delivery, WordPress builds and website development feedback.`,
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: `Reviews — ${personal.name}`,
    description: "Client endorsements from Upwork and LinkedIn.",
    url: absoluteUrl("/reviews"),
    type: "website",
  },
};

export default function ReviewsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Reviews"
        title="What clients say about the work."
        description="Verified feedback from Upwork and LinkedIn — including Anitha Venkat’s jewellery website project and WordPress deliveries."
      />
      <TestimonialsSection showHeading={false} />
      <section className="section-shell-tight border-t border-border bg-surface">
        <div className="container-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl tracking-tight sm:text-2xl">
              Hire on Upwork or start here
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              See the full work history on Upwork, or send project details
              directly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              href={personal.upwork}
              target="_blank"
              rel="noopener noreferrer"
            >
              Upwork Profile
            </Button>
            <Button href="/contact" variant="dark" magnetic>
              Start a Project
            </Button>
          </div>
        </div>
      </section>
      <FaqSection />
    </main>
  );
}
