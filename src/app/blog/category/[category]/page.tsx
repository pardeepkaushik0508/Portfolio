import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPostMetas,
  getPostsByCategory,
  paginatePosts,
} from "@/lib/blog";
import { BLOG_CATEGORIES, type BlogCategorySlug } from "@/lib/blog-types";
import { blogCategoryMetadata, breadcrumbJsonLd } from "@/lib/blog-seo";
import { BlogListingClient } from "@/components/blog/BlogListingClient";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = blogCategoryMetadata(category, 1);
  if (!meta) return {};
  return meta;
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const categoryPosts = getPostsByCategory(category as BlogCategorySlug);
  if (!categoryPosts.length) notFound();

  const all = getAllPostMetas();
  const paginated = paginatePosts(categoryPosts, 1);

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: cat.name, path: `/blog/category/${cat.slug}` },
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
          <h1 className="blog-hero__title">{cat.name}</h1>
          <p className="blog-hero__lead">
            {cat.description}{" "}
            <span className="blog-hero__count">
              {categoryPosts.length} article
              {categoryPosts.length === 1 ? "" : "s"}
            </span>
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
          currentPage={1}
          totalPages={paginated.totalPages}
          startIndex={1}
          categorySlug={cat.slug}
          showFeaturedLayout={false}
        />
      </div>
    </main>
  );
}
