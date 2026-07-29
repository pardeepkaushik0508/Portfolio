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
  github: "https://github.com/pardeepkaushik0508",
  profileImage: "/images/pardeep-kaushik.png",
  resume: RESUME_HREF,
  availability: "Available for freelance and long-term projects",
  experienceYears: "5+",
  headline:
    "I build fast, scalable websites and web applications that help businesses grow.",
  supportingCopy:
    "Full-Stack Developer specializing in WordPress, Shopify, React, Next.js and Node.js—from planning and development to deployment and long-term support.",
  aboutIntro:
    "I help businesses ship production-ready websites and web applications with clear communication, end-to-end ownership and practical technical decisions.",
  aboutPoints: [
    "5+ years building business websites, eCommerce stores and full-stack applications",
    "Specialized in WordPress, Shopify, WooCommerce, React, Next.js and Node.js",
    "Worked with education platforms, SaaS products, real-estate sites and online stores",
    "Manage projects from planning and development through deployment and support",
    "Based in Chandigarh, India — available for clients worldwide",
  ],
  portfolioNote:
    "Selected development and design work. Responsibilities varied by engagement.",
  trustItems: [
    "5+ Years Experience",
    "Full-Stack Delivery",
    "WordPress · Shopify · React · Node.js",
    "Available Worldwide",
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
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
    "Pardeep Kaushik | Full Stack Developer Chandigarh | WordPress, Shopify & Next.js",
  description:
    "Hire Pardeep Kaushik — freelance full stack developer in Chandigarh, India. Expert in React, Next.js, Node.js, WordPress, Shopify, WooCommerce, website redesign, performance optimization and VPS deployment for businesses worldwide.",
  keywords: [
    "Pardeep Kaushik",
    "Pardeep Kaushik developer",
    "Full Stack Developer Chandigarh",
    "Full Stack Developer India",
    "Freelance Full Stack Developer",
    "Hire Full Stack Developer",
    "WordPress Developer Chandigarh",
    "WordPress Developer India",
    "Freelance WordPress Developer",
    "Shopify Developer Chandigarh",
    "Shopify Developer India",
    "Freelance Shopify Developer",
    "WooCommerce Developer",
    "Next.js Developer Chandigarh",
    "React Developer Chandigarh",
    "Node.js Developer India",
    "Website Developer Chandigarh",
    "Web Application Developer",
    "eCommerce Website Developer",
    "Website Redesign Services",
    "Website Performance Optimization",
    "VPS Deployment Specialist",
    "Custom Web Development",
    "React Next.js Node.js Developer",
    "Hire WordPress Developer India",
    "Hire Shopify Developer",
  ],
  ogTitle:
    "Pardeep Kaushik — Full Stack, WordPress & Shopify Developer | Chandigarh",
  ogDescription:
    "Production-ready websites and web apps — React, Next.js, Node.js, WordPress, Shopify & WooCommerce. Based in Chandigarh, available worldwide.",
};
