import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { MoreProjectsSection } from "@/components/sections/MoreProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyHireSection } from "@/components/sections/WhyHireSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { personal, seo } from "@/data/personal";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

export default function HomePage() {
  const siteUrl = getSiteUrl();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    email: personal.email,
    telephone: personal.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressCountry: "IN",
    },
    url: siteUrl,
    image: absoluteUrl(personal.profileImage),
    sameAs: [personal.linkedin, personal.github],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${personal.name} — Web Development`,
    description: seo.description,
    url: siteUrl,
    image: absoluteUrl(personal.profileImage),
    telephone: personal.phone,
    email: personal.email,
    areaServed: "Worldwide",
    priceRange: "$$",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personal.name} Portfolio`,
    url: siteUrl,
    description: seo.description,
    publisher: {
      "@type": "Person",
      name: personal.name,
    },
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <TrustStrip />
      <FeaturedWorkSection />
      <MoreProjectsSection />
      <ServicesSection />
      <WhyHireSection />
      <AboutSection />
      <ExperienceSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
