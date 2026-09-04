"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { ViewBadge } from "@/components/blog/ViewBadge";

const SESSION_KEY = "pk-blog-viewed";

function wasViewedThisSession(slug: string) {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const map = JSON.parse(raw) as Record<string, number>;
    return Boolean(map[slug]);
  } catch {
    return false;
  }
}

function markViewedThisSession(slug: string) {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    map[slug] = Date.now();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function BlogViewTracker({
  slug,
  category,
  initialViews,
  showBadge = true,
}: {
  slug: string;
  category: string;
  initialViews: number;
  showBadge?: boolean;
}) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    trackEvent("blog_view", { slug, category });

    let cancelled = false;

    async function run() {
      if (wasViewedThisSession(slug)) {
        try {
          const res = await fetch(`/api/blog-views?slug=${encodeURIComponent(slug)}`);
          if (!res.ok) return;
          const data = (await res.json()) as { views?: number };
          if (!cancelled && typeof data.views === "number") setViews(data.views);
        } catch {
          /* keep initial */
        }
        return;
      }

      markViewedThisSession(slug);
      try {
        const res = await fetch("/api/blog-views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as { views?: number };
        if (!cancelled && typeof data.views === "number") setViews(data.views);
      } catch {
        /* keep initial */
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [slug, category]);

  if (!showBadge) return null;
  return <ViewBadge views={views} size="md" />;
}
