export type ServiceLanding = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  capabilities: string[];
  technologies: string[];
  problems: string[];
  process: { title: string; description: string }[];
  relatedSlugs: string[];
  relatedProjectIds: string[];
  faqs: { question: string; answer: string }[];
};

export const serviceLandings: ServiceLanding[] = [
  {
    slug: "wordpress-developer",
    title: "WordPress Developer",
    metaTitle: "WordPress Developer | Freelance WordPress Expert for Hire",
    metaDescription:
      "Hire a freelance WordPress developer for business sites, Elementor layouts, WooCommerce stores, redesigns, migrations and WordPress speed optimization—available worldwide.",
    h1: "WordPress Developer for Business Websites That Stay Easy to Manage",
    intro:
      "Pardeep Kaushik is a freelance WordPress developer who builds and improves business websites with clear structure, mobile-ready layouts and admin-friendly editing. Work covers custom builds, Elementor website design, WooCommerce stores, redesigns and performance fixes for clients worldwide. For India-specific hiring, see WordPress Developer in India.",
    capabilities: [
      "Build a WordPress website from brief to launch",
      "Elementor layouts and reusable page templates",
      "WooCommerce catalogue, cart and checkout refinements",
      "WordPress redesign without losing brand clarity",
      "Plugin/theme troubleshooting and maintainable handoff",
      "Figma to WordPress implementation when designs are provided",
    ],
    technologies: [
      "WordPress",
      "Elementor",
      "WooCommerce",
      "ACF",
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    problems: [
      "Outdated WordPress sites that look broken on mobile",
      "Hard-to-edit Elementor pages without a developer",
      "Slow WordPress templates hurting bounce rate",
      "WooCommerce checkout or product page issues",
      "Unsafe migrations and messy hosting setups",
    ],
    process: [
      {
        title: "Discovery",
        description:
          "Clarify goals, pages, content ownership and whether Elementor, a theme, or a hybrid approach fits.",
      },
      {
        title: "Build & content structure",
        description:
          "Implement responsive templates, forms and WooCommerce flows with admin-friendly editing in mind.",
      },
      {
        title: "QA & launch",
        description:
          "Cross-device checks, basic technical SEO, staging review, then production handoff with credentials documented.",
      },
    ],
    relatedSlugs: [
      "elementor-developer",
      "woocommerce-developer",
      "wordpress-website-design",
      "wordpress-speed-optimization",
      "wordpress-migration",
      "figma-to-wordpress",
      "wordpress-developer-india",
    ],
    relatedProjectIds: ["placid-technologies", "cactusjack-pc", "shur-tite"],
    faqs: [
      {
        question: "What does a WordPress developer do?",
        answer:
          "A WordPress developer plans, builds and maintains WordPress websites—themes or builders, plugins, WooCommerce, content structure, performance and secure deployment—so the site works for visitors and is manageable for the business.",
      },
      {
        question: "How much does a WordPress developer charge?",
        answer:
          "Pricing depends on scope—page count, WooCommerce needs, redesign vs build-from-scratch and integrations. Project-based estimates are available after a short brief; see the pricing page for package starting points.",
      },
      {
        question: "Can you build a custom Elementor website?",
        answer:
          "Yes. Elementor website design is a core part of my WordPress work, including reusable sections, mobile layouts and practical editor training for your team.",
      },
      {
        question: "Do you work with WooCommerce?",
        answer:
          "Yes. WooCommerce storefront setup, product presentation, cart/checkout refinements and WooCommerce-related fixes are included in WordPress ecommerce engagements.",
      },
      {
        question: "Can you redesign an existing WordPress website?",
        answer:
          "Yes. Redesigns keep your brand and content direction while improving layout, mobile UX and maintainability—without unnecessary plugin bloat.",
      },
      {
        question: "Can you optimize WordPress speed?",
        answer:
          "Yes. Caching, image delivery, CSS/JS cleanup and Core Web Vitals improvements are available as focused speed projects or as part of a build.",
      },
      {
        question: "Do you work with international clients?",
        answer:
          "Yes. WordPress projects are delivered remotely for clients worldwide, with clear milestones, staging and handoff.",
      },
      {
        question: "Will I be able to edit the website myself?",
        answer:
          "Yes. Builds are structured so your team can update content safely—especially with Elementor templates and clear editor guidance.",
      },
      {
        question: "Do you provide post-launch support?",
        answer:
          "Yes. Post-launch fixes, updates and practical improvements are available after the site goes live.",
      },
    ],
  },
  {
    slug: "wordpress-website-design",
    title: "WordPress Website Design",
    metaTitle: "WordPress Website Design | Business Sites & Elementor Layouts",
    metaDescription:
      "WordPress website design by Pardeep Kaushik—clear business sites, Elementor layouts, mobile-first pages and conversion-minded structure.",
    h1: "WordPress Website Design for Clear, Convertible Business Sites",
    intro:
      "WordPress website design should make your offer obvious on every screen. I design and implement WordPress pages that balance brand, readability and conversion—especially with Elementor and content-driven layouts.",
    capabilities: [
      "Homepage and service page information architecture",
      "Elementor design systems and section libraries",
      "Mobile-first layouts and typography hierarchy",
      "Lead forms and call-to-action placement",
      "Brand-consistent redesign of existing WordPress sites",
    ],
    technologies: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript", "Figma-to-WordPress"],
    problems: [
      "Homepages that bury the offer",
      "Inconsistent spacing and typography across pages",
      "Desktop-only designs that break on phones",
      "Designs that look good but are hard for clients to edit",
    ],
    process: [
      {
        title: "Structure",
        description: "Map pages, messages and CTAs before visual polish.",
      },
      {
        title: "Design in WordPress",
        description: "Build layouts in Elementor or theme templates with reusable patterns.",
      },
      {
        title: "Refine & handoff",
        description: "Responsive QA, content polish and editor guidance.",
      },
    ],
    relatedSlugs: ["wordpress-developer", "elementor-developer", "website-speed-optimization"],
    relatedProjectIds: ["cactusjack-pc", "placid-technologies", "cannyheads"],
    faqs: [
      {
        question: "Do you design and build in WordPress, or only design?",
        answer:
          "Both. Most engagements include design implementation in WordPress so the delivered site is live-ready, not just a mockup.",
      },
      {
        question: "Can you match an existing brand?",
        answer:
          "Yes. Bring brand colors, fonts and references—I'll translate them into consistent WordPress layouts.",
      },
    ],
  },
  {
    slug: "elementor-developer",
    title: "Elementor Developer",
    metaTitle: "Elementor Developer | Custom WordPress Layouts & Templates",
    metaDescription:
      "Elementor developer for custom WordPress layouts, reusable templates, landing pages and maintainable page-builder builds.",
    h1: "Elementor Developer for Clean, Maintainable WordPress Layouts",
    intro:
      "As an Elementor developer, I build page-builder websites that look intentional and stay editable. The goal is structured sections your team can update—without fighting the builder.",
    capabilities: [
      "Custom Elementor page and landing templates",
      "Global styles, headers and footers",
      "Conversion-focused service and lead pages",
      "Cleanup of bloated or inconsistent Elementor sites",
      "Performance-aware Elementor implementation",
    ],
    technologies: ["Elementor", "WordPress", "CSS", "JavaScript", "ACF"],
    problems: [
      "Elementor pages that are slow or overly nested",
      "No design system—every page looks different",
      "Editors afraid to touch the site",
      "Mobile breakpoints that were never finished",
    ],
    process: [
      {
        title: "Audit or brief",
        description: "Review existing Elementor structure or define a new template plan.",
      },
      {
        title: "Template build",
        description: "Create reusable sections and page templates with consistent spacing.",
      },
      {
        title: "Handoff",
        description: "Document how to edit safely and verify mobile layouts.",
      },
    ],
    relatedSlugs: ["wordpress-developer", "wordpress-website-design", "website-speed-optimization"],
    relatedProjectIds: ["placid-technologies", "cactusjack-pc"],
    faqs: [
      {
        question: "Can you build a custom Elementor website?",
        answer:
          "Yes. Custom Elementor websites and landing pages are a regular part of my WordPress delivery.",
      },
      {
        question: "Can you clean up an existing Elementor site?",
        answer:
          "Yes. I can simplify nesting, standardize styles and improve mobile layouts on existing Elementor builds.",
      },
    ],
  },
  {
    slug: "woocommerce-developer",
    title: "WooCommerce Developer",
    metaTitle: "WooCommerce Developer | Storefront, Checkout & Fixes",
    metaDescription:
      "WooCommerce developer for WordPress ecommerce—catalogue presentation, shopping flows, checkout refinements and storefront fixes.",
    h1: "WooCommerce Developer for Clear Storefronts and Shopping Flows",
    intro:
      "WooCommerce works best when product discovery and checkout feel simple. I help businesses set up and refine WooCommerce stores on WordPress—presentation, flows and practical fixes.",
    capabilities: [
      "WooCommerce storefront setup and theme integration",
      "Product, category and cart page improvements",
      "Checkout UX refinements",
      "WooCommerce-related bug fixes",
      "Mobile ecommerce presentation",
    ],
    technologies: ["WooCommerce", "WordPress", "Elementor", "PHP", "JavaScript"],
    problems: [
      "Confusing product pages that don't convert",
      "Cart and checkout friction on mobile",
      "Theme conflicts breaking WooCommerce templates",
      "Slow ecommerce pages",
    ],
    process: [
      {
        title: "Store audit",
        description: "Review catalogue structure, templates and critical shopping paths.",
      },
      {
        title: "Implement",
        description: "Improve templates, UX and WooCommerce configuration as scoped.",
      },
      {
        title: "Test",
        description: "Walk through add-to-cart and checkout on desktop and mobile before handoff.",
      },
    ],
    relatedSlugs: ["wordpress-developer", "website-speed-optimization", "shopify-developer"],
    relatedProjectIds: ["resourceportal-shop", "getboldify"],
    faqs: [
      {
        question: "Do you work with WooCommerce?",
        answer:
          "Yes. WooCommerce website builds and WooCommerce fix work are part of my WordPress ecommerce services.",
      },
      {
        question: "Shopify or WooCommerce—which do you recommend?",
        answer:
          "It depends on your ops and stack. WooCommerce fits WordPress-centric businesses; Shopify often fits product brands that want a hosted commerce platform. I work with both.",
      },
    ],
  },
  {
    slug: "shopify-developer",
    title: "Shopify Developer",
    metaTitle: "Shopify Developer | Freelance Shopify Expert for Hire",
    metaDescription:
      "Hire a freelance Shopify developer for store setup, Shopify 2.0 themes, Liquid customization, redesigns and Shopify speed optimization—available for brands worldwide.",
    h1: "Shopify Developer for Stores That Look Premium and Convert",
    intro:
      "Pardeep Kaushik is a freelance Shopify developer who builds and customizes Shopify stores for product brands—theme work, Shopify 2.0 sections, product presentation and speed-minded delivery for clients worldwide. For India-specific hiring, see Shopify Developer in India.",
    capabilities: [
      "Shopify store setup and theme customization",
      "Shopify 2.0 sections and templates",
      "Collection, product and landing pages",
      "Shopify redesign and UX cleanup",
      "Shopify speed optimization",
      "Figma to Shopify theme implementation",
    ],
    technologies: ["Shopify", "Liquid", "Shopify 2.0", "HTML", "CSS", "JavaScript"],
    problems: [
      "Generic themes that don't match the brand",
      "Product pages that under-sell photography",
      "Slow theme apps hurting load time",
      "Mobile checkout friction",
    ],
    process: [
      {
        title: "Store brief",
        description: "Products, collections, brand assets and conversion goals.",
      },
      {
        title: "Theme & Liquid work",
        description: "Customize sections and templates for desktop and mobile.",
      },
      {
        title: "Launch checks",
        description: "QA shopping flows, apps impact and basic performance hygiene.",
      },
    ],
    relatedSlugs: [
      "shopify-liquid-developer",
      "shopify-theme-development",
      "shopify-speed-optimization",
      "figma-to-shopify",
      "shopify-developer-india",
    ],
    relatedProjectIds: ["talwarsons", "getboldify", "resourceportal-shop"],
    faqs: [
      {
        question: "Do you develop custom Shopify themes?",
        answer:
          "Yes. Custom Shopify theme development and Online Store 2.0 section patterns are part of current Shopify work.",
      },
      {
        question: "Can you customize Shopify Liquid?",
        answer:
          "Yes. Custom Liquid sections for hero, collection and product storytelling are available when the theme needs more than presets.",
      },
      {
        question: "Can you build from Figma?",
        answer:
          "Yes. Figma layouts can be implemented as Shopify sections and templates with responsive behavior.",
      },
      {
        question: "Can you improve Shopify speed?",
        answer:
          "Yes. Theme/app weight reduction, image strategy and Core Web Vitals work are available as focused Shopify speed projects.",
      },
      {
        question: "Can you redesign an existing store?",
        answer:
          "Yes. Redesigns can keep your catalogue and apps while improving layout, mobile UX and conversion clarity.",
      },
      {
        question: "Do you work with Shopify 2.0?",
        answer:
          "Yes. Shopify 2.0 / Online Store 2.0 themes and section architecture are part of regular Shopify delivery.",
      },
      {
        question: "Do you work with international clients?",
        answer:
          "Yes. Shopify projects are delivered remotely for brands and agencies worldwide.",
      },
    ],
  },
  {
    slug: "shopify-liquid-developer",
    title: "Shopify Liquid Developer",
    metaTitle: "Shopify Liquid Developer | Custom Sections & Theme Code",
    metaDescription:
      "Shopify Liquid developer for custom sections, theme templates and Shopify 2.0 customization beyond stock theme settings.",
    h1: "Shopify Liquid Developer for Custom Theme Sections",
    intro:
      "When theme settings are not enough, Liquid is. I customize Shopify themes with Liquid sections and templates so your storefront matches the product story.",
    capabilities: [
      "Custom Liquid sections and blocks",
      "Product and collection template customization",
      "Shopify 2.0 theme architecture",
      "Figma-to-Shopify section implementation",
      "Theme bug fixes and CSS/JS refinements",
    ],
    technologies: ["Liquid", "Shopify", "JavaScript", "CSS", "JSON templates"],
    problems: [
      "Designs that cannot be built with stock sections",
      "Broken theme customizations after app installs",
      "Inflexible product templates",
    ],
    process: [
      {
        title: "Scope sections",
        description: "Identify which Liquid modules are needed versus theme settings.",
      },
      {
        title: "Implement",
        description: "Build sections with editor controls your team can reuse.",
      },
      {
        title: "Verify",
        description: "Test on multiple products/collections and devices.",
      },
    ],
    relatedSlugs: ["shopify-developer", "shopify-theme-development", "shopify-speed-optimization", "figma-to-shopify"],
    relatedProjectIds: ["talwarsons", "getboldify"],
    faqs: [
      {
        question: "Can you customize Shopify Liquid?",
        answer:
          "Yes. Liquid section and template customization is a core Shopify skill I use for brand-specific storefronts.",
      },
      {
        question: "Can you convert Figma designs to Shopify?",
        answer:
          "Yes. I implement Figma layouts as Shopify sections and templates with responsive behavior.",
      },
    ],
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    metaTitle: "Full Stack Developer | React, Next.js & Node.js Freelance Expert",
    metaDescription:
      "Hire a freelance full stack developer for React/Next.js frontends, Node.js APIs, databases and VPS deployment—remote delivery for businesses worldwide.",
    h1: "Full Stack Developer for Custom Web Apps and Product Sites",
    intro:
      "I build full-stack applications that need more than a marketing CMS—React and Next.js interfaces, Node.js APIs, databases, integrations and production deployment. Based in India and available for remote projects worldwide. For India-focused hiring context, see Full Stack Developer in India.",
    capabilities: [
      "React and Next.js application development",
      "Node.js APIs and backend workflows",
      "MongoDB / PostgreSQL data models",
      "Auth, dashboards and admin tools",
      "SaaS MVP foundations and API integrations",
      "VPS deployment with Nginx and SSL",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "Nginx",
      "VPS",
    ],
    problems: [
      "Marketing sites that need real app features",
      "Manual processes that should be software",
      "Frontends disconnected from unreliable backends",
      "Hosting that is not production-ready",
    ],
    process: [
      {
        title: "Product discovery",
        description: "Define users, features and MVP boundaries.",
      },
      {
        title: "Build vertically",
        description: "Ship frontend and backend together with staging review.",
      },
      {
        title: "Deploy & support",
        description: "Production hosting, monitoring basics and iteration.",
      },
    ],
    relatedSlugs: [
      "api-integration",
      "saas-mvp-development",
      "remote-web-developer",
      "wordpress-developer",
      "shopify-developer",
      "full-stack-developer-india",
    ],
    relatedProjectIds: ["utilitytools", "aivoxa-labs", "yogispeaks"],
    faqs: [
      {
        question: "What technologies do you use for full stack development?",
        answer:
          "Primarily React, Next.js, Node.js, TypeScript and databases such as MongoDB or PostgreSQL, with VPS/Nginx deployment when needed.",
      },
      {
        question: "Can you build SaaS MVPs?",
        answer:
          "Yes. MVP-scoped products with auth, dashboards and API-backed workflows are within full-stack scope when requirements are clear.",
      },
      {
        question: "Do you work with React and Next.js?",
        answer:
          "Yes. React and Next.js are core tools for marketing sites that need app-like behavior and for SaaS-style products.",
      },
      {
        question: "Can you build APIs?",
        answer:
          "Yes. Node.js APIs, third-party integrations and frontend consumption in React/Next.js are part of full-stack engagements.",
      },
      {
        question: "Which databases do you use?",
        answer:
          "MongoDB and PostgreSQL are used most often, selected to match the product’s data model and hosting plan.",
      },
      {
        question: "Can you deploy to VPS/cloud?",
        answer:
          "Yes. Production VPS deployment with Nginx and SSL is available when the project needs it.",
      },
      {
        question: "Can you work with an existing codebase?",
        answer:
          "Yes. Existing React/Next.js/Node codebases can be audited, extended or stabilized when access and scope are clear.",
      },
      {
        question: "Do you work with international clients?",
        answer:
          "Yes. Full stack projects are delivered remotely for clients worldwide with staging before production.",
      },
    ],
  },
  {
    slug: "website-speed-optimization",
    title: "Website Speed Optimization",
    metaTitle: "Website Speed Optimization | WordPress & Shopify Performance",
    metaDescription:
      "Website speed optimization for WordPress and Shopify—Core Web Vitals, caching, images and template cleanup without redesigning your brand.",
    h1: "Website Speed Optimization Without Changing Your Visual Design",
    intro:
      "Slow sites lose trust. I improve WordPress and Shopify performance with measurable Core Web Vitals work—caching, media, CSS/JS and template issues—while keeping your layout intact.",
    capabilities: [
      "PageSpeed Insights and GTmetrix baselines",
      "Caching, CDN and image strategy",
      "WordPress template and plugin performance fixes",
      "Shopify theme/app weight reduction",
      "LCP, INP and CLS improvements",
    ],
    technologies: [
      "WordPress",
      "Shopify",
      "CDN",
      "Caching",
      "Core Web Vitals",
      "Image optimization",
    ],
    problems: [
      "Poor mobile PageSpeed scores",
      "Heavy Elementor or theme CSS",
      "Unoptimized product imagery",
      "Render-blocking scripts from apps/plugins",
    ],
    process: [
      {
        title: "Measure",
        description: "Capture before metrics on critical URLs.",
      },
      {
        title: "Fix",
        description: "Prioritize highest-impact performance work first.",
      },
      {
        title: "Report",
        description: "Share after metrics and maintenance recommendations.",
      },
    ],
    relatedSlugs: ["wordpress-developer", "shopify-developer", "wordpress-speed-optimization", "shopify-speed-optimization", "elementor-developer"],
    relatedProjectIds: ["utilitytools", "aivoxa-labs", "talwarsons"],
    faqs: [
      {
        question: "Will speed work change how my site looks?",
        answer:
          "The goal is performance without a visual redesign. Layout and brand stay the same unless you request design changes separately.",
      },
      {
        question: "Do you optimize both WordPress and Shopify?",
        answer:
          "Yes. Dedicated WordPress speed optimization and Shopify speed optimization services are available, plus combined website speed projects.",
      },
    ],
  },
  {
    slug: "wordpress-migration",
    title: "WordPress Migration",
    metaTitle: "WordPress Migration | Safe Moves Without Design Loss",
    metaDescription:
      "WordPress migration services—hosting moves, domain cutovers and content migration planned to protect design, SEO URLs and uptime.",
    h1: "WordPress Migration Planned for Continuity and Clean Cutover",
    intro:
      "Migrations fail when DNS, media and redirects are rushed. I migrate WordPress sites with a staged plan so design, content and rankings stay intact.",
    capabilities: [
      "Host-to-host WordPress migrations",
      "Domain and DNS cutover planning",
      "Media and database integrity checks",
      "Redirect mapping for important URLs",
      "SSL and post-migration QA",
    ],
    technologies: ["WordPress", "cPanel / VPS", "DNS", "SSL", "Nginx / Apache"],
    problems: [
      "Broken images after a rushed move",
      "Downtime during DNS changes",
      "Lost redirects and soft 404s",
      "Mixed content / SSL issues after cutover",
    ],
    process: [
      {
        title: "Pre-flight",
        description: "Inventory plugins, size, custom code and DNS ownership.",
      },
      {
        title: "Stage & verify",
        description: "Migrate to staging, test forms, login and critical pages.",
      },
      {
        title: "Cutover",
        description: "Update DNS/SSL, verify search-critical URLs and hand off notes.",
      },
    ],
    relatedSlugs: ["wordpress-developer", "website-speed-optimization", "api-integration"],
    relatedProjectIds: ["placid-technologies", "shur-tite"],
    faqs: [
      {
        question: "Can you migrate a WordPress website without changing the design?",
        answer:
          "Yes. Migration focuses on moving the existing site intact. Design changes are separate unless requested.",
      },
      {
        question: "Will my SEO URLs be preserved?",
        answer:
          "URL continuity is part of the plan. Critical paths are checked and redirects are added when a path must change.",
      },
    ],
  },
  {
    slug: "api-integration",
    title: "API Integration",
    metaTitle: "API Integration Developer | Custom Web Apps & Third-Party APIs",
    metaDescription:
      "API integration for web apps and websites—third-party services, custom Node.js backends and frontends connected cleanly.",
    h1: "API Integration for Websites and Custom Web Applications",
    intro:
      "APIs connect your product to payments, CRMs, tools and your own backend. I integrate third-party and custom APIs into WordPress, Shopify-adjacent workflows and full-stack React/Next.js apps.",
    capabilities: [
      "Third-party REST API integrations",
      "Custom Node.js API development",
      "Front-end consumption in React/Next.js",
      "Auth-aware protected endpoints",
      "Error handling and practical logging",
    ],
    technologies: ["REST APIs", "Node.js", "Next.js", "React", "WordPress", "JSON"],
    problems: [
      "Manual data entry between tools",
      "Frontends calling unreliable endpoints",
      "Missing authentication or validation",
      "No clear ownership of API errors",
    ],
    process: [
      {
        title: "Contract & auth",
        description: "Confirm endpoints, keys ownership and data shapes.",
      },
      {
        title: "Integrate",
        description: "Wire UI and backend with validation and failure states.",
      },
      {
        title: "Harden",
        description: "Test edge cases and document how to rotate credentials safely.",
      },
    ],
    relatedSlugs: ["full-stack-developer", "wordpress-developer", "shopify-developer"],
    relatedProjectIds: ["utilitytools", "aivoxa-labs", "yogispeaks"],
    faqs: [
      {
        question: "Can you integrate third-party APIs?",
        answer:
          "Yes. Third-party API integration is a standard part of full-stack and custom web work.",
      },
      {
        question: "Can you connect a front-end to a custom backend?",
        answer:
          "Yes. React/Next.js frontends connected to Node.js APIs and databases are within scope.",
      },
    ],
  },
  {
    slug: "full-stack-developer-india",
    title: "Full Stack Developer in India",
    metaTitle:
      "Full Stack Developer in India | Hire Pardeep Kaushik",
    metaDescription:
      "Looking for an experienced full stack developer in India? Hire Pardeep Kaushik for React, Next.js, Node.js, WordPress, Shopify, APIs and VPS deployment—5+ years freelance experience.",
    h1: "Full Stack Developer in India — Pardeep Kaushik",
    intro:
      "Looking for an experienced full stack developer in India? Pardeep Kaushik is a freelance full-stack developer based in Chandigarh who builds custom web applications and business websites with React, Next.js, Node.js, WordPress and Shopify—owning delivery from planning through deployment.",
    capabilities: [
      "Hire a full stack developer in India for end-to-end ownership",
      "React / Next.js frontends with Node.js APIs",
      "WordPress and Shopify when a CMS or store fits better",
      "Database models, auth and admin workflows",
      "VPS deployment, SSL and practical handoff",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "WordPress",
      "Shopify",
      "MongoDB",
      "PostgreSQL",
      "Nginx",
    ],
    problems: [
      "Projects stuck between separate frontend and backend freelancers",
      "Businesses that need custom workflows beyond a theme",
      "Founders who want one accountable developer in India time zones",
      "Apps that need staging, production hosting and clear documentation",
    ],
    process: [
      {
        title: "Scope the seams",
        description:
          "Clarify UI, APIs, data, SEO markup and hosting so ownership is written down.",
      },
      {
        title: "Build vertically",
        description:
          "Ship frontend and backend together with staging review—not disconnected tickets.",
      },
      {
        title: "Deploy & support",
        description:
          "Production configuration, handoff notes and iteration after launch.",
      },
    ],
    relatedSlugs: [
      "full-stack-developer",
      "api-integration",
      "wordpress-developer-india",
      "shopify-developer-india",
      "web-developer-india",
    ],
    relatedProjectIds: ["utilitytools", "aivoxa-labs", "yogispeaks"],
    faqs: [
      {
        question: "How do I choose the best full stack developer in India?",
        answer:
          "Look for verified portfolio work, clear ownership of UI + APIs + deployment, honest communication and technology fit—not empty “#1” claims. Review case studies on this site and ask how staging, auth and hosting will be handled.",
      },
      {
        question: "Can I hire a freelance full stack developer in India remotely?",
        answer:
          "Yes. Pardeep works with clients across India and internationally via email, WhatsApp, LinkedIn and Upwork, with clear milestones and staging before production.",
      },
      {
        question: "What full stack services are included?",
        answer:
          "Custom React/Next.js apps, Node.js APIs, databases, WordPress or Shopify when appropriate, API integrations, performance work and VPS deployment.",
      },
    ],
  },
  {
    slug: "wordpress-developer-india",
    title: "WordPress Developer in India",
    metaTitle:
      "WordPress Developer in India | Elementor & WooCommerce",
    metaDescription:
      "Hire a WordPress developer in India—Pardeep Kaushik builds Elementor sites, WooCommerce stores, redesigns, migrations and WordPress speed optimization with clear handoff.",
    h1: "WordPress Developer in India for Business Sites That Stay Editable",
    intro:
      "Hire Pardeep Kaushik as a WordPress developer in India when you need a business website, Elementor layout, WooCommerce store, redesign or migration—with mobile-ready pages and an admin-friendly structure. WordPress development services for businesses in India and international teams looking for direct freelance development support.",
    capabilities: [
      "WordPress website development from brief to launch",
      "Elementor website design and reusable templates",
      "WooCommerce catalogue and checkout refinements",
      "WordPress redesign and migration support",
      "WordPress speed optimization without visual redesign",
    ],
    technologies: [
      "WordPress",
      "Elementor",
      "WooCommerce",
      "ACF",
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    problems: [
      "Outdated WordPress sites that break on mobile",
      "Hard-to-edit Elementor pages",
      "Slow WordPress templates hurting leads",
      "Unsafe or messy migrations",
    ],
    process: [
      {
        title: "Content & structure",
        description: "Map pages, offers and editing needs before building.",
      },
      {
        title: "Build & review",
        description: "Implement on staging with responsive checks.",
      },
      {
        title: "Launch & handoff",
        description: "Go live with training notes for your editors.",
      },
    ],
    relatedSlugs: [
      "wordpress-developer",
      "elementor-developer",
      "woocommerce-developer",
      "wordpress-migration",
      "wordpress-speed-optimization",
      "full-stack-developer-india",
    ],
    relatedProjectIds: ["placid-technologies", "cactusjack-pc", "shur-tite"],
    faqs: [
      {
        question: "Can I hire a WordPress developer in India for redesign only?",
        answer:
          "Yes. Redesigns can keep your brand and content goals while improving structure, mobile UX and editing workflow.",
      },
      {
        question: "Do you work with Elementor and WooCommerce?",
        answer:
          "Yes. Elementor layouts and WooCommerce store work are core WordPress services.",
      },
      {
        question: "Do you offer WordPress speed optimization?",
        answer:
          "Yes. Caching, images, template cleanup and Core Web Vitals work—without changing your layout.",
      },
    ],
  },
  {
    slug: "shopify-developer-india",
    title: "Shopify Developer in India",
    metaTitle:
      "Shopify Developer in India | Liquid & Shopify 2.0",
    metaDescription:
      "Hire a Shopify developer in India—Pardeep Kaushik builds Shopify 2.0 stores, Liquid sections, theme customization, redesigns and Shopify speed optimization.",
    h1: "Shopify Developer in India for Stores That Convert on Mobile",
    intro:
      "Hire Pardeep Kaushik as a Shopify developer in India for Shopify 2.0 themes, custom Liquid sections, store setup, redesigns and performance work. Shopify development services for Indian businesses, ecommerce brands and international clients looking for direct freelance Shopify support.",
    capabilities: [
      "Shopify store setup and theme customization",
      "Shopify 2.0 sections and Liquid development",
      "Collection, product and landing page layouts",
      "Shopify redesign without losing brand clarity",
      "Shopify speed optimization",
    ],
    technologies: [
      "Shopify",
      "Liquid",
      "HTML",
      "CSS",
      "JavaScript",
      "Shopify 2.0",
    ],
    problems: [
      "Theme limits blocking custom layouts",
      "Slow storefronts hurting conversion",
      "Figma designs that need faithful Shopify builds",
      "Messy product/collection presentation on mobile",
    ],
    process: [
      {
        title: "Store brief",
        description: "Products, collections, brand assets and conversion goals.",
      },
      {
        title: "Theme & Liquid build",
        description: "Sections, templates and responsive merchandising.",
      },
      {
        title: "Polish & launch",
        description: "Speed passes, QA and handoff for your team.",
      },
    ],
    relatedSlugs: [
      "shopify-developer",
      "shopify-liquid-developer",
      "shopify-theme-development",
      "shopify-speed-optimization",
      "full-stack-developer-india",
    ],
    relatedProjectIds: ["talwarsons", "getboldify", "resourceportal-shop"],
    faqs: [
      {
        question: "Do you create Shopify 2.0 stores?",
        answer:
          "Yes. Shopify 2.0 themes and Online Store 2.0 section patterns are part of regular Shopify work.",
      },
      {
        question: "Can you customize Shopify Liquid?",
        answer:
          "Yes. Custom Liquid sections and theme edits are a core service.",
      },
      {
        question: "Can you convert Figma designs to Shopify?",
        answer:
          "Yes. Design-to-Shopify builds are scoped from provided Figma or design files when available.",
      },
    ],
  },
  {
    slug: "web-developer-india",
    title: "Web Developer in India",
    metaTitle:
      "Web Developer in India | Custom Websites & Apps",
    metaDescription:
      "Hire a web developer in India—Pardeep Kaushik delivers business websites, ecommerce, custom web apps, redesigns, migrations and speed work across WordPress, Shopify and Next.js.",
    h1: "Web Developer in India for Business Websites and Web Apps",
    intro:
      "Pardeep Kaushik is a web developer in India who helps businesses choose the right stack—WordPress, Shopify or custom React/Next.js—then builds, redesigns or optimizes the site with clear communication and production handoff.",
    capabilities: [
      "Business website development and redesign",
      "Ecommerce on Shopify or WooCommerce",
      "Custom web apps when a CMS is not enough",
      "Website speed optimization and migrations",
      "Frontend and backend work under one owner",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "WordPress",
      "Shopify",
      "React",
      "Next.js",
      "Node.js",
    ],
    problems: [
      "Unclear whether to use WordPress, Shopify or custom code",
      "Outdated sites that need a practical rebuild",
      "Ecommerce that needs better mobile UX",
      "Founders who want one developer instead of fragmented vendors",
    ],
    process: [
      {
        title: "Recommend the stack",
        description: "Match platform to goals, budget and editing needs.",
      },
      {
        title: "Build on staging",
        description: "Implement, review and refine before go-live.",
      },
      {
        title: "Launch & support",
        description: "Deploy, document and offer post-launch fixes.",
      },
    ],
    relatedSlugs: [
      "full-stack-developer-india",
      "wordpress-developer-india",
      "shopify-developer-india",
      "remote-web-developer",
      "website-speed-optimization",
    ],
    relatedProjectIds: ["placid-technologies", "talwarsons", "utilitytools"],
    faqs: [
      {
        question: "What kind of websites do you build?",
        answer:
          "Business marketing sites, ecommerce stores, education/content platforms and custom web apps—depending on what the brief needs.",
      },
      {
        question: "Do you only use one platform?",
        answer:
          "No. WordPress, Shopify and custom Next.js/Node stacks are chosen based on content, ecommerce and product requirements.",
      },
      {
        question: "Can I hire you for ongoing website maintenance?",
        answer:
          "Yes. Freelance projects and longer retainers are both available after launch.",
      },
    ],
  },
  {
    slug: "wordpress-speed-optimization",
    title: "WordPress Speed Optimization",
    metaTitle:
      "WordPress Speed Optimization Service | Core Web Vitals",
    metaDescription:
      "WordPress speed optimization service—Core Web Vitals, caching, image and database cleanup, plugin bloat reduction and PageSpeed diagnostics without redesigning your site.",
    h1: "WordPress Speed Optimization Service",
    intro:
      "Slow WordPress sites lose leads. This WordPress speed optimization service focuses on Core Web Vitals, caching, media, CSS/JavaScript weight, plugin bloat, database hygiene, theme performance, hosting factors and WooCommerce speed—keeping your visual design intact.",
    capabilities: [
      "WordPress performance audit with PageSpeed baselines",
      "Core Web Vitals improvements (LCP, INP, CLS)",
      "Image optimization and priority loading for heroes",
      "Caching and CDN strategy",
      "CSS and JavaScript delivery cleanup",
      "Plugin bloat reduction and conflict review",
      "Database cleanup and autoload hygiene",
      "Theme and Elementor performance fixes",
      "WooCommerce catalogue, product and cart performance",
      "Hosting and server factor review",
    ],
    technologies: [
      "WordPress",
      "WooCommerce",
      "Elementor",
      "Caching",
      "CDN",
      "Core Web Vitals",
      "Image optimization",
    ],
    problems: [
      "Poor mobile PageSpeed scores",
      "Heavy Elementor or theme CSS",
      "Unoptimized product or hero imagery",
      "Render-blocking scripts from plugins",
      "Slow WooCommerce catalogue or cart pages",
      "Hosting or TTFB holding back otherwise clean templates",
    ],
    process: [
      {
        title: "Performance audit",
        description:
          "Capture before metrics on critical URLs and identify the highest-impact bottlenecks across theme, plugins, media and hosting.",
      },
      {
        title: "Prioritized optimization",
        description:
          "Apply caching, media, template, CSS/JS and plugin fixes in a controlled order on staging when possible.",
      },
      {
        title: "Validate & handoff",
        description:
          "Re-measure Core Web Vitals, document what changed and share maintenance recommendations—without promising a specific score.",
      },
    ],
    relatedSlugs: [
      "website-speed-optimization",
      "wordpress-developer",
      "woocommerce-developer",
      "elementor-developer",
      "wordpress-migration",
      "figma-to-wordpress",
      "remote-web-developer",
    ],
    relatedProjectIds: ["placid-technologies", "cactusjack-pc", "shur-tite"],
    faqs: [
      {
        question: "What is included in WordPress speed optimization?",
        answer:
          "Typical work covers a performance audit, Core Web Vitals review, caching, image strategy, CSS/JS cleanup, plugin/theme weight, database hygiene and hosting-related factors that affect LCP, INP and CLS.",
      },
      {
        question: "Will you redesign my WordPress site?",
        answer:
          "No—speed projects keep your layout and brand unless you request design changes as a separate scope.",
      },
      {
        question: "Do you optimize WooCommerce stores?",
        answer:
          "Yes. WooCommerce-specific performance issues such as heavy product templates, scripts and media are included when relevant.",
      },
      {
        question: "Do you guarantee a 100 PageSpeed score?",
        answer:
          "No. Scores depend on hosting, third-party scripts and content. Work focuses on measurable improvements and practical bottlenecks—not vanity guarantees.",
      },
      {
        question: "How do you measure improvement?",
        answer:
          "Before/after PageSpeed Insights or similar diagnostics on agreed URLs, plus notes on what still depends on hosting or third-party scripts.",
      },
    ],
  },
  {
    slug: "shopify-speed-optimization",
    title: "Shopify Speed Optimization",
    metaTitle:
      "Shopify Speed Optimization Service | Faster Storefronts",
    metaDescription:
      "Shopify speed optimization service for theme and app weight, Liquid performance, image strategy and Core Web Vitals—speed up your Shopify store without changing your brand design.",
    h1: "Shopify Speed Optimization Service",
    intro:
      "Shopify stores slow down when themes, apps and media pile up. This Shopify speed optimization service focuses on performance audits, theme code, Liquid weight, third-party apps, product imagery, JavaScript delivery, Core Web Vitals, mobile templates and Shopify 2.0 theme hygiene—so product discovery stays fast.",
    capabilities: [
      "Shopify performance audit on product and collection URLs",
      "Theme code and asset delivery cleanup",
      "Liquid and template performance improvements",
      "Third-party app and script weight reduction guidance",
      "Product and collection image optimization",
      "JavaScript deferral and main-thread hygiene",
      "Core Web Vitals focused fixes",
      "Mobile storefront performance checks",
      "Shopify 2.0 section and theme optimization",
    ],
    technologies: [
      "Shopify",
      "Liquid",
      "Shopify 2.0",
      "CDN",
      "Core Web Vitals",
      "Image optimization",
    ],
    problems: [
      "Slow collection and product pages on mobile",
      "Too many apps injecting scripts",
      "Unoptimized product photography",
      "Theme customizations that hurt LCP",
      "Heavy Liquid loops or global script includes",
    ],
    process: [
      {
        title: "Storefront audit",
        description:
          "Baseline critical storefront URLs and identify heavy assets, apps and theme bottlenecks.",
      },
      {
        title: "Theme & media fixes",
        description:
          "Prioritize theme, Liquid, media and script changes that improve load without breaking checkout.",
      },
      {
        title: "Report & next steps",
        description:
          "Share after metrics and practical recommendations for apps and theme habits you keep.",
      },
    ],
    relatedSlugs: [
      "shopify-developer",
      "shopify-liquid-developer",
      "shopify-theme-development",
      "figma-to-shopify",
      "website-speed-optimization",
      "remote-web-developer",
    ],
    relatedProjectIds: ["talwarsons", "getboldify", "resourceportal-shop"],
    faqs: [
      {
        question: "Can you speed up an existing Shopify store?",
        answer:
          "Yes. Existing themes and catalogues can be optimized without a full redesign when the goal is performance.",
      },
      {
        question: "Do you remove Shopify apps?",
        answer:
          "Only with your approval. App impact is reviewed; removals or replacements are discussed before changes.",
      },
      {
        question: "Is this the same as a Shopify redesign?",
        answer:
          "No. Speed work keeps brand and layout unless you also request theme redesign or new sections.",
      },
      {
        question: "Do you guarantee a specific PageSpeed score?",
        answer:
          "No. Shopify apps, media and third-party scripts affect scores. Engagements target measurable storefront improvements, not guaranteed lab scores.",
      },
    ],
  },
  {
    slug: "shopify-theme-development",
    title: "Shopify Theme Development",
    metaTitle: "Shopify Theme Developer | Custom Shopify 2.0 Themes",
    metaDescription:
      "Custom Shopify theme development with Shopify 2.0 architecture, Liquid sections and brand-ready storefronts—hire a Shopify theme developer for stores that convert.",
    h1: "Custom Shopify Theme Development for Brand-Led Stores",
    intro:
      "When stock themes are not enough, custom Shopify theme development delivers Online Store 2.0 sections, Liquid templates and merchandising layouts that match your brand. Built for product brands that need flexible, maintainable storefronts.",
    capabilities: [
      "Custom Shopify 2.0 theme architecture",
      "Liquid sections, blocks and templates",
      "Product, collection and landing page systems",
      "Theme customization beyond settings",
      "Responsive QA across devices",
      "Handoff for merchants and editors",
    ],
    technologies: [
      "Shopify",
      "Liquid",
      "Shopify 2.0",
      "JSON templates",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    problems: [
      "Theme limits blocking custom layouts",
      "Designs that cannot be built with stock sections",
      "Inflexible product templates",
      "Hard-to-maintain theme customizations",
    ],
    process: [
      {
        title: "Theme scope",
        description:
          "Map templates, sections and merchant editing needs before writing Liquid.",
      },
      {
        title: "Build sections",
        description:
          "Implement Shopify 2.0 sections with editor controls your team can reuse.",
      },
      {
        title: "QA & launch",
        description:
          "Test shopping flows, responsive layouts and handoff documentation.",
      },
    ],
    relatedSlugs: [
      "shopify-developer",
      "shopify-liquid-developer",
      "figma-to-shopify",
      "shopify-speed-optimization",
    ],
    relatedProjectIds: ["talwarsons", "getboldify", "resourceportal-shop"],
    faqs: [
      {
        question: "Do you build custom Shopify 2.0 themes?",
        answer:
          "Yes. Online Store 2.0 section-based themes and templates are a core Shopify service.",
      },
      {
        question: "Can you customize an existing theme instead?",
        answer:
          "Yes. Theme customization is often enough when the base theme is solid and only specific sections need work.",
      },
      {
        question: "Can you implement Figma into a Shopify theme?",
        answer:
          "Yes. Figma-to-Shopify theme builds are scoped from provided design files when available.",
      },
    ],
  },
  {
    slug: "figma-to-wordpress",
    title: "Figma to WordPress",
    metaTitle: "Figma to WordPress | Elementor & Custom Development",
    metaDescription:
      "Convert Figma to WordPress with Elementor or custom templates—responsive, editable WordPress development from your design files.",
    h1: "Figma to WordPress Development",
    intro:
      "Convert Figma designs into WordPress websites that look intentional and remain editable. Delivery can use Elementor or theme templates—focused on spacing, typography, mobile breakpoints and practical editor handoff.",
    capabilities: [
      "Figma to WordPress page builds",
      "Figma to Elementor section systems",
      "Responsive breakpoint matching",
      "Reusable templates for editors",
      "Forms, CTAs and conversion structure",
      "QA against design intent",
    ],
    technologies: [
      "Figma",
      "WordPress",
      "Elementor",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    problems: [
      "Designs that look good in Figma but break in builders",
      "Desktop-only implementations",
      "Editors who cannot safely update pages",
      "Inconsistent spacing after handoff",
    ],
    process: [
      {
        title: "Design review",
        description:
          "Confirm components, breakpoints and which pages are in scope.",
      },
      {
        title: "Build in WordPress",
        description:
          "Implement layouts in Elementor or templates with reusable patterns.",
      },
      {
        title: "Compare & handoff",
        description:
          "Responsive QA against Figma and editor guidance for your team.",
      },
    ],
    relatedSlugs: [
      "wordpress-developer",
      "elementor-developer",
      "wordpress-website-design",
      "wordpress-speed-optimization",
      "figma-to-shopify",
    ],
    relatedProjectIds: ["placid-technologies", "cactusjack-pc", "cannyheads"],
    faqs: [
      {
        question: "Can you convert Figma to Elementor?",
        answer:
          "Yes. Figma-to-Elementor builds are a common WordPress delivery path when the client wants editable page-builder layouts.",
      },
      {
        question: "Do you need developer access to Figma?",
        answer:
          "View or inspect access to the Figma file (or exported specs) is required to match spacing, type and components accurately.",
      },
      {
        question: "Will the site be editable after launch?",
        answer:
          "Yes. The goal is a WordPress site your team can update—not a locked visual clone.",
      },
    ],
  },
  {
    slug: "figma-to-shopify",
    title: "Figma to Shopify",
    metaTitle: "Figma to Shopify | Liquid & Shopify 2.0 Implementation",
    metaDescription:
      "Convert Figma to Shopify with custom Liquid sections and Shopify 2.0 templates—hire a Figma Shopify developer for brand-accurate storefronts.",
    h1: "Figma to Shopify Development",
    intro:
      "Turn Figma storefront designs into Shopify sections and templates. Delivery focuses on Liquid, Shopify 2.0 architecture and responsive merchandising so collection and product pages match the brand story.",
    capabilities: [
      "Figma to Shopify section builds",
      "Custom Liquid theme templates",
      "Product and collection layout systems",
      "Shopify 2.0 editor-friendly blocks",
      "Responsive storefront QA",
      "Handoff for merchants",
    ],
    technologies: [
      "Figma",
      "Shopify",
      "Liquid",
      "Shopify 2.0",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    problems: [
      "Beautiful Figma files that stock themes cannot express",
      "Broken spacing on mobile after rushed builds",
      "Sections that merchants cannot reuse",
      "Product pages that ignore design hierarchy",
    ],
    process: [
      {
        title: "Map designs to templates",
        description:
          "Identify home, collection, product and landing modules from Figma.",
      },
      {
        title: "Build Liquid sections",
        description:
          "Implement sections and templates with merchant-editable settings.",
      },
      {
        title: "QA shopping flows",
        description:
          "Verify cart/checkout paths and responsive fidelity before launch.",
      },
    ],
    relatedSlugs: [
      "shopify-developer",
      "shopify-liquid-developer",
      "shopify-theme-development",
      "shopify-speed-optimization",
      "figma-to-wordpress",
    ],
    relatedProjectIds: ["talwarsons", "getboldify"],
    faqs: [
      {
        question: "Can you convert Figma to Liquid?",
        answer:
          "Yes. Figma layouts are implemented as Liquid sections and Shopify 2.0 templates.",
      },
      {
        question: "Do you need Shopify theme access?",
        answer:
          "Yes. Theme edit access (or a duplicate development theme) is required for safe implementation.",
      },
      {
        question: "Can you match designs closely from Figma?",
        answer:
          "Delivery aims for faithful visual and spacing fidelity within Shopify constraints, with responsive adjustments agreed during review.",
      },
    ],
  },
  {
    slug: "saas-mvp-development",
    title: "SaaS MVP Development",
    metaTitle: "SaaS MVP Developer | React & Next.js Application Development",
    metaDescription:
      "SaaS MVP development with React, Next.js and Node.js—hire a SaaS developer to ship a focused MVP with auth, dashboards and production deployment.",
    h1: "SaaS MVP Development for Focused Product Launches",
    intro:
      "Build a usable SaaS MVP without boiling the ocean. Pardeep Kaushik develops React/Next.js frontends, Node.js APIs and database-backed workflows so founders can validate product ideas with staging, deployment and clear ownership.",
    capabilities: [
      "MVP scoping and feature prioritization",
      "React / Next.js product UI",
      "Node.js APIs and data models",
      "Auth, dashboards and admin tools",
      "Staging and VPS deployment",
      "Iteration after first users",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "REST APIs",
      "VPS",
    ],
    problems: [
      "Ideas stuck without a build path",
      "Over-scoped MVPs that never ship",
      "Frontends without a reliable backend",
      "No staging or production plan",
    ],
    process: [
      {
        title: "Define the MVP",
        description:
          "Agree users, must-have features and what can wait for version two.",
      },
      {
        title: "Build vertically",
        description:
          "Ship UI and API together with staging review on each milestone.",
      },
      {
        title: "Launch & learn",
        description:
          "Deploy, hand over credentials/docs and plan the next iteration.",
      },
    ],
    relatedSlugs: [
      "full-stack-developer",
      "api-integration",
      "remote-web-developer",
    ],
    relatedProjectIds: ["utilitytools", "aivoxa-labs", "yogispeaks"],
    faqs: [
      {
        question: "What counts as an MVP in this service?",
        answer:
          "A focused product slice—usually auth, core workflows and an admin or dashboard—scoped to validate demand without building every future feature.",
      },
      {
        question: "Do you use React and Next.js for SaaS?",
        answer:
          "Yes. React and Next.js are primary frontend tools, typically paired with Node.js APIs.",
      },
      {
        question: "Can you work from an existing product brief?",
        answer:
          "Yes. Clear briefs, wireframes or Figma files speed discovery; incomplete ideas are refined before build.",
      },
    ],
  },
  {
    slug: "remote-web-developer",
    title: "Remote Web Developer",
    metaTitle: "Remote Web Developer | Freelance Developer Worldwide",
    metaDescription:
      "Hire a remote web developer for WordPress, Shopify and full stack projects worldwide—clear milestones, time-zone overlap, staging, deployment and post-launch support.",
    h1: "Remote Web Developer for Businesses Worldwide",
    intro:
      "Pardeep Kaushik works as a freelance remote web developer for clients worldwide—WordPress, Shopify and full stack React/Next.js projects with direct communication, milestone delivery, staging before launch and clear project ownership. Based in India with overlap for common international working hours.",
    capabilities: [
      "Remote WordPress, Shopify and full stack delivery",
      "Milestone-based project management",
      "Time-zone overlap planning for key calls",
      "Staging environments before production",
      "Deployment and handoff documentation",
      "Post-launch support windows",
    ],
    technologies: [
      "WordPress",
      "Shopify",
      "React",
      "Next.js",
      "Node.js",
      "APIs",
      "VPS deployment",
    ],
    problems: [
      "Agencies or founders who need a reliable remote builder",
      "Projects stuck between multiple freelancers",
      "Unclear communication across time zones",
      "Launches without staging or ownership clarity",
    ],
    process: [
      {
        title: "Align remotely",
        description:
          "Confirm scope, tools (email/WhatsApp/calls), milestones and review cadence.",
      },
      {
        title: "Build on staging",
        description:
          "Share progress in reviewable environments—not surprise production changes.",
      },
      {
        title: "Launch & support",
        description:
          "Deploy, transfer ownership details and provide agreed post-launch support.",
      },
    ],
    relatedSlugs: [
      "full-stack-developer",
      "wordpress-developer",
      "shopify-developer",
      "saas-mvp-development",
      "web-developer-india",
    ],
    relatedProjectIds: ["utilitytools", "talwarsons", "placid-technologies"],
    faqs: [
      {
        question: "Do you work with clients outside India?",
        answer:
          "Yes. Remote engagements are available for clients worldwide via email, WhatsApp, LinkedIn and Upwork.",
      },
      {
        question: "How do time zones work?",
        answer:
          "Async updates are the default, with scheduled overlap calls when decisions need real-time discussion.",
      },
      {
        question: "How are milestones managed?",
        answer:
          "Projects are broken into reviewable milestones with staging demos before production releases.",
      },
      {
        question: "Who owns the project after delivery?",
        answer:
          "Clients receive the agreed deliverables and source/access handoff. Ownership of handed-over project files sits with the client unless otherwise agreed.",
      },
      {
        question: "Do you provide ongoing support?",
        answer:
          "Yes. Post-launch fixes and practical updates can be included for an agreed window or retainer.",
      },
    ],
  },
];

export function getServiceLanding(slug: string) {
  return serviceLandings.find((s) => s.slug === slug) ?? null;
}

export function getAllServiceSlugs() {
  return serviceLandings.map((s) => s.slug);
}
