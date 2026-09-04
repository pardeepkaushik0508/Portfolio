"use client";

const TECH_ITEMS = [
  "WordPress",
  "Shopify",
  "WooCommerce",
  "Next.js",
  "React",
  "Node.js",
  "Elementor",
  "Core Web Vitals",
  "Speed Optimization",
  "Laravel",
  "TypeScript",
  "MongoDB",
] as const;

/** Decorative infinite track — not exposed to AT / intended for visual loop only. */
function MarqueeTrack() {
  // Two sequences required for seamless CSS loop; entire track is aria-hidden.
  const items = [...TECH_ITEMS, ...TECH_ITEMS];
  return (
    <div className="tech-marquee__track" aria-hidden="true">
      {items.map((label, i) => (
        <span key={`${label}-${i}`} className="tech-marquee__item">
          <span className="tech-marquee__dot" aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="tech-marquee">
      {/* Single semantic technology list for crawlers / screen readers */}
      <p className="sr-only">
        Technologies: {TECH_ITEMS.join(", ")}
      </p>
      <div className="tech-marquee__fade tech-marquee__fade--left" aria-hidden="true" />
      <div className="tech-marquee__fade tech-marquee__fade--right" aria-hidden="true" />
      <div className="tech-marquee__viewport" aria-hidden="true">
        <MarqueeTrack />
      </div>
    </div>
  );
}
