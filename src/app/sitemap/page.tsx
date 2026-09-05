import type { Metadata } from "next";
import Link from "next/link";
import { personal, seo } from "@/data/personal";
import { projects } from "@/data/projects";
import { getServiceLanding } from "@/data/service-landings";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sitemap | Site Index & Portfolio Sections",
  description: `Complete sitemap for ${personal.name} — full stack, WordPress and Shopify developer. Browse global services, India pages, portfolio, company and resources.`,
  alternates: { canonical: "/sitemap" },
  openGraph: {
    title: `Sitemap — ${personal.name}`,
    description: `Navigate all sections of ${personal.name}'s portfolio: projects, services, about, experience and contact.`,
    url: absoluteUrl("/sitemap"),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const GLOBAL_DEV = [
  "wordpress-developer",
  "shopify-developer",
  "full-stack-developer",
  "remote-web-developer",
  "saas-mvp-development",
] as const;

const SPECIALIST = [
  "elementor-developer",
  "woocommerce-developer",
  "shopify-liquid-developer",
  "shopify-theme-development",
  "wordpress-website-design",
  "wordpress-speed-optimization",
  "shopify-speed-optimization",
  "website-speed-optimization",
  "wordpress-migration",
  "api-integration",
  "figma-to-wordpress",
  "figma-to-shopify",
] as const;

const INDIA = [
  "wordpress-developer-india",
  "shopify-developer-india",
  "full-stack-developer-india",
  "web-developer-india",
] as const;

const COMPANY = [
  { href: "/", label: "Home", blurb: "Global introduction and availability" },
  { href: "/about", label: "About", blurb: "Background, skills and approach" },
  { href: "/experience", label: "Experience", blurb: "Professional experience and roles" },
  { href: "/process", label: "Process", blurb: "How projects are planned and delivered" },
  { href: "/reviews", label: "Reviews", blurb: "Client feedback from Upwork and LinkedIn" },
  { href: "/pricing", label: "Pricing", blurb: "WordPress, Shopify and Full Stack packages" },
  { href: "/contact", label: "Contact", blurb: "Start a project enquiry" },
  { href: "/services", label: "Services hub", blurb: "All development services overview" },
] as const;

const RESOURCES = [
  {
    href: "/blog",
    label: "Blog",
    blurb: "Web development articles and hiring guides",
  },
  {
    href: "/feed.xml",
    label: "RSS feed",
    blurb: "Subscribe to new articles",
  },
  {
    href: "/#faq",
    label: "FAQ",
    blurb: "Common questions about delivery and speed work",
  },
] as const;

function ServiceLinkList({ slugs }: { slugs: readonly string[] }) {
  const unique = [...new Set(slugs)];
  return (
    <ul className="mt-4 space-y-3">
      {unique.map((slug) => {
        const landing = getServiceLanding(slug);
        if (!landing) return null;
        return (
          <li key={slug}>
            <Link
              href={`/${slug}`}
              className="group block rounded-lg border border-border bg-surface px-4 py-3 transition hover:border-primary/35"
            >
              <span className="font-medium text-foreground group-hover:text-primary">
                {landing.title}
              </span>
              <span className="mt-0.5 block text-sm text-muted line-clamp-2">
                {landing.metaDescription}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SimpleLinkList({
  items,
}: {
  items: readonly { href: string; label: string; blurb: string }[];
}) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group block rounded-lg border border-border bg-surface px-4 py-3 transition hover:border-primary/35"
          >
            <span className="font-medium text-foreground group-hover:text-primary">
              {item.label}
            </span>
            <span className="mt-0.5 block text-sm text-muted">{item.blurb}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SitemapPage() {
  const siteUrl = getSiteUrl();
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sitemap",
        item: `${siteUrl}/sitemap`,
      },
    ],
  };

  return (
    <main id="main" className="bg-background pt-[var(--header-h)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="section-shell">
        <div className="container-shell max-w-4xl">
          <p className="eyebrow">Sitemap</p>
          <h1 className="section-heading mt-4">
            Explore {personal.name}&apos;s portfolio
          </h1>
          <p className="section-lead mt-4">
            {seo.description} Use this index to jump to global services, India
            pages, portfolio and company resources.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Global development services
              </h2>
              <ServiceLinkList slugs={GLOBAL_DEV} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Specialist services
              </h2>
              <ServiceLinkList slugs={SPECIALIST} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                India services
              </h2>
              <ServiceLinkList slugs={INDIA} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Company
              </h2>
              <SimpleLinkList items={COMPANY} />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              Portfolio
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/work/${project.id}`}
                    className="group block rounded-lg border border-border bg-surface px-4 py-3 transition hover:border-primary/35"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {project.type ?? project.category} ·{" "}
                      {project.technologies.slice(0, 3).join(", ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-lg font-semibold tracking-tight text-foreground">
              More client work
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/work/${project.id}`}
                    className="group block rounded-lg border border-border bg-surface px-4 py-3 transition hover:border-primary/35"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block text-sm capitalize text-muted">
                      {project.category.replace("-", " ")} · {project.role}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 max-w-xl">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              Resources / Blog
            </h2>
            <SimpleLinkList items={RESOURCES} />
          </div>

          <p className="mt-12 text-sm text-muted">
            Machine-readable sitemap:{" "}
            <a
              href="/sitemap.xml"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              /sitemap.xml
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
