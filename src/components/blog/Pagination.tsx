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

/** Build page list with ellipses, e.g. 1 2 3 4 … 16 17 18 */
function getVisiblePages(
  current: number,
  total: number,
): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const siblings = 1;
  const boundaryStart = 4;
  const boundaryEnd = 3;

  const set = new Set<number>();

  // Always include first + last
  set.add(1);
  set.add(total);

  // Sliding window around current
  for (let p = current - siblings; p <= current + siblings; p += 1) {
    if (p >= 1 && p <= total) set.add(p);
  }

  // Near the start — show 1..4 and last 3
  if (current <= boundaryStart) {
    for (let p = 1; p <= boundaryStart; p += 1) set.add(p);
    for (let p = total - boundaryEnd + 1; p <= total; p += 1) {
      if (p >= 1) set.add(p);
    }
  } else if (current >= total - boundaryEnd + 1) {
    // Near the end — show first page cluster + last stretch
    for (let p = 1; p <= Math.min(2, total); p += 1) set.add(p);
    for (let p = Math.max(1, total - 4); p <= total; p += 1) set.add(p);
  } else {
    // Middle — keep last page visible with a small end cluster when close
    for (let p = total - 1; p <= total; p += 1) {
      if (p >= 1) set.add(p);
    }
  }

  const sorted = Array.from(set).sort((a, b) => a - b);
  const result: Array<number | "ellipsis"> = [];

  for (let i = 0; i < sorted.length; i += 1) {
    const page = sorted[i]!;
    if (i > 0) {
      const prev = sorted[i - 1]!;
      if (page - prev === 2) {
        result.push(prev + 1);
      } else if (page - prev > 2) {
        result.push("ellipsis");
      }
    }
    result.push(page);
  }

  return result;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

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
        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <li key={`ellipsis-${index}`} className="blog-pagination__ellipsis" aria-hidden>
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={pageHref(basePath, item)}
                className={cn(
                  "blog-pagination__num",
                  item === currentPage && "is-active",
                )}
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? "page" : undefined}
                onClick={() =>
                  trackEvent("blog_pagination_click", {
                    direction: "number",
                    page: item,
                  })
                }
              >
                {item}
              </Link>
            </li>
          ),
        )}
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
