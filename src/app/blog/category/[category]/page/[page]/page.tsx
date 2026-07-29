import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getAllPostMetas,
  getPostsByCategory,
  paginatePosts,
  POSTS_PER_PAGE,
} from "@/lib/blog";
import { BLOG_CATEGORIES, type BlogCategorySlug } from "@/lib/blog-types";
import { blogCategoryMetadata, breadcrumbJsonLd } from "@/lib/blog-seo";
import { BlogListingClient } from "@/components/blog/BlogListingClient";

interface PageProps {
  params: Promise<{ category: string; page: string }>;
}

export function generateStaticParams() {
  const params: { category: string; page: string }[] = [];
  for (const cat of BLOG_CATEGORIES) {
    const total = getPostsByCategory(cat.slug).length;
    const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
    for (let p = 2; p <= totalPages; p += 1) {
      params.push({ category: cat.slug, page: String(p) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, page } = await params;
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) return {};
  const meta = blogCategoryMetadata(category, pageNum);
  return meta ?? {};
}

export default async function BlogCategoryPaginatedPage({ params }: PageProps) {
  const { category, page } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 1) notFound();
  if (pageNum === 1) redirect(`/blog/category/${cat.slug}`);

  const categoryPosts = getPostsByCategory(category as BlogCategorySlug);
  if (!categoryPosts.length) notFound();

  const all = getAllPostMetas();
  const paginated = paginatePosts(categoryPosts, pageNum);
  if (pageNum > paginated.totalPages) notFound();

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: cat.name, path: `/blog/category/${cat.slug}` },
    { name: `Page ${pageNum}`, path: `/blog/category/${cat.slug}/page/${pageNum}` },
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
          <p className="blog-hero__eyebrow">Category</p>
          <h1 className="blog-hero__title">
            {cat.name} — page {pageNum}
          </h1>
          <p className="blog-hero__lead">{cat.description}</p>
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
          categorySlug={cat.slug}
          showFeaturedLayout={false}
        />
      </div>
    </main>
  );
}
