import type { MetadataRoute } from "next";
import { getAllPostMetas, getPostsByCategory, POSTS_PER_PAGE } from "@/lib/blog";
import { BLOG_CATEGORIES } from "@/lib/blog-types";
import { getAllServiceSlugs } from "@/data/service-landings";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const posts = getAllPostMetas();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.94,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/process`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: posts[0] ? new Date(posts[0].publishedAt) : now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sitemap`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/feed.xml`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];

  for (const slug of getAllServiceSlugs()) {
    entries.push({
      url: `${siteUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.92,
    });
  }

  for (const project of projects) {
    entries.push({
      url: `${siteUrl}/work/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: project.featured ? 0.88 : 0.7,
    });
  }

  for (let page = 2; page <= totalPages; page += 1) {
    entries.push({
      url: `${siteUrl}/blog/page/${page}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const category of BLOG_CATEGORIES) {
    const categoryPosts = getPostsByCategory(category.slug);
    if (!categoryPosts.length) continue;

    entries.push({
      url: `${siteUrl}/blog/category/${category.slug}`,
      lastModified: new Date(categoryPosts[0].publishedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    const catPages = Math.max(1, Math.ceil(categoryPosts.length / POSTS_PER_PAGE));
    for (let page = 2; page <= catPages; page += 1) {
      entries.push({
        url: `${siteUrl}/blog/category/${category.slug}/page/${page}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  for (const post of posts) {
    entries.push({
      url: `${siteUrl}${post.href}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly",
      priority: post.featured ? 0.85 : 0.75,
    });
  }

  return entries;
}
