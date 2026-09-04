"use client";

import { Eye } from "lucide-react";
import { formatViewCount } from "@/lib/blog-views-format";
import { cn } from "@/lib/utils";

export function ViewBadge({
  views,
  className,
  size = "sm",
}: {
  views: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const label = `${views.toLocaleString("en-US")} views`;

  return (
    <span
      className={cn(
        "blog-view-badge",
        size === "md" && "blog-view-badge--md",
        className,
      )}
      title={label}
      aria-label={label}
    >
      <Eye className="blog-view-badge__icon" aria-hidden />
      <span>{formatViewCount(views)}</span>
      <span className="blog-view-badge__label">views</span>
    </span>
  );
}
