import type { NavItem, WhyHireItem } from "@/types";
import { whatsappUrl } from "@/lib/utils";

export const RESUME_HREF = "/resume/pardeep-kaushik-full-stack.pdf";

export const personal = {
  name: "Pardeep Kaushik",
  firstName: "Pardeep Kaushik",
  title: "Full Stack Developer | WordPress & Shopify Developer",
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
  headline:
    "Pardeep Kaushik — Full Stack Developer in India",
  supportingCopy:
    "Freelance full stack developer in India with 5+ years of experience building WordPress, Elementor, WooCommerce, Shopify Liquid, React, Next.js and Node.js websites—plus speed optimization, migrations and API integrations for clients across India and worldwide.",
  aboutIntro:
    "Pardeep Kaushik is a Full Stack Developer in India based in Chandigarh, with 5+ years of experience across WordPress, Shopify and custom web applications. I help businesses hire one accountable developer for clear communication and end-to-end delivery—from marketing sites and ecommerce stores to React/Next.js products, deployments and Core Web Vitals work.",
  aboutPoints: [
    "5+ years as a full stack / web developer building business sites, ecommerce and web apps",
    "WordPress developer for Elementor website design, WooCommerce and custom WordPress builds",
    "Shopify developer for store setup, Liquid sections, redesigns and Shopify speed work",
    "React, Next.js and Node.js for SaaS-style products, dashboards and API-backed apps",
    "Website speed optimization, WordPress migration and production VPS deployment",
    "Based in Chandigarh, India — available for freelance clients across India and worldwide",
  ],
  portfolioNote:
    "Selected WordPress, Shopify, WooCommerce and full-stack website development work. Responsibilities varied by engagement.",
  trustItems: [
    "5+ Years Experience",
    "Full Stack · India",
    "WordPress · Shopify",
    "Next.js · React · Node.js",
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Process", href: "/process" },
  { label: "Reviews", href: "/reviews" },
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
    "Pardeep Kaushik | Full Stack Developer in India | WordPress & Shopify Expert",
  description:
    "Hire Pardeep Kaushik — full stack developer in India with 5+ years of experience in WordPress, Shopify, React, Next.js, Node.js, custom web development, speed optimization and API integrations.",
  keywords: [
    "Pardeep Kaushik",
    "Full Stack Developer in India",
    "Full Stack Developer India",
    "Freelance Full Stack Developer India",
    "Hire Full Stack Developer India",
    "WordPress Developer India",
    "Shopify Developer India",
    "Website Developer India",
    "Full Stack Developer",
    "WordPress Developer",
    "Shopify Developer",
    "Elementor Developer",
    "WooCommerce Developer",
    "Shopify Liquid Developer",
    "React Developer India",
    "Next.js Developer India",
    "Node.js Developer India",
    "Website Speed Optimization",
    "WordPress Migration",
    "API Integration",
    "Ecommerce Developer India",
    "Full Stack Developer Chandigarh",
    "WordPress Developer Chandigarh",
    "Shopify Developer Chandigarh",
  ],
  ogTitle:
    "Pardeep Kaushik — Full Stack Developer in India",
  ogDescription:
    "Freelance full stack developer in India specializing in WordPress, Shopify, React, Next.js, Node.js, migrations and website speed optimization.",
  entityStatement:
    "Pardeep Kaushik is a Full Stack Developer in India with 5+ years of experience across WordPress, Elementor, WooCommerce, Shopify Liquid, React, Next.js, Node.js, custom web development, website performance optimization, migrations and API integrations.",
};
