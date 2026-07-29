import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  BLOG_CATEGORIES,
  POSTS_PER_PAGE,
  type BlogCategorySlug,
  type BlogFrontmatter,
  type BlogPost,
  type BlogPostMeta,
  type TocHeading,
} from "@/lib/blog-types";
import { calculateReadingTime, countWords } from "@/lib/reading-time";

export { POSTS_PER_PAGE };

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const CATEGORY_SLUGS = new Set(BLOG_CATEGORIES.map((c) => c.slug));

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();
  const lines = content.split("\n");
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[#*`[\]]/g, "").trim();
    let id = slugifyHeading(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    headings.push({ id, text, level });
  }

  return headings;
}

function injectHeadingIds(content: string): string {
  const seen = new Map<string, number>();
  let inCode = false;

  return content
    .split("\n")
    .map((line) => {
      if (line.trim().startsWith("```")) {
        inCode = !inCode;
        return line;
      }
      if (inCode) return line;

      const match = /^(#{2,3})\s+(.+)$/.exec(line);
      if (!match) return line;

      const hashes = match[1];
      const text = match[2].trim();
      let id = slugifyHeading(text.replace(/[#*`[\]]/g, "").trim());
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count + 1}`;

      return `${hashes} ${text} {#${id}}`;
    })
    .join("\n");
}

function validateFrontmatter(
  data: Record<string, unknown>,
  filePath: string,
): BlogFrontmatter {
  const required = [
    "title",
    "slug",
    "description",
    "excerpt",
    "publishedAt",
    "category",
    "tags",
    "primaryKeyword",
    "secondaryKeywords",
    "author",
  ] as const;

  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      throw new Error(`Missing frontmatter "${key}" in ${filePath}`);
    }
  }

  if (!CATEGORY_SLUGS.has(data.category as BlogCategorySlug)) {
    throw new Error(`Invalid category "${String(data.category)}" in ${filePath}`);
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    throw new Error(`Tags must be a non-empty array in ${filePath}`);
  }

  if (!Array.isArray(data.secondaryKeywords)) {
    throw new Error(`secondaryKeywords must be an array in ${filePath}`);
  }

  if (!Array.isArray(data.faqs) || data.faqs.length < 4) {
    throw new Error(`faqs must include at least 4 items in ${filePath}`);
  }

  const publishedAt = String(data.publishedAt);
  const updatedAt =
    data.updatedAt === undefined ||
    data.updatedAt === null ||
    data.updatedAt === "" ||
    data.updatedAt === "null"
      ? null
      : String(data.updatedAt);

  if (updatedAt && updatedAt < publishedAt) {
    throw new Error(`updatedAt earlier than publishedAt in ${filePath}`);
  }

  return {
    title: String(data.title),
    slug: String(data.slug),
    description: String(data.description),
    excerpt: String(data.excerpt),
    publishedAt,
    updatedAt,
    category: data.category as BlogCategorySlug,
    tags: data.tags.map(String),
    primaryKeyword: String(data.primaryKeyword),
    secondaryKeywords: data.secondaryKeywords.map(String),
    author: String(data.author),
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    faqs: (data.faqs as { question: string; answer: string }[]).map((f) => ({
      question: String(f.question),
      answer: String(f.answer),
    })),
  };
}

function fileToPost(filePath: string, includeContent: boolean): BlogPost | BlogPostMeta {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = validateFrontmatter(data as Record<string, unknown>, filePath);
  const reading = calculateReadingTime(content);
  const wordCount = countWords(content);

  const meta: BlogPostMeta = {
    ...frontmatter,
    readingTime: reading.text,
    readingMinutes: reading.minutes,
    wordCount,
    timeRequired: reading.timeRequired,
    href: `/blog/${frontmatter.slug}`,
  };

  if (!includeContent) return meta;

  return {
    ...meta,
    content: injectHeadingIds(content.trim()),
    headings: extractHeadings(content),
  };
}

function listMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(CONTENT_DIR, f));
}

export function getAllPostMetas(includeDrafts = false): BlogPostMeta[] {
  const posts = listMdxFiles()
    .map((file) => fileToPost(file, false) as BlogPostMeta)
    .filter((post) => includeDrafts || !post.draft);

  const dates = new Set<string>();
  const slugs = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const post of posts) {
    if (dates.has(post.publishedAt)) {
      throw new Error(`Duplicate publishedAt: ${post.publishedAt}`);
    }
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate slug: ${post.slug}`);
    }
    if (titles.has(post.title)) {
      throw new Error(`Duplicate title: ${post.title}`);
    }
    if (descriptions.has(post.description)) {
      throw new Error(`Duplicate description: ${post.description}`);
    }
    dates.add(post.publishedAt);
    slugs.add(post.slug);
    titles.add(post.title);
    descriptions.add(post.description);
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const post = fileToPost(filePath, true) as BlogPost;
  if (post.draft) return null;
  return post;
}

export function getPostsByCategory(category: BlogCategorySlug): BlogPostMeta[] {
  return getAllPostMetas().filter((post) => post.category === category);
}

export { getCategoryBySlug, getCategoryLabel } from "@/lib/blog-types";

export function searchPosts(
  query: string,
  posts: BlogPostMeta[] = getAllPostMetas(),
): BlogPostMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return posts;

  return posts.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      post.primaryKeyword,
      ...post.tags,
      ...post.secondaryKeywords,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function paginatePosts<T>(items: T[], page: number, perPage = POSTS_PER_PAGE) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    page: currentPage,
    totalPages,
    total,
    perPage,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

export function getRelatedPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
  const all = getAllPostMetas().filter((p) => p.slug !== post.slug);

  const scored = all.map((candidate) => {
    let score = 0;
    if (candidate.category === post.category) score += 5;
    const sharedTags = candidate.tags.filter((t) => post.tags.includes(t));
    score += sharedTags.length * 2;
    const sharedKeywords = candidate.secondaryKeywords.filter((k) =>
      post.secondaryKeywords.includes(k),
    );
    score += sharedKeywords.length;
    return { candidate, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      new Date(b.candidate.publishedAt).getTime() -
      new Date(a.candidate.publishedAt).getTime()
    );
  });

  const related: BlogPostMeta[] = [];
  const seen = new Set<string>();

  for (const { candidate } of scored) {
    if (seen.has(candidate.slug)) continue;
    seen.add(candidate.slug);
    related.push(candidate);
    if (related.length >= limit) break;
  }

  return related;
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPostMetas();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getFeaturedPosts(limit = 3): BlogPostMeta[] {
  const featured = getAllPostMetas().filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const rest = getAllPostMetas().filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}

export { formatBlogDate } from "@/lib/blog-format";

export function getAllSlugs(): string[] {
  return getAllPostMetas().map((p) => p.slug);
}

export function validateInternalBlogLinks(content: string, knownSlugs: Set<string>) {
  const broken: string[] = [];
  const regex = /\]\(\/blog\/([a-z0-9-]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    if (!knownSlugs.has(match[1])) broken.push(match[1]);
  }
  return broken;
}
