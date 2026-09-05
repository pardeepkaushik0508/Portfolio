import { absoluteUrl, getSiteUrl } from "@/lib/utils";

/**
 * IndexNow helper — notify Bing/Yandex-compatible engines of URL changes.
 *
 * Setup (manual):
 * 1. Generate a key at https://www.bing.com/indexnow
 * 2. Host the key file at: public/{INDEXNOW_KEY}.txt containing the same key
 * 3. Set INDEXNOW_KEY in environment (server-only; never expose to client)
 * 4. Call notifyIndexNow([urls]) only for created/updated/deleted public URLs
 *
 * Do not spam the endpoint. Never commit a real API key.
 */
export async function notifyIndexNow(urls: string[]): Promise<{
  ok: boolean;
  skipped?: string;
  status?: number;
  body?: string;
}> {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) {
    return { ok: false, skipped: "INDEXNOW_KEY not configured" };
  }

  const host = new URL(getSiteUrl()).host;
  const keyLocation = absoluteUrl(`/${key}.txt`);
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls.map((url) =>
      url.startsWith("http") ? url : absoluteUrl(url),
    ),
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, body };
}
