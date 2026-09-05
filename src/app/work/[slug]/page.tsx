import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { personal } from "@/data/personal";
import { getCaseStudyExtras } from "@/lib/case-study";
import {
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  faqPageJsonLd,
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

  const extras = getCaseStudyExtras(project);
  const title = extras.seoTitle;

  return {
    title,
    description: extras.metaDescription,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${extras.seoTitle} | ${personal.name}`,
      description: extras.metaDescription,
      url: absoluteUrl(`/work/${project.id}`),
      type: "article",
      images: [
        {
          url: absoluteUrl(project.image),
          alt: `${project.title} website preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: extras.seoTitle,
      description: extras.metaDescription,
      images: [absoluteUrl(project.image)],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const extras = getCaseStudyExtras(project);
  const path = `/work/${project.id}`;
  const relatedProjects = projects
    .filter(
      (p) =>
        p.id !== project.id &&
        p.category === project.category &&
        !p.disabled,
    )
    .slice(0, 3);

  const schemas = [
    personJsonLd(),
    webPageJsonLd({
      path,
      name: `${project.title} Case Study`,
      description: extras.metaDescription,
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
    faqPageJsonLd(extras.faqs),
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
        eyebrow={`${extras.platform} case study`}
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
              {extras.overview}
            </p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Client / brand
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {project.title}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Platform
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {extras.platform}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Contribution
                </dt>
                <dd className="mt-1 text-foreground">{project.contribution}</dd>
              </div>
              {project.type ? (
                <div className="sm:col-span-2">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    Project type
                  </dt>
                  <dd className="mt-1 text-foreground">{project.type}</dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {project.url && project.hasLiveUrl && !project.disabled ? (
                <Button
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  magnetic
                >
                  Visit live site
                  <ExternalLink className="size-3.5" aria-hidden />
                </Button>
              ) : null}
              <Button
                href="/contact"
                variant="dark"
                magnetic
                className="border-border bg-white text-foreground shadow-sm hover:border-primary hover:text-primary"
              >
                Discuss a similar project
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border bg-surface">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Project requirements
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              What this engagement needed to deliver for {project.title}.
            </p>
            <ul className="mt-5 space-y-3">
              {extras.requirements.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-[0.95rem] leading-relaxed text-foreground before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Technology stack
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Tools and platforms used on this project.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-primary/15 bg-primary/8 px-2.5 py-1.5 font-mono text-[11px] text-primary"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-border bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Challenges
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {extras.challenge}
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-border bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Solution
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {extras.solution}
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border bg-surface">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Development work
          </h2>
          <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-muted">
            Concrete delivery by {personal.name} on {project.title}—without
            invented metrics or unverified results.
          </p>
          <ul className="mt-6 space-y-3">
            {extras.developmentWork.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-white px-4 py-3 text-[0.95rem] leading-relaxed text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
          {extras.approach ? (
            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                Approach
              </h3>
              <p className="mt-2 max-w-3xl text-[0.95rem] leading-relaxed text-muted">
                {extras.approach}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-shell border-b border-border">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">
              Responsive implementation
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {extras.responsiveWork}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">
              Performance considerations
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {extras.performanceWork}
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border bg-surface">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Key features
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {extras.features.map((item) => (
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

      <section className="section-shell border-b border-border">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Outcome
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {extras.outcome}
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
              {personal.name} is a Full Stack, WordPress and Shopify Developer.
              This case study shows real {extras.platform} delivery for{" "}
              {project.title}.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-border bg-slate-100">
            <Image
              src={project.imageMobile ?? project.image}
              alt={`${project.title} screenshot — ${extras.platform} work by ${personal.name}`}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border bg-surface">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Related services
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            If you need similar work, these service pages explain capabilities,
            process and FAQs.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {extras.relatedServices.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  {service.label}
                  <ArrowUpRight
                    className="size-4 shrink-0 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedProjects.length ? (
        <section className="section-shell border-b border-border">
          <div className="container-shell">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              More {extras.platform} work
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {relatedProjects.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/work/${item.id}`}
                    className="group block overflow-hidden rounded-[1.15rem] border border-border bg-white transition hover:border-primary/30"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100">
                      <Image
                        src={item.image}
                        alt={`${item.title} case study`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-display font-semibold tracking-tight group-hover:text-primary">
                        {item.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section-shell border-b border-border bg-surface" id="faq">
        <div className="container-shell max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-6">
            {extras.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-display text-lg font-semibold tracking-tight">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-shell-tight">
        <div className="container-shell flex flex-col gap-6 rounded-[1.35rem] border border-border bg-white p-6 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-2xl tracking-tight">
              Want something similar?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Discuss a similar {extras.platform.toLowerCase()} project with{" "}
              {personal.name}—WordPress, Shopify or full-stack delivery with
              clear handoff.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/contact" magnetic className="justify-center">
              Discuss a similar project
            </Button>
            <Button
              href="/services"
              variant="dark"
              className="justify-center border-border bg-background text-foreground hover:border-primary hover:text-primary"
            >
              All services
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
