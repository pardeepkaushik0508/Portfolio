import type { Metadata } from "next";
import { personal } from "@/data/personal";
import type { BlogPost, BlogPostMeta } from "@/lib/blog-types";
import { getCategoryBySlug } from "@/lib/blog-types";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

export function blogListingMetadata(page = 1): Metadata {
  const isFirst = page <= 1;
  const title = isFirst
    ? "Web Development Blog"
    : `Web Development Blog — Page ${page}`;
  const description =
    "Practical guides on full-stack development, WordPress, Shopify, WooCommerce, website performance, technical SEO and hiring web developers.";
  const path = isFirst ? "/blog" : `/blog/page/${page}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${personal.name}`,
      description,
      url: absoluteUrl(path),
      type: "website",
      siteName: `${personal.name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${personal.name}`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export function blogCategoryMetadata(
  categorySlug: string,
  page = 1,
): Metadata | null {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  const isFirst = page <= 1;
  const title = isFirst
    ? `${category.name} Articles`
    : `${category.name} Articles — Page ${page}`;
  const description = category.description;
  const path = isFirst
    ? `/blog/category/${category.slug}`
    : `/blog/category/${category.slug}/page/${page}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${personal.name}`,
      description,
      url: absoluteUrl(path),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${personal.name}`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export function blogPostMetadata(post: BlogPostMeta): Metadata {
  const path = post.href;
  const modified = post.updatedAt && post.updatedAt > post.publishedAt
    ? post.updatedAt
    : undefined;

  return {
    title: post.title,
    description: post.description,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords, ...post.tags],
    authors: [{ name: post.author, url: getSiteUrl() }],
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.description,
      url: absoluteUrl(path),
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: modified,
      authors: [post.author],
      section: getCategoryBySlug(post.category)?.name,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    robots: { index: true, follow: true },
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  const siteUrl = getSiteUrl();
  const category = getCategoryBySlug(post.category);
  const dateModified =
    post.updatedAt && post.updatedAt > post.publishedAt
      ? post.updatedAt
      : post.publishedAt;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Full Stack Developer",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: personal.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(post.href),
    },
    articleSection: category?.name,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
    wordCount: post.wordCount,
    timeRequired: post.timeRequired,
    inLanguage: "en-IN",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

