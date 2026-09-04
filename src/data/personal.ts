import type { NavItem, WhyHireItem } from "@/types";
import { whatsappUrl } from "@/lib/utils";

export const RESUME_HREF = "/resume/pardeep-kaushik-full-stack.pdf";

export const personal = {
  name: "Pardeep Kaushik",
  firstName: "Pardeep Kaushik",
  title: "Full-Stack Developer",
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
  profileImage: "/images/pardeep-kaushik.jpg",
  /** Hero / banner portrait */
  heroImage: "/images/pardeep-kaushik-banner.jpg",
  resume: RESUME_HREF,
  availability: "Available for freelance and long-term projects",
  experienceYears: "5+",
  headline:
    "I build fast WordPress, Shopify and full-stack websites that help businesses grow.",
  supportingCopy:
    "Website development specialist for WordPress website design, Shopify store design, WooCommerce, React, Next.js and Node.js—plus website speed optimization, redesign and long-term support.",
  aboutIntro:
    "I help businesses create websites and web apps with clear communication and end-to-end ownership—WordPress website development, Shopify website development, ecommerce website builds, website redesign and Core Web Vitals / PageSpeed work.",
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
    "Pardeep Kaushik | WordPress & Shopify Website Developer | Full-Stack Chandigarh",
  description:
    "Hire Pardeep Kaushik to create a website, build a WordPress website, design a Shopify store, fix WooCommerce issues, or ship a Next.js web app. Website development, redesign and speed optimization for businesses worldwide.",
  keywords: [
    "create website",
    "website builder",
    "website development",
    "wordpress website development",
    "wordpress website design",
    "build wordpress website",
    "wordpress developer",
    "wordpress website redesign",
    "website redesign",
    "ecommerce website",
    "elementor website design",
    "business website",
    "fix wordpress",
    "woocommerce fix",
    "shopify bugs",
    "software developer",
    "web app",
    "front end developer",
    "next js developer",
    "saas developer",
    "mern stack developer",
    "web app development",
    "shopify website design",
    "shopify store design",
    "shopify store",
    "shopify website development",
    "build shopify store",
    "shopify expert",
    "woocommerce website",
    "shopify speed optimization",
    "wordpress speed optimization",
    "website speed optimization",
    "Pardeep Kaushik",
    "Full Stack Developer Chandigarh",
    "WordPress Developer Chandigarh",
    "Shopify Developer Chandigarh",
  ],
  ogTitle:
    "Pardeep Kaushik — WordPress, Shopify & Full-Stack Website Developer",
  ogDescription:
    "Create a website, build WordPress or Shopify stores, fix WooCommerce issues, and ship Next.js web apps. Speed optimization and redesign included.",
};
