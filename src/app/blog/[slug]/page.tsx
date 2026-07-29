import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentPosts,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { getCategoryBySlug } from "@/lib/blog-types";
import {
  blogPostMetadata,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from "@/lib/blog-seo";
import { MdxContent } from "@/components/blog/MdxContent";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { AuthorBlock } from "@/components/blog/AuthorBlock";
import { ArticleFaqs } from "@/components/blog/ArticleFaqs";
import { BlogViewTracker } from "@/components/blog/BlogViewTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return blogPostMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const category = getCategoryBySlug(post.category);
  const related = getRelatedPosts(post, 3);
  const { previous, next } = getAdjacentPosts(post.slug);

  const schemas = [
    blogPostingJsonLd(post),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      ...(category
        ? [{ name: category.name, path: `/blog/category/${category.slug}` }]
        : []),
      { name: post.title, path: post.href },
    ]),
    faqPageJsonLd(post.faqs),
  ];

  return (
    <main id="main" className="blog-root">
      <BlogViewTracker slug={post.slug} category={post.category} />
      <ReadingProgress />
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      <div className="blog-container blog-article-layout">
        <ArticleHeader post={post} />

        <div className="blog-article-grid">
          <aside className="blog-article-aside">
            <TableOfContents headings={post.headings} />
          </aside>

          <article className="blog-article" id="article-body">
            <MdxContent source={post.content} />
            <ArticleFaqs faqs={post.faqs} />
            <AuthorBlock />
            <ArticleCTA focus={category?.ctaFocus ?? "default"} location="article" />
            <ArticleNavigation previous={previous} next={next} />
            <RelatedPosts posts={related} />
          </article>
        </div>
      </div>
    </main>
  );
}
