import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-types";
import { getCategoryBySlug } from "@/lib/blog-types";
import { formatBlogDate } from "@/lib/blog-format";

export function FeaturedPost({
  post,
  number,
}: {
  post: BlogPostMeta;
  number: string;
}) {
  const category = getCategoryBySlug(post.category);

  return (
    <article className="blog-featured">
      <div className="blog-featured__meta">
        <span className="blog-featured__number" aria-hidden="true">
          {number}
        </span>

        <div>
          <p className="blog-kicker">{category?.name}</p>

          <p className="blog-meta-line">
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>

            <span aria-hidden="true"> · </span>
            <span>{post.readingTime}</span>
          </p>
        </div>
      </div>

      <h2 className="blog-featured__title">
        <Link href={post.href}>{post.title}</Link>
      </h2>

      <p className="blog-featured__excerpt">{post.excerpt}</p>

      <div className="blog-featured__footer">
        <ul className="blog-tags" aria-label="Tags">
          {post.tags.slice(0, 3).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <Link
          href={post.href}
          className="blog-read-link"
          aria-label={`Read article: ${post.title}`}
        >
          Read article
        </Link>
      </div>
    </article>
  );
}