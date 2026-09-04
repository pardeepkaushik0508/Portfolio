import type { NavItem, WhyHireItem } from "@/types";
import { whatsappUrl } from "@/lib/utils";

export const RESUME_HREF = "/resume/pardeep-kaushik-full-stack.pdf";

export const personal = {
  name: "Pardeep Kaushik",
  firstName: "Pardeep Kaushik",
  title: "Full Stack, WordPress & Shopify Developer",
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
    "Pardeep Kaushik — Full Stack, WordPress & Shopify Developer",
  supportingCopy:
    "I specialize in WordPress, Elementor, WooCommerce, Shopify 2.0, Liquid, React, Next.js, website speed optimization, migrations and API integrations—for clients worldwide.",
  aboutIntro:
    "Pardeep Kaushik is a Full Stack, WordPress and Shopify Developer based in Chandigarh, India. I help businesses create websites and web apps with clear communication and end-to-end ownership—WordPress website development, Shopify website development, ecommerce builds, redesigns and Core Web Vitals work.",
  aboutPoints: [
    "5+ years building business websites, ecommerce websites and full-stack web apps",
    "WordPress developer for Elementor website design, WooCommerce and custom WordPress builds",
    "Shopify expert for store setup, Shopify speed optimization and theme customization",
    "Website speed optimization, WordPress speed optimization and Shopify speed fixes",
    "Next.js / React / Node.js for SaaS-style products and custom software delivery",
    "Based in Chandigarh, India — available for clients worldwide",
  ],
  portfolioNote:
    "Selected WordPress, Shopify, WooCommerce and full-stack website development work. Responsibilities varied by engagement.",
  trustItems: [
    "5+ Years Experience",
    "WordPress · Shopify · WooCommerce",
    "Next.js · React · Node.js",
    "Speed Optimization",
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
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
    "Pardeep Kaushik | Full Stack, WordPress & Shopify Developer",
  description:
    "Full Stack, WordPress and Shopify developer specializing in Elementor, WooCommerce, Shopify Liquid, custom development, website speed optimization, migrations and API integrations.",
  keywords: [
    "Pardeep Kaushik",
    "Full Stack Developer",
    "WordPress Developer",
    "Shopify Developer",
    "Elementor Developer",
    "WooCommerce Developer",
    "Shopify Liquid Developer",
    "Website Speed Optimization",
    "WordPress Migration",
    "API Integration",
    "create website",
    "website development",
    "wordpress website development",
    "wordpress website design",
    "build wordpress website",
    "wordpress website redesign",
    "website redesign",
    "ecommerce website",
    "elementor website design",
    "business website",
    "shopify website design",
    "shopify store design",
    "shopify website development",
    "shopify expert",
    "woocommerce website",
    "shopify speed optimization",
    "wordpress speed optimization",
    "website speed optimization",
    "next js developer",
    "front end developer",
    "Full Stack Developer Chandigarh",
    "WordPress Developer Chandigarh",
    "Shopify Developer Chandigarh",
  ],
  ogTitle:
    "Pardeep Kaushik — Full Stack, WordPress & Shopify Developer",
  ogDescription:
    "WordPress, Elementor, WooCommerce, Shopify Liquid, React, Next.js, speed optimization, migrations and API integrations for businesses worldwide.",
  entityStatement:
    "Pardeep Kaushik is a Full Stack, WordPress and Shopify Developer specializing in WordPress, Elementor, WooCommerce, Shopify 2.0, Liquid, custom web development, React, Next.js, website performance optimization, migrations and API integrations.",
};
