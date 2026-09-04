import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyHireSection } from "@/components/sections/WhyHireSection";
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
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const featured = projects.filter((p) => p.featured);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: personal.name,
    givenName: "Pardeep",
    familyName: "Kaushik",
    jobTitle: personal.title,
    description: seo.description,
    email: personal.email,
    telephone: personal.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressRegion: "Chandigarh",
      addressCountry: "IN",
    },
    url: siteUrl,
    image: absoluteUrl(personal.profileImage),
    sameAs: [personal.linkedin, personal.github, personal.upwork],
    knowsAbout: [
      "Full Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "WordPress",
      "Shopify",
      "WooCommerce",
      "VPS Deployment",
      "Website Performance Optimization",
    ],
    worksFor: {
      "@type": "Organization",
      name: `${personal.name} Freelance`,
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: `${personal.name} — Full Stack Web Development`,
    description: seo.description,
    url: siteUrl,
    image: absoluteUrl(personal.profileImage),
    telephone: personal.phone,
    email: personal.email,
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Chandigarh" },
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressCountry: "IN",
    },
    founder: { "@id": `${siteUrl}/#person` },
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

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: `${personal.name} Portfolio`,
    url: siteUrl,
    description: seo.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteUrl}/#person` },
    potentialAction: {
      "@type": "CommunicateAction",
      target: `${siteUrl}/#contact`,
      name: "Contact Pardeep Kaushik",
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
      url: project.url ?? `${siteUrl}/#case-${project.id}`,
      description: project.description,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <TrustStrip />
      {/* Jasmine-style flow: who → what I build → services → why → process → proof */}
      <AboutSection />
      <PillarsSection />
      <ServicesSection />
      <WhyHireSection />
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
