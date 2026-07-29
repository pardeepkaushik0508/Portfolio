import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-types";

export function ArticleNavigation({
  previous,
  next,
}: {
  previous: BlogPostMeta | null;
  next: BlogPostMeta | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav className="blog-article-nav" aria-label="Article navigation">
      {previous ? (
        <Link href={previous.href} className="blog-article-nav__item">
          <span className="blog-kicker">Previous</span>
          <span className="blog-article-nav__title">{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="blog-article-nav__item blog-article-nav__item--next">
          <span className="blog-kicker">Next</span>
          <span className="blog-article-nav__title">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
