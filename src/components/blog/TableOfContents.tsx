"use client";

import { useEffect, useId, useState } from "react";
import type { TocHeading } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const panelId = useId();

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <button
        type="button"
        className="blog-toc__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>On this page</span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>

      <div id={panelId} className={cn("blog-toc__panel", open && "is-open")}>
        <p className="blog-toc__title">On this page</p>
        <ol className="blog-toc__list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                "blog-toc__item",
                heading.level === 3 && "blog-toc__item--sub",
              )}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  "blog-toc__link",
                  activeId === heading.id && "is-active",
                )}
                aria-current={activeId === heading.id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
