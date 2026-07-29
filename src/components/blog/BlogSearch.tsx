"use client";

import { useDeferredValue, useEffect, useId, useState, useTransition } from "react";
import type { BlogPostMeta } from "@/lib/blog-types";
import { trackEvent } from "@/lib/analytics";

interface BlogSearchProps {
  posts: BlogPostMeta[];
  onResults: (results: BlogPostMeta[] | null, query: string) => void;
}

export function BlogSearch({ posts, onResults }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [, startTransition] = useTransition();
  const inputId = useId();

  useEffect(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) {
      onResults(null, "");
      return;
    }

    const timer = window.setTimeout(() => {
      startTransition(() => {
        const results = posts.filter((post) => {
          const haystack = [
            post.title,
            post.excerpt,
            post.category,
            ...post.tags,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        });
        onResults(results, deferred.trim());
        trackEvent("blog_search", { query: deferred.trim().slice(0, 80), results: results.length });
      });
    }, 220);

    return () => window.clearTimeout(timer);
  }, [deferred, posts, onResults]);

  return (
    <form
      className="blog-search"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor={inputId} className="sr-only">
        Search articles
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, topic or tag"
        autoComplete="off"
        className="blog-search__input"
      />
      {query ? (
        <button
          type="button"
          className="blog-search__clear"
          onClick={() => setQuery("")}
          aria-label="Clear search"
        >
          Clear
        </button>
      ) : null}
    </form>
  );
}
