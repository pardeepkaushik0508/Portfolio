"use client";

import { useCallback, useMemo, useState } from "react";
import type { BlogPostMeta } from "@/lib/blog-types";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { PostList } from "@/components/blog/PostList";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { CategoryNavigation } from "@/components/blog/CategoryNavigation";
import { Pagination } from "@/components/blog/Pagination";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { BLOG_CATEGORIES } from "@/lib/blog-types";

interface BlogListingClientProps {
  posts: BlogPostMeta[];
  pagePosts: BlogPostMeta[];
  featured: BlogPostMeta[];
  secondary: BlogPostMeta[];
  listPosts: BlogPostMeta[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  categorySlug?: string;
  showFeaturedLayout?: boolean;
}

export function BlogListingClient({
  posts,
  pagePosts,
  featured,
  secondary,
  listPosts,
  currentPage,
  totalPages,
  startIndex,
  categorySlug,
  showFeaturedLayout = true,
}: BlogListingClientProps) {
  const [searchResults, setSearchResults] = useState<BlogPostMeta[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const onResults = useCallback((results: BlogPostMeta[] | null, query: string) => {
    setSearchResults(results);
    setSearchQuery(query);
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of BLOG_CATEGORIES) {
      map[cat.slug] = posts.filter((p) => p.category === cat.slug).length;
    }
    return map;
  }, [posts]);

  const isSearching = searchResults !== null;

  return (
    <>
      <div className="blog-toolbar">
        <BlogSearch posts={posts} onResults={onResults} />
        <CategoryNavigation active={categorySlug} counts={counts} />
      </div>

      {isSearching ? (
        <section className="blog-listing-section" aria-live="polite">
          <h2 className="blog-section-title">
            {searchResults.length
              ? `Results for “${searchQuery}”`
              : `No results for “${searchQuery}”`}
          </h2>
          <PostList posts={searchResults} startIndex={1} />
        </section>
      ) : (
        <>
          {showFeaturedLayout && featured[0] && currentPage === 1 ? (
            <section className="blog-highlights" aria-label="Featured articles">
              <FeaturedPost post={featured[0]} number="01" />
              {secondary.length > 0 ? (
                <div className="blog-secondary-grid">
                  {secondary.map((post, i) => (
                    <FeaturedPost
                      key={post.slug}
                      post={post}
                      number={String(i + 2).padStart(2, "0")}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          <section className="blog-listing-section" aria-label="All articles">
            <h2 className="blog-section-title">
              {currentPage === 1 && showFeaturedLayout
                ? "More articles"
                : "Articles"}
            </h2>
            <PostList
              posts={showFeaturedLayout && currentPage === 1 ? listPosts : pagePosts}
              startIndex={startIndex}
            />
          </section>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={
              categorySlug ? `/blog/category/${categorySlug}` : "/blog"
            }
          />
        </>
      )}

      <ArticleCTA
        focus={
          categorySlug
            ? BLOG_CATEGORIES.find((c) => c.slug === categorySlug)?.ctaFocus
            : "default"
        }
        location={categorySlug ? "category" : "listing"}
      />
    </>
  );
}
