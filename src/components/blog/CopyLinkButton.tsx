"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("blog_cta_click", { location: "article", action: "copy_link" });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="blog-copy-link" onClick={copy}>
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
