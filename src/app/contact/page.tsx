import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SocialConnectSection } from "@/components/sections/SocialConnectSection";
import { personal } from "@/data/personal";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact | Start a Website or Development Project",
  description: `Contact ${personal.name} for WordPress, Shopify, full-stack development or speed optimization. Call ${personal.phone}, WhatsApp, email, LinkedIn or Upwork.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${personal.name}`,
    description: "Share project details and get a practical next-step plan.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Contact"
        title="Tell me about your project."
        description="Share goals, timeline and stack preferences — or call / WhatsApp if you prefer a faster conversation."
      />
      <ContactSection />
      <TestimonialsSection />
      <SocialConnectSection
        eyebrow="Social & direct"
        title="Prefer social profiles or a quick call?"
        description="Message on LinkedIn, hire via Upwork, email, or reach me on phone / WhatsApp."
      />
    </main>
  );
}
