import { NextResponse } from "next/server";
import {
  getAllBlogViews,
  getBlogViews,
  incrementBlogViews,
} from "@/lib/blog-views";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    if (!getPostBySlug(slug)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const views = await getBlogViews(slug);
    return NextResponse.json({ slug, views });
  }

  const views = await getAllBlogViews();
  return NextResponse.json({ views });
}

export async function POST(request: Request) {
  let body: { slug?: string } = {};
  try {
    body = (await request.json()) as { slug?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = body.slug?.trim();
  if (!slug || !getPostBySlug(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const views = await incrementBlogViews(slug);
  return NextResponse.json({ slug, views });
}
