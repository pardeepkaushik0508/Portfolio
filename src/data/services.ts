import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "full-stack",
    title: "Full-Stack Development",
    outcome:
      "Production-ready web applications with frontend, backend, APIs, databases and deployment.",
    capabilities: [
      "React and Next.js",
      "Node.js and APIs",
      "PostgreSQL, MongoDB and MySQL",
      "VPS deployment",
    ],
    relevantProject: "UtilityTools",
    relevantProjectHref: "#case-utilitytools",
  },
  {
    id: "wordpress",
    title: "WordPress & WooCommerce",
    outcome:
      "Responsive business and eCommerce websites that are easy to manage.",
    capabilities: [
      "Custom WordPress development",
      "Elementor and ACF",
      "WooCommerce",
      "Performance optimization",
    ],
    relevantProject: "Resource Portal Shop",
    relevantProjectHref: "#more-projects",
  },
  {
    id: "shopify",
    title: "Shopify Development",
    outcome:
      "Fast, responsive Shopify storefronts with customized product functionality.",
    capabilities: [
      "Theme customization",
      "Liquid",
      "Product and collection pages",
      "Custom sections and variants",
    ],
    relevantProject: "Boldify",
    relevantProjectHref: "#more-projects",
  },
  {
    id: "redesign",
    title: "Website Redesign & Optimization",
    outcome:
      "Modernized interfaces with improved responsiveness, speed, SEO and conversion flow.",
    capabilities: [
      "UI redesign",
      "Mobile responsiveness",
      "Core Web Vitals",
      "Technical SEO",
    ],
    relevantProject: "Selected client sites",
    relevantProjectHref: "#work",
  },
];
