import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import type { ServiceLanding } from "@/data/service-landings";
import { getServiceLanding } from "@/data/service-landings";
import { projects } from "@/data/projects";
import { personal } from "@/data/personal";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdScript,
  personJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/schema";

export function ServiceLandingView({ landing }: { landing: ServiceLanding }) {
  const relatedServices = landing.relatedSlugs
    .map((slug) => getServiceLanding(slug))
    .filter(Boolean) as ServiceLanding[];
  const relatedProjects = projects.filter((p) =>
    landing.relatedProjectIds.includes(p.id),
  );

  const schemas = [
    personJsonLd(),
    webPageJsonLd({
      path: `/${landing.slug}`,
      name: landing.h1,
      description: landing.metaDescription,
    }),
    serviceJsonLd({
      path: `/${landing.slug}`,
      name: landing.title,
      description: landing.intro,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: landing.title, path: `/${landing.slug}` },
    ]),
    faqPageJsonLd(landing.faqs),
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
        eyebrow={landing.title}
        title={landing.h1}
        description={landing.intro}
      />

      <section className="section-shell border-b border-border bg-surface">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              What I deliver
            </h2>
            <p className="mt-3 text-muted">
              Practical capabilities for {landing.title.toLowerCase()} work with{" "}
              {personal.name}.
            </p>
            <ul className="mt-6 space-y-3">
              {landing.capabilities.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-[0.95rem] leading-relaxed text-foreground before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-border bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Technologies
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {landing.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-primary/15 bg-primary/8 px-2.5 py-1 font-mono text-[11px] text-primary"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-lg font-semibold tracking-tight">
              Problems I solve
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {landing.problems.map((problem) => (
                <li key={problem}>• {problem}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Development process
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {landing.process.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[1.15rem] border border-border bg-white p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {relatedProjects.length ? (
        <section className="section-shell border-b border-border bg-surface">
          <div className="container-shell">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Related work
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Selected projects that demonstrate relevant capabilities. Full
              case notes are available where published.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/work/${project.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-border bg-white transition hover:border-primary/25"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100">
                      <Image
                        src={project.image}
                        alt={`${project.title} website preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-primary">
                        {project.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section-shell border-b border-border">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Why work with me
          </h2>
          <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-muted">
            You work directly with {personal.name}—a Full Stack, WordPress and
            Shopify developer based in {personal.location}. Communication stays
            clear, delivery stays owned end to end, and handoff includes the
            practical details your team needs to keep moving.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" magnetic>
              Discuss Your Project
            </Button>
            <Button href="/services" variant="secondary">
              All services
            </Button>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border bg-surface">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-4">
            {landing.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-[1rem] border border-border bg-white px-5 py-4"
              >
                <summary className="cursor-pointer font-display text-base font-semibold tracking-tight">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {relatedServices.length ? (
        <section className="section-shell border-b border-border">
          <div className="container-shell">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Related services
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section-shell-tight">
        <div className="container-shell flex flex-col items-start justify-between gap-6 rounded-[1.35rem] border border-border-dark bg-dark px-6 py-8 text-white sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Ready to start?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-on-dark-muted">
              Share your requirement for a free estimate, sample design
              direction or demo path when the brief fits.
            </p>
          </div>
          <Button href="/contact" magnetic>
            Request a Quote
          </Button>
        </div>
      </section>
    </main>
  );
}
