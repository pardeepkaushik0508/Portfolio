"use client";

import { useEffect, useState } from "react";

export function useBlogViewsMap(slugs: string[]) {
  const [views, setViews] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/blog-views");
        if (!res.ok) return;
        const data = (await res.json()) as { views?: Record<string, number> };
        if (cancelled || !data.views) return;
        setViews(data.views);
      } catch {
        /* ignore */
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [slugs.join("|")]);

  return views;
}
