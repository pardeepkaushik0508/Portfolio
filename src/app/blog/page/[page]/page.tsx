import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllPostMetas, paginatePosts, POSTS_PER_PAGE } from "@/lib/blog";
import { blogListingMetadata, breadcrumbJsonLd } from "@/lib/blog-seo";
import { BlogListingClient } from "@/components/blog/BlogListingClient";

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const total = getAllPostMetas().length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) return {};
  return blogListingMetadata(pageNum);
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const pageNum = Number(page);

  if (!Number.isInteger(pageNum) || pageNum < 1) notFound();
  if (pageNum === 1) redirect("/blog");

  const all = getAllPostMetas();
  const paginated = paginatePosts(all, pageNum);

  if (pageNum > paginated.totalPages) notFound();

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: `Page ${pageNum}`, path: `/blog/page/${pageNum}` },
  ]);

  return (
    <main id="main" className="blog-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="blog-hero blog-hero--compact">
        <div className="blog-container">
          <p className="blog-hero__eyebrow">Web Development Blog</p>
          <h1 className="blog-hero__title">Articles — page {pageNum}</h1>
          <p className="blog-hero__lead">
            Continuing practical guides on full-stack development, WordPress,
            Shopify, WooCommerce and hiring.
          </p>
        </div>
      </header>

      <div className="blog-container blog-main">
        <BlogListingClient
          posts={all}
          pagePosts={paginated.items}
          featured={[]}
          secondary={[]}
          listPosts={paginated.items}
          currentPage={pageNum}
          totalPages={paginated.totalPages}
          startIndex={(pageNum - 1) * paginated.perPage + 1}
          showFeaturedLayout={false}
        />
      </div>
    </main>
  );
}
