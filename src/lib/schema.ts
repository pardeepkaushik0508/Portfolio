import { personal, seo } from "@/data/personal";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

export const PERSON_ID = () => `${getSiteUrl()}/#person`;
export const WEBSITE_ID = () => `${getSiteUrl()}/#website`;
export const BUSINESS_ID = () => `${getSiteUrl()}/#business`;

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

/** Canonical Person entity — reuse @id everywhere */
export function personJsonLd(extra: Record<string, unknown> = {}) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID(),
    name: personal.name,
    givenName: "Pardeep",
    familyName: "Kaushik",
    jobTitle: "Full Stack, WordPress & Shopify Developer",
    description: seo.entityStatement,
    email: personal.email,
    telephone: personal.phone,
    url: siteUrl,
    image: absoluteUrl(personal.profileImage),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressRegion: "Chandigarh",
      addressCountry: "IN",
    },
    sameAs: [personal.linkedin, personal.github, personal.upwork],
    knowsAbout: [
      "Full Stack Development",
      "WordPress Development",
      "Elementor",
      "WooCommerce",
      "Shopify Development",
      "Shopify Liquid",
      "React",
      "Next.js",
      "Node.js",
      "Website Speed Optimization",
      "WordPress Migration",
      "API Integration",
      "Website Redesign",
    ],
    worksFor: {
      "@type": "Organization",
      name: `${personal.name} Freelance`,
    },
    ...extra,
  };
}

export function websiteJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID(),
    name: `${personal.name} Portfolio`,
    url: siteUrl,
    description: seo.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID() },
    author: { "@id": PERSON_ID() },
    potentialAction: {
      "@type": "CommunicateAction",
      target: `${siteUrl}/contact`,
      name: "Contact Pardeep Kaushik",
    },
  };
}

export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID() },
    about: { "@id": PERSON_ID() },
    author: { "@id": PERSON_ID() },
    inLanguage: "en",
  };
}

/** About / profile page — Google ProfilePage with mainEntity Person */
export function profilePageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID() },
    about: { "@id": PERSON_ID() },
    mainEntity: { "@id": PERSON_ID() },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(opts: {
  path: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: opts.name,
    description: opts.description,
    url,
    provider: { "@id": PERSON_ID() },
    areaServed: ["IN", "Worldwide"],
    serviceType: opts.name,
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
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
}

export function creativeWorkJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  image?: string;
  url?: string | null;
  technologies?: string[];
}) {
  const pageUrl = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#project`,
    name: opts.name,
    description: opts.description,
    url: opts.url || pageUrl,
    image: opts.image ? absoluteUrl(opts.image) : undefined,
    creator: { "@id": PERSON_ID() },
    author: { "@id": PERSON_ID() },
    keywords: opts.technologies?.join(", "),
  };
}
