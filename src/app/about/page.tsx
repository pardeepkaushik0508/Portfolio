import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SocialConnectSection } from "@/components/sections/SocialConnectSection";
import { Button } from "@/components/ui/Button";
import { personal, seo } from "@/data/personal";
import { projects } from "@/data/projects";
import { getAllServiceSlugs, getServiceLanding } from "@/data/service-landings";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdScript,
  personJsonLd,
  profilePageJsonLd,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Pardeep Kaushik — Full Stack, WordPress & Shopify Developer",
  description: `${personal.aboutIntro} Verified GitHub, LinkedIn and Upwork profiles linked below.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Pardeep Kaushik — Full Stack, WordPress & Shopify Developer`,
    description: personal.aboutIntro,
    url: absoluteUrl("/about"),
    type: "profile",
  },
};

const aboutFaqs = [
  {
    question: "Who is Pardeep Kaushik?",
    answer:
      "Pardeep Kaushik is a Full Stack, WordPress and Shopify developer based in Chandigarh, India, with 5+ years of experience building business websites, ecommerce stores and custom web applications for clients worldwide.",
  },
  {
    question: "Is Pardeep Kaushik a full stack developer?",
    answer:
      "Yes. He works across frontend and backend—UI, APIs, databases and deployment—and also delivers WordPress and Shopify projects when those platforms fit.",
  },
  {
    question: "Does Pardeep work with international clients?",
    answer:
      "Yes. He works remotely with businesses and agencies worldwide via email, WhatsApp, LinkedIn and Upwork.",
  },
  {
    question: "What technologies does Pardeep Kaushik work with?",
    answer:
      "WordPress, Elementor, WooCommerce, Shopify Liquid, React, Next.js, Node.js, PHP, MongoDB, PostgreSQL, REST APIs, Nginx and VPS deployment.",
  },
  {
    question: "How can I hire Pardeep Kaushik?",
    answer:
      "Use the contact form, email, phone or WhatsApp on this website, or reach out via LinkedIn or Upwork using the verified profile links on this page.",
  },
];

export default function AboutPage() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const serviceLinks = getAllServiceSlugs()
    .map((slug) => getServiceLanding(slug))
    .filter(Boolean);

  const schemas = [
    personJsonLd(),
    profilePageJsonLd({
      path: "/about",
      name: "About Pardeep Kaushik — Full Stack, WordPress & Shopify Developer",
      description: personal.aboutIntro,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
    faqPageJsonLd(aboutFaqs),
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
        eyebrow="About"
        title="About Pardeep Kaushik — Full Stack, WordPress & Shopify Developer"
        description={seo.entityStatement}
      />

      <AboutSection showHeading={false} />

      <section className="section-shell border-t border-border bg-surface">
        <div className="container-shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Who I Am
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
              Pardeep Kaushik is a Full Stack, WordPress and Shopify Developer.
              Clients hire me when they need a clear build plan, maintainable
              code and a site that works on mobile and desktop—not just a
              design mockup.
            </p>
            <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">
              Professional Experience
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {personal.experienceYears} years delivering WordPress websites,
              Shopify stores, WooCommerce shops and full-stack products. See the{" "}
              <Link href="/experience" className="text-primary underline-offset-2 hover:underline">
                experience timeline
              </Link>{" "}
              for role-level detail.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              WordPress & Shopify Experience
            </h2>
            <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-muted">
              <li>
                <strong className="text-foreground">WordPress:</strong> business
                sites, Elementor layouts, WooCommerce stores, redesigns,
                migrations and speed work.
              </li>
              <li>
                <strong className="text-foreground">Shopify:</strong> Shopify 2.0
                themes, Liquid sections, store setup, redesigns and performance
                fixes.
              </li>
              <li>
                <strong className="text-foreground">Full stack:</strong> React,
                Next.js and Node.js for custom dashboards, portals and API-backed
                products.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <SkillsSection />

      <section className="section-shell border-t border-border">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Selected Projects
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Crawlable case studies from real client work already published on
            this site.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {featured.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/work/${project.id}`}
                  className="block rounded-[1.15rem] border border-border bg-white p-5 transition hover:border-primary/30"
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {project.title}
                  </span>
                  <span className="mt-2 block text-sm text-muted">
                    {project.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Browse all work on the{" "}
            <Link href="/#work" className="text-primary underline-offset-2 hover:underline">
              homepage portfolio
            </Link>{" "}
            or open individual{" "}
            <Link href="/sitemap" className="text-primary underline-offset-2 hover:underline">
              case study URLs
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-shell border-t border-border bg-surface">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Industries & Types of Businesses
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
              Product brands, service businesses, property and real-estate
              sites, SaaS-style tools and content-led companies that need a
              WordPress, Shopify or custom web application.
            </p>
            <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">
              My Development Process
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              Discovery, scoped delivery, staging review and handoff. Details
              live on the{" "}
              <Link href="/process" className="text-primary underline-offset-2 hover:underline">
                process page
              </Link>
              .
            </p>
            <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">
              Performance & Responsive Development
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              Layouts are checked across phone, tablet and desktop. Speed work
              focuses on Core Web Vitals without rewriting your visual design.
              See{" "}
              <Link
                href="/website-speed-optimization"
                className="text-primary underline-offset-2 hover:underline"
              >
                website speed optimization
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Service Focus Areas
            </h2>
            <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
              {serviceLinks.map((landing) =>
                landing ? (
                  <li key={landing.slug} className="mb-2 break-inside-avoid">
                    <Link
                      href={`/${landing.slug}`}
                      className="text-[0.95rem] text-primary underline-offset-2 hover:underline"
                    >
                      {landing.title}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-border" id="profiles">
        <div className="container-shell">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Professional Profiles
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Verified profiles already linked from this website. Do not invent
            extra social URLs beyond these.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <a
                href="https://pardeepkaushik.info/"
                className="block rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium hover:border-primary/35"
              >
                Website — pardeepkaushik.info
              </a>
            </li>
            <li>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium hover:border-primary/35"
              >
                GitHub — pardeepkaushik0508
              </a>
            </li>
            <li>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium hover:border-primary/35"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={personal.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium hover:border-primary/35"
              >
                Upwork
              </a>
            </li>
            <li>
              <a
                href={`mailto:${personal.email}`}
                className="block rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium hover:border-primary/35"
              >
                Email — {personal.email}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="section-shell border-t border-border bg-surface" id="about-faq">
        <div className="container-shell max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <dl className="mt-8 space-y-6">
            {aboutFaqs.map((item) => (
              <div key={item.question}>
                <dt className="font-display text-lg font-semibold tracking-tight">
                  {item.question}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <TestimonialsSection />

      <SocialConnectSection
        eyebrow="Hire me"
        title="Discuss your WordPress, Shopify or full-stack project."
        description="Message on LinkedIn, hire via Upwork, or reach me by phone and WhatsApp for a faster conversation."
      />

      <section className="section-shell-tight border-t border-border">
        <div className="container-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl tracking-tight">
              Contact / Hire Me
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Share goals, stack preferences and timeline—I&apos;ll reply with a
              practical plan.
            </p>
          </div>
          <Button href="/contact" magnetic>
            Contact Me
          </Button>
        </div>
      </section>
    </main>
  );
}
