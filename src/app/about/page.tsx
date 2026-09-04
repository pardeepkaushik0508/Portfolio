import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SocialConnectSection } from "@/components/sections/SocialConnectSection";
import { personal } from "@/data/personal";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About | Full Stack Developer in Chandigarh",
  description: `${personal.aboutIntro} Connect on LinkedIn or Upwork.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${personal.name}`,
    description: personal.aboutIntro,
    url: absoluteUrl("/about"),
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="WordPress, Shopify and full-stack developer in Chandigarh."
        description={personal.aboutIntro}
      />
      <AboutSection showHeading={false} />
      <SkillsSection />
      <TestimonialsSection />
      <SocialConnectSection
        eyebrow="Profiles"
        title="Find me on LinkedIn, Upwork — or call."
        description="Message on LinkedIn, hire via Upwork, or reach me by phone and WhatsApp for a faster conversation."
      />
    </main>
  );
}
