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
    metaTitle: "WordPress Developer | Elementor, WooCommerce & Custom Builds",
    metaDescription:
      "Hire Pardeep Kaushik — WordPress developer for business sites, Elementor layouts, WooCommerce stores, redesigns, migrations and WordPress speed optimization.",
    h1: "WordPress Developer for Business Websites That Stay Easy to Manage",
    intro:
      "Pardeep Kaushik is a WordPress developer who builds and improves business websites with clear structure, mobile-ready layouts and admin-friendly editing. Work covers custom builds, Elementor website design, WooCommerce stores, redesigns and performance fixes.",
    capabilities: [
      "Build a WordPress website from brief to launch",
      "Elementor layouts and reusable page templates",
      "WooCommerce catalogue, cart and checkout refinements",
      "WordPress redesign without losing brand clarity",
      "Plugin/theme troubleshooting and maintainable handoff",
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
      "website-speed-optimization",
      "wordpress-migration",
    ],
    relatedProjectIds: ["placid-technologies", "cactusjack-pc", "shur-tite"],
    faqs: [
      {
        question: "What does a WordPress developer do?",
        answer:
          "A WordPress developer plans, builds and maintains WordPress websites—themes or builders, plugins, WooCommerce, content structure, performance and secure deployment—so the site works for visitors and is manageable for the business.",
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
        question: "Do you optimize WordPress website speed?",
        answer:
          "Yes. Caching, image delivery, CSS/JS cleanup and Core Web Vitals improvements are available as focused speed projects or as part of a build.",
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
    metaTitle: "Shopify Developer | Store Design, Themes & Shopify 2.0",
    metaDescription:
      "Shopify developer for store setup, Shopify 2.0 themes, Liquid customization, redesigns and Shopify speed optimization.",
    h1: "Shopify Developer for Stores That Look Premium and Convert",
    intro:
      "Pardeep Kaushik builds and customizes Shopify stores for product brands—theme work, Shopify 2.0 sections, product presentation and speed-minded delivery.",
    capabilities: [
      "Shopify store setup and theme customization",
      "Shopify 2.0 sections and templates",
      "Collection, product and landing pages",
      "Shopify redesign and UX cleanup",
      "Shopify speed optimization",
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
    relatedSlugs: ["shopify-liquid-developer", "website-speed-optimization", "full-stack-developer"],
    relatedProjectIds: ["talwarsons", "getboldify", "resourceportal-shop"],
    faqs: [
      {
        question: "Do you create Shopify 2.0 stores?",
        answer:
          "Yes. Shopify 2.0 themes and Online Store 2.0 section patterns are part of current Shopify work.",
      },
      {
        question: "Can you redesign an existing Shopify store?",
        answer:
          "Yes. Redesigns can keep your catalogue and apps while improving layout, mobile UX and conversion clarity.",
      },
      {
        question: "Do you create custom Shopify sections?",
        answer:
          "Yes. Custom Liquid sections for hero, collection and product storytelling are available when the theme needs more than presets.",
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
    relatedSlugs: ["shopify-developer", "website-speed-optimization"],
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
    metaTitle: "Full Stack Developer | React, Next.js, Node.js & APIs",
    metaDescription:
      "Full stack developer for React/Next.js frontends, Node.js APIs, databases and VPS deployment—when a CMS alone is not enough. Hire Pardeep Kaushik in India.",
    h1: "Full Stack Developer for Custom Web Apps and Product Sites",
    intro:
      "As a full stack developer in India, I build applications that need more than a marketing CMS—React and Next.js interfaces, Node.js APIs, databases and production hosting. For India-focused hiring context, see the Full Stack Developer in India page.",
    capabilities: [
      "React and Next.js application development",
      "Node.js APIs and backend workflows",
      "MongoDB / PostgreSQL data models",
      "Auth, dashboards and admin tools",
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
    relatedSlugs: ["api-integration", "wordpress-developer", "shopify-developer", "full-stack-developer-india"],
    relatedProjectIds: ["utilitytools", "aivoxa-labs", "yogispeaks"],
    faqs: [
      {
        question: "What technologies do you use for full stack development?",
        answer:
          "Primarily React, Next.js, Node.js, TypeScript and databases such as MongoDB or PostgreSQL, with VPS/Nginx deployment when needed.",
      },
      {
        question: "Do you build custom dashboards and web applications?",
        answer:
          "Yes. Dashboards, multi-tool platforms and content admin systems are within full-stack scope.",
      },
      {
        question: "Do you work with React and Next.js?",
        answer:
          "Yes. React and Next.js are core tools for marketing sites that need app-like behavior and for SaaS-style products.",
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
    relatedSlugs: ["wordpress-developer", "shopify-developer", "elementor-developer"],
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
          "Yes. WordPress speed optimization and Shopify speed optimization are both part of the service.",
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
      "Hire Pardeep Kaushik as a WordPress developer in India when you need a business website, Elementor layout, WooCommerce store, redesign or migration—with mobile-ready pages and an admin-friendly structure your team can update.",
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
      "Hire Pardeep Kaushik as a Shopify developer in India for Shopify 2.0 themes, custom Liquid sections, store setup, redesigns and performance work—focused on clear product discovery and mobile shopping.",
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
      "website-speed-optimization",
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
];

export function getServiceLanding(slug: string) {
  return serviceLandings.find((s) => s.slug === slug) ?? null;
}

export function getAllServiceSlugs() {
  return serviceLandings.map((s) => s.slug);
}
