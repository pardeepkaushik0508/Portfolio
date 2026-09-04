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

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const items = [...TECH_ITEMS, ...TECH_ITEMS];
  return (
    <div
      className={
        reverse ? "tech-marquee__track tech-marquee__track--reverse" : "tech-marquee__track"
      }
      aria-hidden
    >
      {items.map((label, i) => (
        <span key={`${label}-${i}`} className="tech-marquee__item">
          <span className="tech-marquee__dot" />
          {label}
        </span>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="tech-marquee" role="presentation">
      <div className="tech-marquee__fade tech-marquee__fade--left" aria-hidden />
      <div className="tech-marquee__fade tech-marquee__fade--right" aria-hidden />
      <div className="tech-marquee__viewport">
        <MarqueeTrack />
      </div>
    </div>
  );
}
