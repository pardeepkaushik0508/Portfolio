import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { personal } from "@/data/personal";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact | Free Estimate, Sample Design & Demo",
  description: `Contact ${personal.name} for a free project estimate, sample design direction or demo path. WordPress, Shopify, full-stack and speed optimization. Call ${personal.phone}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${personal.name}`,
    description:
      "Get a free estimate, sample design direction and demo path for your website or web app.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Contact"
        title="Free estimate. Sample design. Demo path."
        description="Share your requirement — name, email, phone and what you need. I’ll reply with a practical next step."
      />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
