"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeadline";

const pillars = [
  {
    id: "wordpress",
    number: "01",
    title: "WordPress & WooCommerce",
    blurb:
      "Business sites, Elementor builds and online stores that stay easy to manage.",
    image: "/images/showcase/wordpress-lumiere.png",
    href: "/services",
  },
  {
    id: "shopify",
    number: "02",
    title: "Shopify storefronts",
    blurb:
      "Product pages, collections and theme work built to convert on mobile and desktop.",
    image: "/images/showcase/shopify-store.png",
    href: "/services",
  },
  {
    id: "speed",
    number: "03",
    title: "Speed & Core Web Vitals",
    blurb:
      "Caching, images, CDN and PageSpeed fixes — without changing your layout.",
    image: "/images/showcase/wordpress-theme.png",
    href: "/services",
  },
  {
    id: "fullstack",
    number: "04",
    title: "Full-stack apps",
    blurb:
      "React, Next.js and Node.js when a custom product fits better than a CMS.",
    image: "/images/showcase/shopify-theme-ui.png",
    href: "/services",
  },
];

/** Jasmine-style “pillars” strip — who you hire me for, with real mockups. */
export function PillarsSection() {
  return (
    <section
      id="pillars"
      className="section-shell border-t border-border bg-background"
    >
      <div className="container-shell">
        <Reveal variant="fade-up">
          <p className="eyebrow">What I build</p>
          <TypedHeading
            text="Four ways I help businesses ship."
            className="section-heading mt-4"
          />
          <p className="section-lead">
            Clear delivery areas — so you know whether you need a store, a CMS
            site, speed work, or a custom app.
          </p>
        </Reveal>

        <Stagger
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4"
          stagger={0.08}
        >
          {pillars.map((item) => (
            <StaggerItem key={item.id} variant="fade-up">
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_48px_rgba(12,18,16,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={item.image}
                    alt={`${item.title} example mockup`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-dark/85 px-2 py-1 font-mono text-[11px] text-white">
                    {item.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {item.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View services
                    <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
