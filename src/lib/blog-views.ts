import { promises as fs } from "fs";
import path from "path";
import { getAllPostMetas } from "@/lib/blog";

const VIEWS_PATH = path.join(process.cwd(), "data", "blog-views.json");

type ViewsMap = Record<string, number>;

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Stable baseline so new posts don't all start at 0. */
export function seedViewsForPost(slug: string, publishedAt: string): number {
  const published = Date.parse(publishedAt);
  const days = Number.isFinite(published)
    ? Math.max(0, Math.floor((Date.now() - published) / 86_400_000))
    : 0;
  const base = 28 + (hashSlug(slug) % 67);
  return base + Math.min(420, Math.floor(days * 1.35));
}

async function ensureStore(): Promise<ViewsMap> {
  try {
    const raw = await fs.readFile(VIEWS_PATH, "utf8");
    const parsed = JSON.parse(raw) as ViewsMap;
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    /* missing or invalid — rebuild */
  }

  const seeded: ViewsMap = {};
  for (const post of getAllPostMetas()) {
    seeded[post.slug] = seedViewsForPost(post.slug, post.publishedAt);
  }
  await writeStore(seeded);
  return seeded;
}

async function writeStore(map: ViewsMap): Promise<void> {
  try {
    await fs.mkdir(path.dirname(VIEWS_PATH), { recursive: true });
    await fs.writeFile(VIEWS_PATH, `${JSON.stringify(map, null, 2)}\n`, "utf8");
  } catch {
    /* read-only host — keep in-memory for this process only */
  }
}

let memoryCache: ViewsMap | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function getStore(): Promise<ViewsMap> {
  if (memoryCache) return memoryCache;
  memoryCache = await ensureStore();
  return memoryCache;
}

export async function getAllBlogViews(): Promise<ViewsMap> {
  const store = await getStore();
  const posts = getAllPostMetas();
  let dirty = false;
  for (const post of posts) {
    if (typeof store[post.slug] !== "number") {
      store[post.slug] = seedViewsForPost(post.slug, post.publishedAt);
      dirty = true;
    }
  }
  if (dirty) {
    memoryCache = store;
    writeQueue = writeQueue.then(() => writeStore(store));
  }
  return { ...store };
}

export async function getBlogViews(slug: string): Promise<number> {
  const all = await getAllBlogViews();
  if (typeof all[slug] === "number") return all[slug]!;
  const post = getAllPostMetas().find((p) => p.slug === slug);
  return post ? seedViewsForPost(slug, post.publishedAt) : 0;
}

export async function incrementBlogViews(slug: string): Promise<number> {
  const store = await getStore();
  const post = getAllPostMetas().find((p) => p.slug === slug);
  if (!post) return 0;

  const current =
    typeof store[slug] === "number"
      ? store[slug]!
      : seedViewsForPost(slug, post.publishedAt);
  const next = current + 1;
  store[slug] = next;
  memoryCache = store;
  writeQueue = writeQueue.then(() => writeStore(store));
  await writeQueue;
  return next;
}

export { formatViewCount } from "@/lib/blog-views-format";
