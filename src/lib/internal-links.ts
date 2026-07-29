import {
  getAllPostMetas,
  getPostBySlug,
  validateInternalBlogLinks,
} from "@/lib/blog";

export function auditBlogInternalLinks() {
  const posts = getAllPostMetas();
  const slugs = new Set(posts.map((p) => p.slug));
  const report: { slug: string; broken: string[] }[] = [];

  for (const meta of posts) {
    const post = getPostBySlug(meta.slug);
    if (!post) continue;
    const broken = validateInternalBlogLinks(post.content, slugs);
    if (broken.length) report.push({ slug: meta.slug, broken });
  }

  return report;
}

export function findLightlyLinkedPosts() {
  const posts = getAllPostMetas();
  const inbound = new Map<string, number>();
  for (const p of posts) inbound.set(p.slug, 0);

  for (const meta of posts) {
    const post = getPostBySlug(meta.slug);
    if (!post) continue;
    const regex = /\]\(\/blog\/([a-z0-9-]+)\)/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(post.content)) !== null) {
      inbound.set(match[1], (inbound.get(match[1]) ?? 0) + 1);
    }
  }

  return posts.filter((p) => (inbound.get(p.slug) ?? 0) === 0).map((p) => p.slug);
}
