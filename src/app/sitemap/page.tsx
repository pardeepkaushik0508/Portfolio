import type { Metadata } from "next";
import Link from "next/link";
import { navItems, personal, seo } from "@/data/personal";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sitemap | Site Index & Portfolio Sections",
  description: `Complete sitemap for ${personal.name} — full stack developer in ${personal.location}. Browse work, services, experience, process and contact pages.`,
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

const sectionLinks = [
  { href: "/#home", label: "Home", blurb: "Introduction and availability" },
  ...navItems.map((item) => ({
    href: `/${item.href}`,
    label: item.label,
    blurb:
      item.label === "Work"
        ? "Featured case studies and client projects"
        : item.label === "Services"
          ? "Full-stack, WordPress, Shopify and redesign"
          : item.label === "About"
            ? "Background, skills and approach"
            : item.label === "Experience"
              ? "Professional experience and roles"
              : item.label === "Process"
                ? "How projects are planned and delivered"
                : "Start a project enquiry",
  })),
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
    href: "/#testimonials",
    label: "Testimonials",
    blurb: "Client feedback and outcomes",
  },
  {
    href: "/#more-projects",
    label: "More Projects",
    blurb: "WordPress, Shopify and WooCommerce work",
  },
];

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
            {seo.description} Use this index to jump to any section, service or
            project.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Main sections
              </h2>
              <ul className="mt-4 space-y-3">
                {sectionLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group block rounded-lg border border-border bg-surface px-4 py-3 transition hover:border-primary/35"
                    >
                      <span className="font-medium text-foreground group-hover:text-primary">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {item.blurb}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Services
              </h2>
              <ul className="mt-4 space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href="/#services"
                      className="group block rounded-lg border border-border bg-surface px-4 py-3 transition hover:border-primary/35"
                    >
                      <span className="font-medium text-foreground group-hover:text-primary">
                        {service.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {service.outcome}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              Featured projects
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/#case-${project.id}`}
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
          </div>

          <div className="mt-12">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              More client work
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.url ?? "/#more-projects"}
                    target={project.url ? "_blank" : undefined}
                    rel={project.url ? "noopener noreferrer" : undefined}
                    className="group block rounded-lg border border-border bg-surface px-4 py-3 transition hover:border-primary/35"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block text-sm capitalize text-muted">
                      {project.category.replace("-", " ")} · {project.role}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
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
