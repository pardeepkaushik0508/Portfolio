import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";
import { getCategoryBySlug } from "@/lib/blog-types";
import { formatBlogDate } from "@/lib/blog-format";
import { CopyLinkButton } from "@/components/blog/CopyLinkButton";
import { absoluteUrl } from "@/lib/utils";

export function ArticleHeader({ post }: { post: BlogPost }) {
  const category = getCategoryBySlug(post.category);
  const updatedAt = post.updatedAt ?? null;
  const showUpdated = Boolean(updatedAt && updatedAt > post.publishedAt);

  return (
    <header className="blog-article-header">
      <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          {category ? (
            <li>
              <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
            </li>
          ) : null}
          <li aria-current="page">
            <span>{post.title}</span>
          </li>
        </ol>
      </nav>

      {category ? (
        <p className="blog-kicker">
          <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
        </p>
      ) : null}

      <h1 className="blog-article-title">{post.title}</h1>
      <p className="blog-article-excerpt">{post.excerpt}</p>

      <div className="blog-article-meta">
        <p>
          <span className="sr-only">Published </span>
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          {showUpdated && updatedAt ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>
                Updated{" "}
                <time dateTime={updatedAt}>{formatBlogDate(updatedAt)}</time>
              </span>
            </>
          ) : null}
          <span aria-hidden="true"> · </span>
          <span>{post.readingTime}</span>
        </p>
        <p>
          By <span>{post.author}</span>
          <span className="blog-author-role"> · Full Stack Developer</span>
        </p>
        <CopyLinkButton url={absoluteUrl(post.href)} />
      </div>

      <ul className="blog-tags blog-tags--lg" aria-label="Article tags">
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </header>
  );
}
