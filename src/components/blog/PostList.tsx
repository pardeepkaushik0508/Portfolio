import type { BlogPostMeta } from "@/lib/blog-types";
import { PostListItem } from "@/components/blog/PostListItem";

export function PostList({
  posts,
  startIndex = 1,
  compact = false,
}: {
  posts: BlogPostMeta[];
  startIndex?: number;
  compact?: boolean;
}) {
  if (!posts.length) {
    return (
      <p className="blog-empty" role="status">
        No articles match your search. Try a different keyword or browse by category.
      </p>
    );
  }

  return (
    <div className="blog-post-list">
      {posts.map((post, i) => (
        <PostListItem
          key={post.slug}
          post={post}
          index={startIndex + i}
          compact={compact}
        />
      ))}
    </div>
  );
}
