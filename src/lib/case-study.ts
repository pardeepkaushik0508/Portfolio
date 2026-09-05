import type { Project } from "@/types";

const platformLabel: Record<Project["category"], string> = {
  wordpress: "WordPress",
  shopify: "Shopify",
  "full-stack": "custom full-stack web application",
};

const seoTitleSuffix: Record<Project["category"], string> = {
  wordpress: "WordPress Website Development",
  shopify: "Shopify Ecommerce Development",
  "full-stack": "Full Stack Next.js Application Development",
};

const relatedByCategory: Record<
  Project["category"],
  { href: string; label: string }[]
> = {
  wordpress: [
    { href: "/wordpress-developer", label: "WordPress Developer" },
    { href: "/wordpress-website-design", label: "WordPress Website Design" },
    { href: "/elementor-developer", label: "Elementor Developer" },
    { href: "/woocommerce-developer", label: "WooCommerce Developer" },
    { href: "/figma-to-wordpress", label: "Figma to WordPress" },
    { href: "/wordpress-migration", label: "WordPress Migration" },
    { href: "/wordpress-speed-optimization", label: "WordPress Speed Optimization" },
  ],
  shopify: [
    { href: "/shopify-developer", label: "Shopify Developer" },
    { href: "/shopify-liquid-developer", label: "Shopify Liquid Developer" },
    { href: "/shopify-theme-development", label: "Shopify Theme Development" },
    { href: "/figma-to-shopify", label: "Figma to Shopify" },
    { href: "/shopify-speed-optimization", label: "Shopify Speed Optimization" },
  ],
  "full-stack": [
    { href: "/full-stack-developer", label: "Full Stack Developer" },
    { href: "/saas-mvp-development", label: "SaaS MVP Development" },
    { href: "/api-integration", label: "API Integration" },
    { href: "/remote-web-developer", label: "Remote Web Developer" },
  ],
};

export function getCaseStudyExtras(project: Project) {
  const platform = platformLabel[project.category];
  const techLine = project.technologies.join(", ");

  const requirements =
    project.functionality?.length
      ? project.functionality
      : [
          `Clear ${platform.toLowerCase()} presentation for the brand and key offers`,
          "Responsive layouts that stay usable on phone, tablet and desktop",
          "Maintainable structure so content and pages can be updated after handoff",
          project.hasLiveUrl
            ? "Production-ready delivery with a live URL for review"
            : "Solid implementation ready for hosting and launch when infrastructure is ready",
        ];

  const challenge =
    project.challenge ??
    `Deliver a ${platform} experience for ${project.title} that communicates the offer clearly, works across devices, and stays practical to maintain after launch.`;

  const solution =
    project.solution ??
    `${personalName()} implemented ${project.contribution.toLowerCase()} using ${techLine}, with attention to structure, responsiveness and clean handoff.`;

  const developmentWork = [
    project.contribution,
    `Built and refined the ${platform} experience around the project goals described for ${project.title}.`,
    `Applied ${techLine} in line with the role: ${project.role}.`,
  ];

  const responsiveWork =
    "Layouts and interactions were checked for phone, tablet and desktop so visitors can browse services, products or tools without broken sections or unusable CTAs.";

  const performanceWork =
    project.category === "full-stack"
      ? "Delivery focused on practical front-end performance, sensible asset handling and stable production configuration where hosting was part of the engagement."
      : "Implementation prioritized clean templates, sensible media handling and a maintainable setup that supports later Core Web Vitals / speed work when needed.";

  const features =
    project.functionality?.length
      ? project.functionality
      : [
          `${platform} implementation aligned to the brand`,
          "Responsive page structure",
          project.role,
          techLine,
        ];

  const outcome =
    project.result ??
    (project.url && project.hasLiveUrl && !project.disabled
      ? `The ${project.title} project is live${project.url ? ` at ${project.url.replace(/^https?:\/\//, "")}` : ""}, representing real ${platform} work by ${personalName()}.`
      : `The ${project.title} build was delivered as ${platform} work covering the contribution above. Live hosting status may change independently of the development work.`);

  const overview = `${project.description} ${personalName()} contributed as ${project.role}, with hands-on work covering: ${project.contribution}`;

  const faqs = [
    {
      question: `What platform was used for ${project.title}?`,
      answer: `${project.title} was delivered on ${platform}${project.type ? ` (${project.type})` : ""}. Core technologies included ${techLine}.`,
    },
    {
      question: `What did ${personalName()} do on this project?`,
      answer: project.contribution,
    },
    {
      question: "Can you build something similar for my business?",
      answer: `Yes. ${personalName()} takes on ${platform} projects with a similar scope—share your goals on the contact page for a practical next step.`,
    },
  ];

  return {
    platform,
    seoTitle: `${project.title} — ${seoTitleSuffix[project.category]}`,
    overview,
    requirements,
    challenge,
    solution,
    developmentWork,
    responsiveWork,
    performanceWork,
    features,
    outcome,
    approach: project.approach,
    relatedServices: relatedByCategory[project.category],
    faqs,
    metaDescription: `${project.description} Case study by ${personalName()} — ${project.role}. Stack: ${techLine}.`,
  };
}

function personalName() {
  return "Pardeep Kaushik";
}
