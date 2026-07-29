import type { Metadata } from "next";
import {
  getAllPostMetas,
  getFeaturedPosts,
  paginatePosts,
} from "@/lib/blog";
import { blogListingMetadata, breadcrumbJsonLd } from "@/lib/blog-seo";
import { BlogListingClient } from "@/components/blog/BlogListingClient";
import { getSiteUrl } from "@/lib/utils";

export const metadata: Metadata = blogListingMetadata(1);

export default function BlogPage() {
  const all = getAllPostMetas();
  const featuredPool = getFeaturedPosts(3);
  const featured = featuredPool.slice(0, 1);
  const secondary = featuredPool.slice(1, 3);
  const featuredSlugs = new Set(featuredPool.map((p) => p.slug));
  const remaining = all.filter((p) => !featuredSlugs.has(p.slug));
  const paginated = paginatePosts(all, 1);
  const listPosts = remaining.slice(0, Math.max(0, paginated.perPage - featuredPool.length));

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <main id="main" className="blog-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="blog-hero">
        <div className="blog-container">
          <p className="blog-hero__eyebrow">Web Development Blog</p>
          <h1 className="blog-hero__title">
            Practical guides for building, improving and hiring for websites
          </h1>
          <p className="blog-hero__lead">
            Notes from real project work across full-stack apps, WordPress,
            Shopify and WooCommerce—written for business owners and teams in
            Chandigarh and beyond.
          </p>
        </div>
      </header>

      <div className="blog-container blog-main">
        <BlogListingClient
          posts={all}
          pagePosts={paginated.items}
          featured={featured}
          secondary={secondary}
          listPosts={listPosts}
          currentPage={1}
          totalPages={paginated.totalPages}
          startIndex={featuredPool.length + 1}
          showFeaturedLayout
        />
      </div>

      <p className="sr-only">Site: {getSiteUrl()}</p>
    </main>
  );
}
