"use client";

import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatBlogDate } from "@/lib/blog-format";
import { trackEvent } from "@/lib/analytics";

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (!posts.length) return null;

  return (
    <section className="blog-related" aria-labelledby="related-heading">
      <h2 id="related-heading" className="blog-section-title">
        Related articles
      </h2>
      <ul className="blog-related__list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={post.href}
              className="blog-related__link"
              onClick={() =>
                trackEvent("related_post_click", { slug: post.slug })
              }
            >
              <span className="blog-related__title">{post.title}</span>
              <span className="blog-meta-line">
                <time dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt)}
                </time>
                <span aria-hidden="true"> · </span>
                <span>{post.readingTime}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
