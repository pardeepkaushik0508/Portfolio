"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function pageHref(basePath: string, page: number) {
  if (page <= 1) return basePath;
  if (basePath === "/blog") return `/blog/page/${page}`;
  return `${basePath}/page/${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="blog-pagination" aria-label="Blog pagination">
      <Link
        href={pageHref(basePath, currentPage - 1)}
        className={cn(
          "blog-pagination__btn",
          currentPage <= 1 && "is-disabled",
        )}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : undefined}
        onClick={() =>
          trackEvent("blog_pagination_click", {
            direction: "prev",
            page: currentPage - 1,
          })
        }
      >
        Previous
      </Link>

      <ol className="blog-pagination__pages">
        {pages.map((page) => (
          <li key={page}>
            <Link
              href={pageHref(basePath, page)}
              className={cn(
                "blog-pagination__num",
                page === currentPage && "is-active",
              )}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() =>
                trackEvent("blog_pagination_click", {
                  direction: "number",
                  page,
                })
              }
            >
              {page}
            </Link>
          </li>
        ))}
      </ol>

      <Link
        href={pageHref(basePath, currentPage + 1)}
        className={cn(
          "blog-pagination__btn",
          currentPage >= totalPages && "is-disabled",
        )}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : undefined}
        onClick={() =>
          trackEvent("blog_pagination_click", {
            direction: "next",
            page: currentPage + 1,
          })
        }
      >
        Next
      </Link>
    </nav>
  );
}
