import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-types";
import { getCategoryBySlug } from "@/lib/blog-types";
import { formatBlogDate } from "@/lib/blog-format";

export function PostListItem({
  post,
  index,
  compact = false,
}: {
  post: BlogPostMeta;
  index: number;
  compact?: boolean;
}) {
  const category = getCategoryBySlug(post.category);
  const number = String(index).padStart(2, "0");

  return (
    <article
      className={
        compact ? "blog-list-item blog-list-item--compact" : "blog-list-item"
      }
    >
      <div className="blog-list-item__num" aria-hidden="true">
        {number}
      </div>
      <div className="blog-list-item__body">
        <p className="blog-meta-line">
          <span>{category?.name}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden="true"> · </span>
          <span>{post.readingTime}</span>
        </p>
        <h3 className="blog-list-item__title">
          <Link href={post.href}>{post.title}</Link>
        </h3>
        {!compact ? (
          <p className="blog-list-item__excerpt">{post.excerpt}</p>
        ) : null}
        <div className="blog-list-item__footer">
          {!compact ? (
            <ul className="blog-tags" aria-label="Tags">
              {post.tags.slice(0, 2).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          <Link
  href={post.href}
  className="blog-read-link"
  aria-label={`Read article: ${post.title}`}
>
  Read article
</Link>
        </div>
      </div>
    </article>
  );
}
