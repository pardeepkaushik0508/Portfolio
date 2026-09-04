import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Process | How Projects Are Planned and Delivered",
  description: `See how ${personal.name} runs discovery, planning, development, launch and support for websites and web applications.`,
  alternates: { canonical: "/process" },
  openGraph: {
    title: `Process — ${personal.name}`,
    description: "A clear path from research to launch with ongoing support.",
    url: absoluteUrl("/process"),
    type: "website",
  },
};

export default function ProcessPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Process"
        title="A clear path from research to launch."
        description="Discovery, planning, build quality and production readiness stay aligned—so you always know what happens next."
      />
      <ProcessSection showHeading={false} />
      <TestimonialsSection />
      <section className="section-shell-tight border-t border-border">
        <div className="container-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-muted">
            Ready to walk through scope and milestones for your project?
          </p>
          <Button href="/contact" magnetic>
            Start a Project
          </Button>
        </div>
      </section>
    </main>
  );
}
