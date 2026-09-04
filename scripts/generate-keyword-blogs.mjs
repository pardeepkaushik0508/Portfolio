/**
 * Generates SEO blog MDX posts from high-intent keyword clusters.
 * Run: node scripts/generate-keyword-blogs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "content", "blog");

const posts = [
  // Website / WordPress cluster
  ["create-website-for-business", "How to Create a Website for Your Business", "create website", "website-growth", ["website development", "business website", "website builder"]],
  ["website-builder-vs-custom-development", "Website Builder vs Custom Website Development", "website builder", "website-growth", ["create website", "website development", "business website"]],
  ["wordpress-website-development-guide", "WordPress Website Development Guide for Growing Brands", "wordpress website development", "wordpress-woocommerce", ["wordpress website", "wordpress developer", "build wordpress website"]],
  ["website-development-process", "Website Development Process: From Brief to Launch", "website development", "website-growth", ["create website", "business website", "website redesign"]],
  ["wordpress-website-design-best-practices", "WordPress Website Design Best Practices That Convert", "wordpress website design", "wordpress-woocommerce", ["wordpress design", "elementor website design", "wordpress website"]],
  ["build-wordpress-website-checklist", "Build a WordPress Website: Practical Checklist", "build wordpress website", "wordpress-woocommerce", ["wordpress website development", "wordpress", "wordpress website"]],
  ["what-is-wordpress-for-business", "What Is WordPress? A Business Owner’s Guide", "wordpress", "wordpress-woocommerce", ["wordpress website", "wordpress developer", "wordpress website design"]],
  ["wordpress-website-cost-and-scope", "WordPress Website Scope, Timeline and Cost Factors", "wordpress website", "wordpress-woocommerce", ["wordpress website development", "build wordpress website", "business website"]],
  ["wordpress-developer-skills-checklist", "WordPress Developer Skills Checklist Before You Hire", "wordpress developer", "wordpress-woocommerce", ["hire wordpress developer", "wordpress website development", "fix wordpress"]],
  ["wordpress-website-redesign-playbook", "WordPress Website Redesign Playbook", "wordpress website redesign", "wordpress-woocommerce", ["website redesign", "wordpress design", "wordpress website design"]],
  ["website-redesign-when-and-why", "Website Redesign: When to Refresh and What to Keep", "website redesign", "website-growth", ["wordpress website redesign", "business website", "website speed optimization"]],
  ["ecommerce-website-platform-choices", "Ecommerce Website Platform Choices for SMB Brands", "ecommerce website", "shopify-ecommerce", ["woocommerce website", "shopify store", "shopify ecommerce website"]],
  ["wordpress-design-for-service-businesses", "WordPress Design for Service Businesses", "wordpress design", "wordpress-woocommerce", ["wordpress website design", "elementor website design", "business website"]],
  ["elementor-website-design-guide", "Elementor Website Design Guide Without Slow Pages", "elementor website design", "wordpress-woocommerce", ["wordpress website design", "wordpress design", "wordpress speed optimization"]],
  ["business-website-must-have-pages", "Business Website Must-Have Pages and CTAs", "business website", "website-growth", ["create website", "website development", "wordpress website"]],
  ["medical-website-compliance-basics", "Medical Website Basics: Trust, Clarity and Speed", "medical website", "website-growth", ["business website", "wordpress website design", "website speed optimization"]],
  ["amazon-affiliate-website-structure", "Amazon Affiliate Website Structure That Stays Maintainable", "amazon affiliate", "website-growth", ["wordpress website", "create website", "website builder"]],
  ["autopilot-amazon-affiliate-website-risks", "Autopilot Amazon Affiliate Website: What Actually Works", "autopilot amazon affiliate website", "website-growth", ["amazon affiliate", "wordpress website", "website development"]],
  // Fix cluster
  ["fix-wordpress-site-safely", "How to Fix a WordPress Site Safely", "fix wordpress", "wordpress-woocommerce", ["fix wordpress issues", "wordpress developer", "wordpress speed optimization"]],
  ["woocommerce-fix-common-errors", "WooCommerce Fix: Common Checkout and Cart Errors", "woocommerce fix", "wordpress-woocommerce", ["woocommerce", "woocommerce website", "ecommerce website"]],
  ["shopify-bugs-troubleshooting", "Shopify Bugs: A Practical Troubleshooting Guide", "shopify bugs", "shopify-ecommerce", ["shopify", "shopify store", "shopify website development"]],
  ["fix-wordpress-issues-checklist", "Fix WordPress Issues Checklist for Site Owners", "fix wordpress issues", "wordpress-woocommerce", ["fix wordpress", "wordpress security", "wordpress speed optimization"]],
  // Software / full-stack
  ["software-developer-for-business-products", "When to Hire a Software Developer for Business Products", "software developer", "full-stack-development", ["web app development", "saas developer", "next js developer"]],
  ["web-app-vs-website", "Web App vs Website: Which Do You Need?", "web app", "full-stack-development", ["web app development", "create website", "saas"]],
  ["front-end-developer-responsibilities", "Front End Developer Responsibilities on Modern Teams", "front end developer", "full-stack-development", ["react", "next js developer", "html"]],
  ["next-js-developer-hiring-guide", "Next.js Developer Hiring Guide for Product Teams", "next js developer", "full-stack-development", ["react", "web app development", "saas mvp"]],
  ["saas-product-website-and-app", "SaaS Products: Marketing Site Plus App Architecture", "saas", "full-stack-development", ["saas developer", "saas mvp", "web app"]],
  ["saas-developer-skills", "SaaS Developer Skills That Reduce Launch Risk", "saas developer", "full-stack-development", ["saas", "saas mvp", "next js developer"]],
  ["erp-integration-for-websites", "ERP Integration for Websites and Customer Portals", "erp", "full-stack-development", ["erpnext", "crm", "web app development"]],
  ["odoo-vs-custom-web-app", "Odoo vs Custom Web App: Decision Framework", "odoo", "full-stack-development", ["erp", "erpnext", "software developer"]],
  ["php-laravel-developer-projects", "PHP Laravel Developer Projects That Fit Business Ops", "php laravel developer", "full-stack-development", ["laravel", "php", "web app"]],
  ["laravel-for-business-portals", "Laravel for Business Portals and Admin Tools", "laravel", "full-stack-development", ["php laravel developer", "php", "crm"]],
  ["mern-stack-developer-guide", "MERN Stack Developer Guide for Startup MVPs", "mern stack developer", "full-stack-development", ["react", "node js", "saas mvp"]],
  ["saas-mvp-scope", "SaaS MVP Scope: What to Build First", "saas mvp", "full-stack-development", ["saas", "saas developer", "web app development"]],
  ["react-for-business-interfaces", "React for Business Interfaces and Dashboards", "react", "full-stack-development", ["front end developer", "next js developer", "web app"]],
  ["web-app-development-roadmap", "Web App Development Roadmap for Founders", "web app development", "full-stack-development", ["web app", "software developer", "saas mvp"]],
  ["crm-website-integration", "CRM Website Integration Patterns That Stick", "crm", "full-stack-development", ["web app", "erp", "business website"]],
  ["node-js-apis-for-products", "Node.js APIs for Product Teams", "node js", "full-stack-development", ["mern stack developer", "web app development", "saas"]],
  ["html-foundations-for-fast-sites", "HTML Foundations Still Matter for Fast Sites", "html", "full-stack-development", ["front end developer", "website speed optimization", "create website"]],
  ["software-delivery-for-smb", "Software Delivery Practices for SMB Teams", "software", "full-stack-development", ["software developer", "web app development", "saas"]],
  ["erpnext-website-portals", "ERPNext and Customer-Facing Website Portals", "erpnext", "full-stack-development", ["erp", "odoo", "crm"]],
  ["php-website-maintenance", "PHP Website Maintenance Without Chaos", "php", "full-stack-development", ["php laravel developer", "wordpress", "fix wordpress"]],
  // Shopify cluster
  ["shopify-website-design-principles", "Shopify Website Design Principles That Sell", "shopify website design", "shopify-ecommerce", ["shopify store design", "shopify design", "shopify ecommerce website"]],
  ["shopify-store-design-checklist", "Shopify Store Design Checklist", "shopify store design", "shopify-ecommerce", ["shopify website design", "shopify store", "shopify redesign"]],
  ["shopify-store-setup-basics", "Shopify Store Setup Basics for First-Time Sellers", "shopify store", "shopify-ecommerce", ["build shopify store", "shopify store setup", "create shopify store"]],
  ["dropshipping-store-requirements", "Dropshipping Store Requirements Beyond Theme Picks", "dropshipping", "shopify-ecommerce", ["shopify dropshipping", "shopify dropshipping store", "shopify store"]],
  ["shopify-platform-overview", "Shopify Platform Overview for Growing Brands", "shopify", "shopify-ecommerce", ["shopify expert", "shopify website", "shopify website development"]],
  ["shopify-dropshipping-playbook", "Shopify Dropshipping Playbook for Clean Operations", "shopify dropshipping", "shopify-ecommerce", ["dropshipping", "shopify store", "shopify dropshipping store"]],
  ["shopify-website-development-scope", "Shopify Website Development Scope and Deliverables", "shopify website development", "shopify-ecommerce", ["shopify website", "shopify ecommerce website development", "shopify expert"]],
  ["shopify-website-features", "Shopify Website Features Buyers Expect", "shopify website", "shopify-ecommerce", ["shopify website design", "shopify store", "ecommerce website"]],
  ["build-shopify-store-steps", "Build a Shopify Store in Clear Steps", "build shopify store", "shopify-ecommerce", ["create shopify store", "shopify store setup", "shopify store"]],
  ["build-shopify-website-guide", "Build a Shopify Website Guide for Product Brands", "build shopify website", "shopify-ecommerce", ["shopify website development", "shopify website design", "shopify"]],
  ["shopify-store-setup-checklist", "Shopify Store Setup Checklist Before Launch", "shopify store setup", "shopify-ecommerce", ["build shopify store", "create shopify store", "shopify store"]],
  ["shopify-dropshipping-store-design", "Shopify Dropshipping Store Design Without Clutter", "shopify dropshipping store", "shopify-ecommerce", ["shopify dropshipping", "dropshipping", "shopify store design"]],
  ["create-shopify-store-mistakes", "Create a Shopify Store: Mistakes to Avoid", "create shopify store", "shopify-ecommerce", ["build shopify store", "shopify store setup", "shopify"]],
  ["shopify-ecommerce-website-development", "Shopify Ecommerce Website Development Guide", "shopify ecommerce website development", "shopify-ecommerce", ["shopify website development", "ecommerce website", "shopify ecommerce website"]],
  ["ecommerce-growth-after-launch", "Ecommerce Growth After Launch: Site Priorities", "ecommerce", "shopify-ecommerce", ["ecommerce website", "shopify store", "woocommerce website"]],
  ["shopify-expert-when-to-hire", "Shopify Expert: When to Hire vs DIY", "shopify expert", "shopify-ecommerce", ["shopify website development", "shopify redesign", "shopify bugs"]],
  ["shopify-redesign-plan", "Shopify Redesign Plan for Conversion Gains", "shopify redesign", "shopify-ecommerce", ["shopify design", "shopify website design", "shopify store design"]],
  ["shopify-design-system-basics", "Shopify Design System Basics for Themes", "shopify design", "shopify-ecommerce", ["shopify website design", "shopify store design", "shopify redesign"]],
  ["shopify-ecommerce-website-checklist", "Shopify Ecommerce Website Launch Checklist", "shopify ecommerce website", "shopify-ecommerce", ["shopify website", "ecommerce website", "shopify store"]],
  // WooCommerce
  ["woocommerce-website-guide", "WooCommerce Website Guide for Catalog Brands", "woocommerce website", "wordpress-woocommerce", ["woocommerce", "ecommerce website", "wordpress website development"]],
  ["woocommerce-peptide-website-notes", "WooCommerce Peptide Website Notes for Compliance-Aware Stores", "woocommerce peptide website", "wordpress-woocommerce", ["peptide website", "woocommerce website", "ecommerce website"]],
  ["woocommerce-basics-for-owners", "WooCommerce Basics for Store Owners", "woocommerce", "wordpress-woocommerce", ["woocommerce website", "woocommerce fix", "ecommerce website"]],
  ["peptide-website-considerations", "Peptide Website Considerations for Ecommerce", "peptide website", "website-growth", ["ecommerce website", "woocommerce peptide website", "medical website"]],
  // Speed
  ["shopify-speed-optimization-guide", "Shopify Speed Optimization Guide", "shopify speed optimization", "shopify-ecommerce", ["shopify speed", "website speed optimization", "shopify"]],
  ["shopify-speed-improvements", "Shopify Speed Improvements That Move Metrics", "shopify speed", "shopify-ecommerce", ["shopify speed optimization", "shopify website", "shopify bugs"]],
  ["wordpress-speed-optimization-2026", "WordPress Speed Optimization in 2026", "wordpress speed optimization", "wordpress-woocommerce", ["website speed optimization", "fix wordpress", "core web vitals"]],
  ["website-speed-optimization-checklist", "Website Speed Optimization Checklist", "website speed optimization", "website-growth", ["wordpress speed optimization", "shopify speed optimization", "core web vitals"]],
  // Extra high-intent fillers to reach ~100
  ["hire-wordpress-developer-for-redesign", "Hire a WordPress Developer for Redesign Projects", "wordpress website redesign", "wordpress-woocommerce", ["wordpress developer", "website redesign", "wordpress website design"]],
  ["ecommerce-website-development-options", "Ecommerce Website Development Options Compared", "ecommerce website", "shopify-ecommerce", ["shopify ecommerce website development", "woocommerce website", "shopify store"]],
  ["business-website-development-brief", "How to Write a Business Website Development Brief", "business website", "website-growth", ["website development", "create website", "wordpress website"]],
  ["next-js-web-app-seo", "Next.js Web App SEO Fundamentals", "next js developer", "full-stack-development", ["web app", "react", "website speed optimization"]],
  ["saas-mvp-with-nextjs", "Build a SaaS MVP with Next.js", "saas mvp", "full-stack-development", ["saas", "next js developer", "web app development"]],
  ["front-end-developer-portfolio-signals", "Front End Developer Portfolio Signals Clients Trust", "front end developer", "full-stack-development", ["react", "html", "website design"]],
  ["shopify-store-conversion-basics", "Shopify Store Conversion Basics", "shopify store", "shopify-ecommerce", ["shopify website design", "shopify store design", "ecommerce"]],
  ["woocommerce-website-vs-shopify-store", "WooCommerce Website vs Shopify Store", "woocommerce website", "wordpress-woocommerce", ["shopify store", "ecommerce website", "wordpress"]],
  ["fix-wordpress-after-plugin-updates", "Fix WordPress After Plugin Updates", "fix wordpress issues", "wordpress-woocommerce", ["fix wordpress", "wordpress developer", "wordpress speed optimization"]],
  ["create-website-with-wordpress", "Create a Website with WordPress Step by Step", "create website", "wordpress-woocommerce", ["build wordpress website", "wordpress website development", "wordpress"]],
  ["website-builder-limitations", "Website Builder Limitations for Growing Brands", "website builder", "website-growth", ["create website", "website development", "wordpress website"]],
  ["shopify-expert-audit-checklist", "Shopify Expert Audit Checklist", "shopify expert", "shopify-ecommerce", ["shopify speed optimization", "shopify redesign", "shopify bugs"]],
  ["web-app-development-cost-factors", "Web App Development Cost Factors", "web app development", "full-stack-development", ["web app", "saas mvp", "software developer"]],
  ["mern-stack-developer-mvp", "MERN Stack Developer MVP Scope Tips", "mern stack developer", "full-stack-development", ["react", "node js", "saas mvp"]],
  ["laravel-crm-customization", "Laravel CRM Customization Patterns", "laravel", "full-stack-development", ["crm", "php laravel developer", "web app"]],
  ["node-js-for-saas-backends", "Node.js for SaaS Backends", "node js", "full-stack-development", ["saas", "web app development", "mern stack developer"]],
  ["elementor-website-design-performance", "Elementor Website Design Without Killing Performance", "elementor website design", "wordpress-woocommerce", ["wordpress speed optimization", "wordpress website design", "wordpress"]],
  ["shopify-website-development-handoff", "Shopify Website Development Handoff Checklist", "shopify website development", "shopify-ecommerce", ["shopify store setup", "shopify expert", "shopify"]],
  ["build-shopify-website-for-brand", "Build a Shopify Website for a Product Brand", "build shopify website", "shopify-ecommerce", ["shopify website design", "shopify store design", "ecommerce website"]],
  ["wordpress-developer-maintenance-retainer", "WordPress Developer Maintenance Retainer Scope", "wordpress developer", "wordpress-woocommerce", ["fix wordpress", "wordpress website", "website maintenance"]],
  ["website-redesign-seo-preservation", "Website Redesign SEO Preservation Checklist", "website redesign", "website-growth", ["wordpress website redesign", "technical seo", "website speed optimization"]],
  ["shopify-speed-optimization-theme-edits", "Shopify Speed Optimization Theme Edits That Help", "shopify speed optimization", "shopify-ecommerce", ["shopify speed", "shopify design", "shopify"]],
  ["woocommerce-fix-payment-gateway", "WooCommerce Fix for Payment Gateway Failures", "woocommerce fix", "wordpress-woocommerce", ["woocommerce", "ecommerce website", "fix wordpress"]],
  ["software-developer-discovery-workshop", "Software Developer Discovery Workshop Agenda", "software developer", "full-stack-development", ["web app development", "saas mvp", "crm"]],
  ["html-accessibility-basics", "HTML Accessibility Basics for Business Sites", "html", "full-stack-development", ["front end developer", "business website", "website development"]],
  ["erp-customer-portal-ux", "ERP Customer Portal UX Essentials", "erp", "full-stack-development", ["erpnext", "crm", "web app"]],
  ["dropshipping-shopify-store-ops", "Dropshipping Shopify Store Operations Checklist", "shopify dropshipping store", "shopify-ecommerce", ["dropshipping", "shopify dropshipping", "shopify store"]],
  ["create-shopify-store-product-data", "Create a Shopify Store: Product Data Prep", "create shopify store", "shopify-ecommerce", ["shopify store setup", "build shopify store", "shopify"]],
  ["wordpress-website-development-for-clinics", "WordPress Website Development for Clinics", "wordpress website development", "wordpress-woocommerce", ["medical website", "business website", "wordpress website design"]],
  ["saas-developer-handover-docs", "SaaS Developer Handover Docs That Prevent Drift", "saas developer", "full-stack-development", ["saas", "saas mvp", "web app development"]],
  ["shopify-ecommerce-website-navigation", "Shopify Ecommerce Website Navigation Patterns", "shopify ecommerce website", "shopify-ecommerce", ["shopify website design", "shopify store design", "ecommerce"]],
  ["php-laravel-developer-api-design", "PHP Laravel Developer API Design Notes", "php laravel developer", "full-stack-development", ["laravel", "php", "web app"]],
  ["website-speed-optimization-for-leads", "Website Speed Optimization for Lead Gen Sites", "website speed optimization", "website-growth", ["business website", "wordpress speed optimization", "create website"]],
  ["build-wordpress-website-for-local-services", "Build a WordPress Website for Local Services", "build wordpress website", "wordpress-woocommerce", ["business website", "wordpress website", "wordpress website design"]],
  ["shopify-store-design-mobile-first", "Shopify Store Design Mobile-First Patterns", "shopify store design", "shopify-ecommerce", ["shopify website design", "shopify design", "shopify store"]],
  ["front-end-developer-core-web-vitals", "Front End Developer Guide to Core Web Vitals", "front end developer", "full-stack-development", ["website speed optimization", "react", "html"]],
  ["woocommerce-website-checkout-ux", "WooCommerce Website Checkout UX Improvements", "woocommerce website", "wordpress-woocommerce", ["woocommerce fix", "ecommerce website", "woocommerce"]],
  ["next-js-developer-app-router-notes", "Next.js Developer Notes on App Router Delivery", "next js developer", "full-stack-development", ["react", "web app", "saas mvp"]],
  ["amazon-affiliate-wordpress-setup", "Amazon Affiliate WordPress Setup Without Bloat", "amazon affiliate", "wordpress-woocommerce", ["wordpress website", "create website", "wordpress"]],
];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function body(title, keyword, secondary) {
  const secs = secondary.slice(0, 3);
  return `## Why “${keyword}” matters for your next project

If you are searching for **${keyword}**, you usually need a clear outcome: a faster launch, cleaner conversion paths, or a site your team can maintain. This guide explains practical decisions that keep scope honest and delivery measurable.

## What good delivery looks like

A strong **${keyword}** engagement starts with audience, offers and constraints—not theme shopping. Define pages, integrations, content ownership and performance targets before development begins.

### Scope questions to answer early

- Who is the primary visitor and what should they do first?
- Which pages are money pages versus support pages?
- Do you need **${secs[0] || "website development"}**, ongoing edits, or both?
- What does “done” mean for mobile speed and form reliability?

## Recommended approach

1. **Discover** goals, brand assets and technical constraints.
2. **Design** information architecture and conversion paths.
3. **Build** with staging reviews and content freeze dates.
4. **Optimize** for Core Web Vitals, crawl clarity and analytics.
5. **Hand over** with training notes and a short support window.

Related topics often include **${secs.join("**, **")}**—choose the stack that matches operations, not hype.

## Common mistakes

- Starting in a page builder without a sitemap
- Ignoring mobile checkout or lead forms until the end
- Mixing plugins until the site becomes fragile
- Redesigning visuals while leaving slow templates untouched

## How I can help

I provide WordPress website development, Shopify website development, WooCommerce work, website redesign and full-stack web app delivery—plus WordPress speed optimization and Shopify speed optimization when performance is the blocker.

## Next step

Share your goals, references and timeline. I will reply with a practical plan for **${title.replace(/^How to |^What Is /i, "").toLowerCase()}** without inflated promises.
`;
}

function faq(keyword) {
  return [
    {
      question: `What should I prepare before a ${keyword} project?`,
      answer: `Prepare brand assets, a sitemap draft, example sites you like, content owners and any must-have integrations. Clear inputs shorten discovery and protect timeline quality.`,
    },
    {
      question: `How long does ${keyword} usually take?`,
      answer: `Simple brochure sites can take one to three weeks. Stores, memberships and custom apps need milestones after discovery. Speed-only engagements are often measured in days once access is ready.`,
    },
    {
      question: `Will ${keyword} work include SEO basics?`,
      answer: `Yes when scoped: titles, headings, indexation hygiene, image compression and Core Web Vitals-minded templates. Ranking outcomes still depend on content and competition.`,
    },
    {
      question: `How do we start working together?`,
      answer: `Share goals, references, timeline and access needs. I reply with a practical plan covering WordPress, Shopify, WooCommerce, redesign, speed optimization or full-stack delivery as required.`,
    },
  ];
}

const existing = new Set(
  fs
    .readdirSync(OUT)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, "")),
);

let created = 0;
let day = 1;

for (const [slugIn, title, keyword, category, secondary] of posts) {
  const slug = slugify(slugIn);
  if (existing.has(slug)) continue;

  const publishedAt = `2026-07-${String(((day - 1) % 28) + 1).padStart(2, "0")}`;
  day += 1;

  const faqs = faq(keyword)
    .map(
      (f) => `  - question: ${JSON.stringify(f.question)}
    answer: ${JSON.stringify(f.answer)}`,
    )
    .join("\n");

  const tags = [keyword, ...secondary].slice(0, 5);
  const description = `${title} — practical guidance on ${keyword} for business owners hiring for website development, WordPress, Shopify or full-stack delivery.`;
  const excerpt = `Clear, practical advice on ${keyword} so you can brief, hire and launch with less risk.`;

  const mdx = `---
title: ${JSON.stringify(title)}
slug: ${JSON.stringify(slug)}
description: ${JSON.stringify(description)}
excerpt: ${JSON.stringify(excerpt)}
publishedAt: ${JSON.stringify(publishedAt)}
updatedAt: null
category: ${category}
tags:
${tags.map((t) => `  - ${t}`).join("\n")}
primaryKeyword: ${JSON.stringify(keyword)}
secondaryKeywords:
${secondary.map((t) => `  - ${t}`).join("\n")}
author: "Pardeep Kaushik"
featured: false
draft: false
faqs:
${faqs}
---

${body(title, keyword, secondary)}
`;

  fs.writeFileSync(path.join(OUT, `${slug}.mdx`), mdx, "utf8");
  existing.add(slug);
  created += 1;
}

console.log(`Created ${created} posts. Total mdx: ${fs.readdirSync(OUT).filter((f) => f.endsWith(".mdx")).length}`);
