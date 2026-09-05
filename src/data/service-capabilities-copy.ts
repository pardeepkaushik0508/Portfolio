/**
 * Human-written capabilities section copy per service landing.
 * Avoids templated "Practical {keyword} capabilities…" phrasing.
 */
export const serviceCapabilitiesCopy: Record<
  string,
  { heading: string; description: string }
> = {
  "wordpress-developer": {
    heading: "WordPress Development Services",
    description:
      "WordPress development services for business websites, Elementor builds, WooCommerce stores, redesigns and ongoing improvements.",
  },
  "wordpress-website-design": {
    heading: "WordPress Website Design Services",
    description:
      "Clear information architecture, Elementor layouts and mobile-first page design so visitors understand your offer and editors can update content safely.",
  },
  "elementor-developer": {
    heading: "Elementor Development Services",
    description:
      "Elementor builds with reusable sections, consistent spacing and editor-friendly templates—without locking your team out of day-to-day updates.",
  },
  "woocommerce-developer": {
    heading: "WooCommerce Development Services",
    description:
      "WooCommerce store setup and refinements for catalogues, product pages, cart and checkout—focused on usable shopping flows and maintainable WordPress structure.",
  },
  "shopify-developer": {
    heading: "Shopify Development Services",
    description:
      "Shopify development for custom storefronts, Shopify 2.0 themes, Liquid sections, product experiences and performance improvements.",
  },
  "shopify-liquid-developer": {
    heading: "Shopify Liquid Development Services",
    description:
      "Custom Liquid sections, blocks and templates when theme settings are not enough—built for Shopify 2.0 editing and brand-specific merchandising.",
  },
  "full-stack-developer": {
    heading: "Full Stack Development Services",
    description:
      "End-to-end development covering frontend applications, backend APIs, databases, integrations and production deployment.",
  },
  "website-speed-optimization": {
    heading: "Website Speed Optimization Services",
    description:
      "Performance work for WordPress and Shopify—Core Web Vitals, caching, media and template cleanup—without redesigning your brand.",
  },
  "wordpress-migration": {
    heading: "WordPress Migration Services",
    description:
      "Host-to-host and domain migrations planned for design continuity, URL mapping, media integrity and a clean production cutover.",
  },
  "api-integration": {
    heading: "API Integration Services",
    description:
      "Node.js and third-party API integrations that connect your frontend, admin tools and external systems with clear error handling and staging review.",
  },
  "full-stack-developer-india": {
    heading: "Full Stack Development in India",
    description:
      "Full-stack development for Indian businesses, startups and international teams using React, Next.js, Node.js, APIs and production-ready deployment.",
  },
  "wordpress-developer-india": {
    heading: "WordPress Development in India",
    description:
      "WordPress development services for businesses in India and international teams looking for direct freelance development support.",
  },
  "shopify-developer-india": {
    heading: "Shopify Development in India",
    description:
      "Shopify development services for Indian businesses, ecommerce brands and international clients looking for direct freelance Shopify support.",
  },
  "web-developer-india": {
    heading: "Web Development Services in India",
    description:
      "Freelance web development for Indian businesses and remote clients—WordPress, Shopify or custom full-stack—matched to the brief rather than a single platform pitch.",
  },
  "wordpress-speed-optimization": {
    heading: "What I Optimize on WordPress",
    description:
      "WordPress performance work across Core Web Vitals, caching, images, CSS/JavaScript delivery, plugin weight, database hygiene, theme factors and WooCommerce templates—keeping your visual design intact.",
  },
  "shopify-speed-optimization": {
    heading: "What I Optimize on Shopify",
    description:
      "Shopify storefront performance across theme code, Liquid weight, apps and scripts, product imagery, JavaScript delivery, Core Web Vitals and mobile shopping templates.",
  },
  "shopify-theme-development": {
    heading: "Shopify Theme Development Services",
    description:
      "Custom Shopify 2.0 theme architecture with Liquid sections, product and collection templates, and merchant-editable blocks for brand-led stores.",
  },
  "figma-to-wordpress": {
    heading: "Figma to WordPress Services",
    description:
      "Convert Figma designs into WordPress pages with Elementor or custom templates—responsive, editable and aligned to spacing and typography from the design file.",
  },
  "figma-to-shopify": {
    heading: "Figma to Shopify Services",
    description:
      "Implement Figma storefront designs as Shopify 2.0 Liquid sections and templates—product, collection and landing layouts with merchant-friendly editing.",
  },
  "saas-mvp-development": {
    heading: "SaaS MVP Development Services",
    description:
      "Focused MVP builds with React/Next.js interfaces, Node.js APIs, auth and dashboards—scoped to validate the product without overbuilding.",
  },
  "remote-web-developer": {
    heading: "Remote Web Development Services",
    description:
      "Remote freelance development for international clients—WordPress, Shopify and full-stack delivery with clear milestones, staging and timezone-friendly communication.",
  },
};

export function getCapabilitiesCopy(slug: string, fallbackTitle: string) {
  return (
    serviceCapabilitiesCopy[slug] ?? {
      heading: `${fallbackTitle} Services`,
      description: `${fallbackTitle} work scoped to your brief, delivered with staging review and clear handoff.`,
    }
  );
}
