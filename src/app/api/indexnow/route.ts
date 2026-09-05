import { NextResponse } from "next/server";
import { notifyIndexNow } from "@/lib/indexnow";

/**
 * Optional IndexNow trigger.
 * POST { "urls": ["/path", "https://…"], "secret": "…" }
 * Requires INDEXNOW_KEY + INDEXNOW_SUBMIT_SECRET in env.
 */
export async function POST(request: Request) {
  const submitSecret = process.env.INDEXNOW_SUBMIT_SECRET?.trim();
  if (!submitSecret) {
    return NextResponse.json(
      { error: "IndexNow submit endpoint is not configured." },
      { status: 503 },
    );
  }

  let body: { urls?: string[]; secret?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.secret !== submitSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = Array.isArray(body.urls) ? body.urls.filter(Boolean) : [];
  if (!urls.length) {
    return NextResponse.json({ error: "urls required" }, { status: 400 });
  }

  const result = await notifyIndexNow(urls);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
