export type PricingCategoryId = "wordpress" | "shopify" | "full-stack";

export type PricingPlanId = "starter" | "standard" | "advanced";

export type FeatureCell = string | boolean;

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  badge?: string;
  priceInr: number;
  /** e.g. "From" for open-ended advanced */
  pricePrefix?: string;
  timeline: string;
};

export type PricingFeatureRow = {
  label: string;
  starter: FeatureCell;
  standard: FeatureCell;
  advanced: FeatureCell;
};

export type PricingCategory = {
  id: PricingCategoryId;
  label: string;
  title: string;
  description: string;
  plans: PricingPlan[];
  features: PricingFeatureRow[];
  notIncluded: string[];
};

export const pricingFaqs = [
  {
    question: "Are these fixed final prices?",
    answer:
      "No. Amounts are starting prices for a written scope. Final quote depends on design, features, content readiness and timeline.",
  },
  {
    question: "Why do I see INR or USD?",
    answer:
      "Prices are stored in INR and shown in your local currency when possible (USD outside India). Use the toggle anytime. Figures are approximate until the brief is confirmed.",
  },
  {
    question: "What if none of the packages fit?",
    answer:
      "Request a custom quote. Redesigns, WooCommerce, custom Liquid, APIs, speed-only work and phased MVPs are scoped separately before work starts.",
  },
  {
    question: "When does the timeline start?",
    answer:
      "After content or access is ready, scope is agreed in writing, and kickoff payment terms are confirmed.",
  },
] as const;

export const customRequestCopy = {
  eyebrow: "Custom scope",
  title: "Don’t see a package that fits?",
  description:
    "Fixed plans cover common WordPress, Shopify and MVP builds. If you need a redesign, WooCommerce, custom Liquid, API work, speed-only optimization or a phased full-stack product, request a custom quote — scoped in writing before work starts.",
  trust: "Free estimate · Sample design direction when the brief fits · Clear milestones",
  primaryCta: "Request a custom quote",
  secondaryCta: "Contact Pardeep",
} as const;

export const pricingCategories: PricingCategory[] = [
  {
    id: "wordpress",
    label: "WordPress",
    title: "WordPress packages",
    description:
      "Affordable WordPress website packages in India — Elementor-friendly builds with clear scope and handoff.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        priceInr: 7499,
        timeline: "3–5 days",
      },
      {
        id: "standard",
        name: "Standard",
        badge: "Most popular",
        priceInr: 13999,
        timeline: "5–8 days",
      },
      {
        id: "advanced",
        name: "Advanced",
        priceInr: 24999,
        timeline: "10–14 days",
      },
    ],
    features: [
      { label: "Pages", starter: "Up to 5", standard: "Up to 8", advanced: "Up to 12+" },
      { label: "Design approach", starter: "Template customize", standard: "Polished sections", advanced: "Custom / redesign" },
      { label: "Elementor editable", starter: true, standard: true, advanced: true },
      { label: "Contact + WhatsApp CTA", starter: true, standard: true, advanced: true },
      { label: "Blog setup", starter: false, standard: true, advanced: true },
      { label: "Basic SEO (titles/meta)", starter: true, standard: true, advanced: true },
      { label: "Speed basics", starter: "Light", standard: "Better", advanced: "CWV-focused" },
      { label: "WooCommerce", starter: false, standard: false, advanced: "Scoped" },
      { label: "Migration help", starter: false, standard: "Basic", advanced: "Full (scoped)" },
      { label: "Revisions", starter: "1", standard: "2", advanced: "3" },
      { label: "Post-launch fixes", starter: "7 days", standard: "14 days", advanced: "30 days" },
      { label: "Training / handoff", starter: "Basic", standard: true, advanced: "Yes + notes" },
    ],
    notIncluded: [
      "Domain, hosting and paid plugins",
      "Logo and content writing (unless purchased)",
      "Unlimited revisions",
      "SEO ranking guarantees",
    ],
  },
  {
    id: "shopify",
    label: "Shopify",
    title: "Shopify packages",
    description:
      "Shopify store setup and theme packages — conversion-minded layouts with Liquid work on higher tiers.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        priceInr: 8999,
        timeline: "3–5 days",
      },
      {
        id: "standard",
        name: "Standard",
        badge: "Most popular",
        priceInr: 17499,
        timeline: "7–10 days",
      },
      {
        id: "advanced",
        name: "Advanced",
        priceInr: 37499,
        timeline: "2–3 weeks",
      },
    ],
    features: [
      { label: "Theme setup + branding", starter: true, standard: true, advanced: true },
      { label: "Home / collection / product", starter: "Basic polish", standard: "Strong", advanced: "Custom Liquid" },
      { label: "Products setup help", starter: "Limited", standard: "More", advanced: "Bulk + complex" },
      { label: "Shopify 2.0 sections", starter: "Limited", standard: true, advanced: "Custom" },
      { label: "Apps install (limited)", starter: false, standard: true, advanced: true },
      { label: "Speed cleanup", starter: "Light", standard: true, advanced: "Deep" },
      { label: "Figma → Shopify", starter: false, standard: "Partial", advanced: "Yes (scoped)" },
      { label: "Revisions", starter: "1", standard: "2", advanced: "3" },
      { label: "Support window", starter: "7 days", standard: "14 days", advanced: "30 days" },
      { label: "Training / handoff", starter: "Basic", standard: true, advanced: true },
    ],
    notIncluded: [
      "Shopify monthly plan and paid apps",
      "Domain and premium themes (unless purchased)",
      "Unlimited product photography or copy",
      "SEO ranking guarantees",
    ],
  },
  {
    id: "full-stack",
    label: "Full Stack",
    title: "Full Stack MVP packages",
    description:
      "Tight-scope full stack MVPs — React/Next.js, APIs and deploy when a CMS alone is not enough.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        priceInr: 19999,
        timeline: "7–10 days",
      },
      {
        id: "standard",
        name: "Standard",
        badge: "Most popular",
        priceInr: 39999,
        timeline: "2–3 weeks",
      },
      {
        id: "advanced",
        name: "Advanced",
        priceInr: 79999,
        pricePrefix: "From",
        timeline: "3–5 weeks",
      },
    ],
    features: [
      { label: "Screens / modules", starter: "3–4 screens", standard: "Small MVP", advanced: "Multi-module (phased)" },
      { label: "UI", starter: "Template-based", standard: "Custom UI", advanced: "Custom + complex flows" },
      { label: "Auth", starter: "Simple / optional", standard: "Login + basic roles", advanced: "Multi-role" },
      { label: "Database + API", starter: "Minimal", standard: "Core APIs", advanced: "Advanced + integrations" },
      { label: "Admin dashboard", starter: false, standard: "Basic", advanced: "Full (scoped)" },
      { label: "Third-party APIs", starter: false, standard: "1", advanced: "2+ (scoped)" },
      { label: "Staging + deploy", starter: "Basic", standard: true, advanced: "Yes + envs" },
      { label: "Revisions / UAT", starter: "1", standard: "2", advanced: "Phased milestones" },
      { label: "Best for", starter: "Demo / landing+form", standard: "Real mini product", advanced: "Growing product" },
    ],
    notIncluded: [
      "Unlimited features or open-ended SaaS scope",
      "Native mobile apps",
      "Third-party SaaS subscription fees",
      "Ongoing DevOps retainers (quoted separately)",
    ],
  },
];

export function getPricingCategory(id: PricingCategoryId) {
  return pricingCategories.find((c) => c.id === id) ?? pricingCategories[0];
}

export function planContactHref(
  service: PricingCategoryId,
  plan: PricingPlanId,
) {
  return `/contact?service=${service}&plan=${plan}`;
}
