import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Node.js", "Express", "PHP", "Python", "REST APIs"],
  },
  {
    id: "databases",
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    id: "cms",
    title: "CMS / Commerce",
    skills: [
      "WordPress",
      "Shopify",
      "WooCommerce",
      "Wix",
      "Elementor",
      "Divi",
      "Avada",
      "WPBakery",
      "ACF",
      "Liquid",
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    skills: [
      "VPS",
      "Nginx",
      "PM2",
      "SSL",
      "DNS",
      "Git",
      "GitHub",
      "Hostinger",
    ],
  },
];
