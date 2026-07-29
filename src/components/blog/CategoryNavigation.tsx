"use client";

import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blog-types";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function CategoryNavigation({
  active,
  counts,
}: {
  active?: string;
  counts?: Record<string, number>;
}) {
  return (
    <nav className="blog-categories" aria-label="Blog categories">
      <ul className="blog-categories__list">
        <li>
          <Link
            href="/blog"
            className={cn("blog-categories__link", !active && "is-active")}
            aria-current={!active ? "page" : undefined}
          >
            All
          </Link>
        </li>
        {BLOG_CATEGORIES.map((category) => {
          const count = counts?.[category.slug];
          return (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
                className={cn(
                  "blog-categories__link",
                  active === category.slug && "is-active",
                )}
                aria-current={active === category.slug ? "page" : undefined}
                onClick={() =>
                  trackEvent("blog_category_click", { category: category.slug })
                }
              >
                {category.name}
                {typeof count === "number" ? (
                  <span className="blog-categories__count"> ({count})</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
