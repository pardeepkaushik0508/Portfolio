export const BLOG_CATEGORIES = [
  {
    slug: "chandigarh-developers",
    name: "Chandigarh Development",
    description:
      "Hiring guides and local service advice for businesses looking for developers in Chandigarh, Mohali and nearby areas.",
    ctaFocus: "hiring" as const,
  },
  {
    slug: "full-stack-development",
    name: "Full-Stack Development",
    description:
      "Practical guidance on React, Next.js, Node.js, databases, APIs, admin panels and deployment for business web apps.",
    ctaFocus: "full-stack" as const,
  },
  {
    slug: "wordpress-woocommerce",
    name: "WordPress & WooCommerce",
    description:
      "WordPress development, performance, security, ACF, Elementor decisions and WooCommerce store improvements.",
    ctaFocus: "wordpress" as const,
  },
  {
    slug: "shopify-ecommerce",
    name: "Shopify & Ecommerce",
    description:
      "Shopify theme work, speed, SEO, conversion improvements, custom sections and store migration guidance.",
    ctaFocus: "shopify" as const,
  },
  {
    slug: "website-growth",
    name: "Website Growth & Hiring",
    description:
      "Landing pages, technical SEO, maintenance, website costs, hiring questions and post-launch support.",
    ctaFocus: "growth" as const,
  },
] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]["slug"];
export type BlogCtaFocus = (typeof BLOG_CATEGORIES)[number]["ctaFocus"];

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string | null;
  category: BlogCategorySlug;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  author: string;
  featured: boolean;
  draft: boolean;
  faqs: BlogFaq[];
}

export interface BlogPostMeta extends BlogFrontmatter {
  readingTime: string;
  readingMinutes: number;
  wordCount: number;
  timeRequired: string;
  href: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  headings: TocHeading[];
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export const POSTS_PER_PAGE = 9;

export function getCategoryBySlug(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getCategoryLabel(slug: string) {
  return getCategoryBySlug(slug)?.name ?? slug;
}
