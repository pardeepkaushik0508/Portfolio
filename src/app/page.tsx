import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyHireSection } from "@/components/sections/WhyHireSection";
import { GlobalTrustSection } from "@/components/sections/GlobalTrustSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { MoreProjectsSection } from "@/components/sections/MoreProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { SocialConnectSection } from "@/components/sections/SocialConnectSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { personal, seo } from "@/data/personal";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import {
  BUSINESS_ID,
  faqPageJsonLd,
  jsonLdScript,
  personJsonLd,
  PERSON_ID,
  websiteJsonLd,
  webPageJsonLd,
} from "@/lib/schema";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: absoluteUrl("/"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.ogDescription,
  },
};

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const featured = projects.filter((p) => p.featured);

  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID(),
    name: `${personal.name} — Full Stack, WordPress & Shopify Development`,
    description: seo.description,
    url: siteUrl,
    image: absoluteUrl(personal.profileImage),
    telephone: personal.phone,
    email: personal.email,
    priceRange: "$$",
    areaServed: [
      { "@type": "Place", name: "Worldwide" },
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "Chandigarh" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressCountry: "IN",
    },
    founder: { "@id": PERSON_ID() },
    provider: { "@id": PERSON_ID() },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web development services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.outcome,
        },
      })),
    },
  };

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured web development projects",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: featured.length,
    itemListElement: featured.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/work/${project.id}`),
      description: project.description,
    })),
  };

  const schemas = [
    personJsonLd(),
    websiteJsonLd(),
    webPageJsonLd({
      path: "/",
      name: seo.title,
      description: seo.description,
    }),
    professionalServiceJsonLd,
    portfolioJsonLd,
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
      <HeroSection />
      <TrustStrip />
      <AboutSection />
      <PillarsSection />
      <ServicesSection />
      <WhyHireSection />
      <GlobalTrustSection />
      <ProcessSection />
      <FeaturedWorkSection />
      <MoreProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <FaqSection />
      <SocialConnectSection
        eyebrow="Next step"
        title="Ready to talk about your project?"
        description="Call or WhatsApp for a quick chat — or use the form below with project details."
      />
      <ContactSection />
    </main>
  );
}
