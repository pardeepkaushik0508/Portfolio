import type { NavItem, WhyHireItem } from "@/types";
import { whatsappUrl } from "@/lib/utils";

export const RESUME_HREF = "/resume/pardeep-kaushik-full-stack.pdf";

export const personal = {
  name: "Pardeep Kaushik",
  firstName: "Pardeep Kaushik",
  title: "Full Stack, WordPress & Shopify Developer",
  brandLine: "Based in India · Working Worldwide",
  location: "Chandigarh, India",
  email: "pardeepkaushik0508@gmail.com",
  phone: "+91 9671830977",
  phoneRaw: "919671830977",
  whatsapp: whatsappUrl(
    "Hello Pardeep, I visited your portfolio and would like to discuss a website or development project.",
  ),
  linkedin: "https://www.linkedin.com/in/pardeep-kaushik-29206722a",
  linkedinVanity: "pardeep-kaushik-29206722a",
  upwork: "https://www.upwork.com/freelancers/pardeepwebdev",
  github: "https://github.com/pardeepkaushik0508",
  profileImage: "/images/pardeep-kaushik.webp",
  /** Hero / banner portrait */
  heroImage: "/images/pardeep-kaushik-banner.webp",
  resume: RESUME_HREF,
  availability: "Available for freelance and long-term projects",
  experienceYears: "5+",
  headline: "Full Stack, WordPress & Shopify Developer",
  supportingCopy:
    "Freelance web developer with 5+ years of experience building WordPress websites, Shopify stores and custom React, Next.js and Node.js applications for businesses worldwide.",
  aboutIntro:
    "Pardeep Kaushik is a freelance Full Stack, WordPress and Shopify developer with 5+ years of experience building business websites, ecommerce stores and custom web applications. Based in India and available for remote projects worldwide—from marketing sites and Shopify stores to React/Next.js products, deployments and Core Web Vitals work.",
  aboutPoints: [
    "5+ years building business sites, ecommerce stores and custom web apps",
    "WordPress developer for Elementor website design, WooCommerce and custom WordPress builds",
    "Shopify developer for store setup, Liquid sections, redesigns and Shopify speed work",
    "React, Next.js and Node.js for SaaS-style products, dashboards and API-backed apps",
    "Website speed optimization, WordPress migration and production VPS deployment",
    "Based in India — available for freelance clients worldwide",
  ],
  heroServices: [
    "WordPress",
    "Shopify",
    "WooCommerce",
    "Elementor",
    "React",
    "Next.js",
    "Node.js",
    "APIs",
    "Full Stack Development",
  ] as const,
  portfolioNote:
    "Selected WordPress, Shopify, WooCommerce and full-stack website development work. Responsibilities varied by engagement.",
  trustItems: [
    "5+ Years Experience",
    "Based in India · Worldwide",
    "WordPress · Shopify",
    "Next.js · React · Node.js",
  ],
  expertBio:
    "Pardeep Kaushik is a freelance Full Stack, WordPress and Shopify developer with 5+ years of experience building business websites, ecommerce stores and custom web applications. His work includes WordPress, WooCommerce, Elementor, Shopify, Liquid, React, Next.js, Node.js, APIs and production deployment.",
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const whyHire: WhyHireItem[] = [
  {
    id: "direct",
    title: "Direct communication",
    description:
      "You work with the developer building the project—no handoff gaps or diluted requirements.",
  },
  {
    id: "ownership",
    title: "End-to-end ownership",
    description:
      "From scope and architecture through development, deployment and handoff, one person stays accountable.",
  },
  {
    id: "code",
    title: "Clean, maintainable code",
    description:
      "Structured codebases that are easier to extend, hand over and keep reliable after launch.",
  },
  {
    id: "responsive",
    title: "Responsive implementation",
    description:
      "Layouts and interactions checked across phone, tablet and desktop before release.",
  },
  {
    id: "staging",
    title: "Staging before production",
    description:
      "Review and test on a staging environment so changes are verified before going live.",
  },
  {
    id: "support",
    title: "Post-launch support",
    description:
      "Help with fixes, updates and practical improvements after the site is live.",
  },
  {
    id: "stack",
    title: "Frontend, backend and hosting",
    description:
      "Experience across UI, APIs, databases and VPS deployment keeps delivery connected.",
  },
];

export const seo = {
  title:
    "Full Stack Developer | WordPress & Shopify Expert | Pardeep Kaushik",
  description:
    "Freelance Full Stack, WordPress and Shopify developer building fast websites, ecommerce stores and custom web applications for businesses worldwide.",
  keywords: [
    "Pardeep Kaushik",
    "Full Stack Developer",
    "Freelance Full Stack Developer",
    "Full Stack Web Developer",
    "Remote Full Stack Developer",
    "WordPress Developer",
    "Freelance WordPress Developer",
    "Shopify Developer",
    "Freelance Shopify Developer",
    "Web Developer",
    "Remote Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Ecommerce Developer",
    "Elementor Developer",
    "WooCommerce Developer",
    "Shopify Liquid Developer",
    "Website Speed Optimization",
    "WordPress Migration",
    "API Integration",
  ],
  ogTitle: "Pardeep Kaushik — Full Stack, WordPress & Shopify Developer",
  ogDescription:
    "Freelance Full Stack, WordPress and Shopify developer building fast websites, ecommerce stores and custom web applications for businesses worldwide.",
  entityStatement:
    "Pardeep Kaushik is a Full Stack, WordPress and Shopify developer with 5+ years of experience across WordPress, Elementor, WooCommerce, Shopify Liquid, React, Next.js, Node.js, custom web development, website performance optimization, migrations and API integrations. Based in India and available for projects worldwide.",
};
