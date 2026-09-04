import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { personal } from "@/data/personal";
import {
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  jsonLdScript,
  personJsonLd,
  webPageJsonLd,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  const title = `${project.title} Case Study`;
  const description = project.description;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${title} | ${personal.name}`,
      description,
      url: absoluteUrl(`/work/${project.id}`),
      type: "article",
      images: [{ url: absoluteUrl(project.image) }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const path = `/work/${project.id}`;
  const schemas = [
    personJsonLd(),
    webPageJsonLd({
      path,
      name: `${project.title} Case Study`,
      description: project.description,
    }),
    creativeWorkJsonLd({
      path,
      name: project.title,
      description: project.description,
      image: project.image,
      url: project.url,
      technologies: project.technologies,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Work", path: "/#work" },
      { name: project.title, path },
    ]),
  ];

  return (
    <main id="main">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(schema)}
        />
      ))}

      <PageHero
        eyebrow="Case study"
        title={project.title}
        description={project.description}
      />

      <section className="section-shell border-b border-border">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-border bg-slate-100">
            <Image
              src={project.image}
              alt={`${project.title} website preview by ${personal.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-primary">
              {project.category.replace("-", " ")} · {project.role}
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
              Project overview
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {project.description}
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Contribution
                </dt>
                <dd className="mt-1 text-foreground">{project.contribution}</dd>
              </div>
              {project.type ? (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    Type
                  </dt>
                  <dd className="mt-1 text-foreground">{project.type}</dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.url && project.hasLiveUrl && !project.disabled ? (
                <Button href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit live site
                  <ExternalLink className="size-3.5" aria-hidden />
                </Button>
              ) : null}
              <Button href="/contact" variant="secondary">
                Discuss a similar project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {(project.challenge || project.solution) && (
        <section className="section-shell border-b border-border bg-surface">
          <div className="container-shell grid gap-8 md:grid-cols-2">
            {project.challenge ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Challenge
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.challenge}
                </p>
              </div>
            ) : null}
            {project.solution ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Solution
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.solution}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {project.functionality?.length ? (
        <section className="section-shell border-b border-border">
          <div className="container-shell">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Key features
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.functionality.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {(project.approach || project.result) && (
        <section className="section-shell border-b border-border bg-surface">
          <div className="container-shell grid gap-8 md:grid-cols-2">
            {project.approach ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Approach
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.approach}
                </p>
              </div>
            ) : null}
            {project.result ? (
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Outcome
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.result}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      )}

      <section className="section-shell border-b border-border">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Technology stack
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-primary/15 bg-primary/8 px-2.5 py-1 font-mono text-[11px] text-primary"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Related services
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              <li>
                <Link href="/wordpress-developer" className="text-sm text-primary hover:underline">
                  WordPress Developer
                </Link>
              </li>
              <li>
                <Link href="/shopify-developer" className="text-sm text-primary hover:underline">
                  Shopify Developer
                </Link>
              </li>
              <li>
                <Link href="/full-stack-developer" className="text-sm text-primary hover:underline">
                  Full Stack Developer
                </Link>
              </li>
              <li>
                <Link href="/website-speed-optimization" className="text-sm text-primary hover:underline">
                  Speed Optimization
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell-tight">
        <div className="container-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl tracking-tight">
              Want something similar?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Tell me about your website, store or app—I&apos;ll reply with a
              practical next step.
            </p>
          </div>
          <Button href="/contact" magnetic>
            Hire Me
          </Button>
        </div>
      </section>
    </main>
  );
}
