import type { Project, ProjectCategory } from "@/types";

export const projectCollections: { id: ProjectCategory; label: string }[] = [
  { id: "wordpress", label: "WordPress" },
  { id: "shopify", label: "Shopify" },
  { id: "full-stack", label: "Full Stack" },
];

export const projects: Project[] = [
  {
    id: "utilitytools",
    title: "UtilityTools",
    url: "https://utilitytools.in/",
    category: "full-stack",
    role: "Full-stack development, APIs, authentication and VPS deployment",
    type: "All-in-one utility tools platform",
    description:
      "Production SaaS-style platform with 1,400+ free online tools for PDF, AI, image, SEO, text and developer workflows.",
    contribution:
      "Built frontend and backend flows, tool categories, authentication and deployed the platform on a VPS with Nginx, PM2, domain and SSL.",
    challenge:
      "Ship a high-scale multi-tool product with fast client-side pipelines, clear discovery and reliable production hosting.",
    solution:
      "Implemented Next.js/React interfaces, Node.js APIs, MongoDB-backed data flows and hardened VPS deployment.",
    functionality: [
      "1,400+ tool catalogue across major categories",
      "Responsive desktop and mobile experience",
      "Authentication and admin-ready architecture",
      "Production VPS hosting with SSL",
    ],
    approach:
      "Shipped frontend and backend together, then hardened deployment with domain, SSL and process management.",
    result:
      "Live multi-tool platform at utilitytools.in with production hosting and ongoing maintenance capability.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Nginx",
      "PM2",
    ],
    image: "/images/projects/utilitytools.webp",
    imageMobile: "/images/projects/utilitytools.webp",
    featured: true,
    hasLiveUrl: true,
  },
  {
    id: "talwarsons",
    title: "Talwar Sons",
    url: "https://www.talwarsons.com/",
    category: "shopify",
    role: "Shopify development — luxury jewellery storefront",
    type: "Luxury jewellery eCommerce (Shopify)",
    description:
      "Heritage jewellery brand storefront for gold, diamond, polki and bridal collections — elegant, modern and fully responsive.",
    contribution:
      "Implemented Shopify storefront layouts, collection and product presentation, and refined the shopping experience across devices.",
    challenge:
      "Present a 125+ year jewellery legacy online with a premium visual system that still converts on mobile.",
    solution:
      "Built a Shopify theme experience with clear collection hierarchy, bridal storytelling and responsive product discovery.",
    functionality: [
      "Gold, diamond and bridal collections",
      "Product and collection page layouts",
      "Responsive luxury storefront",
      "Enquiry-led shopping flows",
    ],
    approach:
      "Prioritized photography-led merchandising, clean navigation and mobile-first product browsing.",
    result:
      "Live Shopify jewellery store at talwarsons.com with polished desktop and mobile storefronts.",
    technologies: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/talwarsons.webp",
    imageMobile: "/images/projects/talwarsons.webp",
    featured: true,
    hasLiveUrl: true,
  },
  {
    id: "aivoxa-labs",
    title: "Aivoxa Labs",
    url: "https://aivoxalabs.com/",
    category: "full-stack",
    role: "Full-stack development, performance work and deployment",
    type: "Software & AI company website",
    description:
      "Business website for an AI and software development studio — services, case studies, technical SEO content and lead capture.",
    contribution:
      "Implemented site functionality, performance improvements and VPS deployment with Nginx and SSL.",
    challenge:
      "Present engineering services clearly with a fast, maintainable Next.js marketing site ready for production.",
    solution:
      "Built the site in Next.js/React, refined Core Web Vitals-oriented delivery and deployed to production hosting.",
    functionality: [
      "Services and capability pages",
      "Case-study style project presentation",
      "Lead / estimate capture flows",
      "Performance-focused delivery",
    ],
    approach:
      "Prioritized clear information architecture, production configuration and stable hosting.",
    result:
      "Live company website at aivoxalabs.com on production infrastructure.",
    technologies: ["Next.js", "React", "VPS", "Nginx", "SSL"],
    image: "/images/projects/aivoxa.webp",
    imageMobile: "/images/projects/aivoxa.webp",
    featured: true,
    hasLiveUrl: true,
  },
  {
    id: "placid-technologies",
    title: "Placid Technologies",
    url: "https://placidtechnologies.com/",
    category: "wordpress",
    role: "WordPress development — digital agency site",
    type: "Corporate digital agency website",
    description:
      "New Jersey digital agency website covering web development, SEO and growth services — modern, conversion-focused and SEO-ready.",
    contribution:
      "Designed and developed responsive WordPress pages with structured services content and ongoing maintenance.",
    challenge:
      "Give a digital agency a clear services narrative and blog/insights structure that supports lead generation.",
    solution:
      "Built WordPress page layouts for develop/grow offerings, insights and contact conversion paths.",
    functionality: [
      "Services and capability sections",
      "Insights / blog listings",
      "Responsive agency layouts",
      "Lead-oriented contact flows",
    ],
    approach:
      "Focused on clean corporate UX, mobile friendliness and maintainable WordPress content structure.",
    result:
      "Live agency website at placidtechnologies.com.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript", "SEO"],
    image: "/images/projects/placid.webp",
    imageMobile: "/images/projects/placid.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "wheel-of-bliss",
    title: "Wheel of Bliss",
    url: "https://www.wheelofbliss.org/",
    category: "wordpress",
    role: "WordPress development — retreat center website",
    type: "Hospitality / retreat business website",
    description:
      "Retreat center website for a Blue Ridge mountain sanctuary — accommodations, retreats, weddings and booking-oriented content.",
    contribution:
      "Implemented WordPress layouts, immersive hero storytelling and content structure for accommodations and retreat offerings.",
    challenge:
      "Translate a nature-led hospitality brand into a calm, professional site that helps guests understand the property and enquire.",
    solution:
      "Built a photography-led WordPress experience with clear paths to accommodations, retreats and contact.",
    functionality: [
      "Accommodations and retreat pages",
      "Immersive hero and story sections",
      "Responsive hospitality layouts",
      "Enquiry / contact pathways",
    ],
    approach:
      "Let landscape imagery lead, then pair it with simple navigation and conversion CTAs.",
    result:
      "Live retreat website at wheelofbliss.org.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/wheelofbliss.webp",
    imageMobile: "/images/projects/wheelofbliss.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "cannyheads",
    title: "Canny Heads",
    url: "https://www.cannyheads.com/",
    category: "wordpress",
    role: "WordPress development — consulting & business platform",
    type: "Consulting and business growth website",
    description:
      "Consulting group website for jewellery retail growth, training, software and related ventures — built for trust and lead generation.",
    contribution:
      "Developed responsive WordPress pages covering services, businesses ecosystem and conversion CTAs.",
    challenge:
      "Present multiple ventures under one consulting brand without confusing the primary growth message.",
    solution:
      "Structured WordPress content around consulting offers, venture cards and clear “start a conversation” CTAs.",
    functionality: [
      "Consulting and services sections",
      "Business / venture highlights",
      "Responsive corporate layouts",
      "Lead capture CTAs",
    ],
    approach:
      "Clean typography, trust-building layout and mobile-ready conversion paths.",
    result:
      "Live consulting website at cannyheads.com.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/cannyheads.webp",
    imageMobile: "/images/projects/cannyheads.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "cactusjack-pc",
    title: "Cactus Jack Pest Control",
    url: "https://www.cactusjackpc.com/",
    category: "wordpress",
    role: "Business website development",
    type: "Local service business website",
    description:
      "Arizona pest control business site with strong local SEO messaging, service pages and quote / call CTAs.",
    contribution:
      "Built a conversion-focused business website with service taxonomy, guarantees messaging and lead forms.",
    challenge:
      "Help a local service company stand out with clear offers, phone CTAs and trust signals (reviews, licensing).",
    solution:
      "Designed a high-contrast marketing site with service hubs, quote forms and call-first navigation.",
    functionality: [
      "Service category pages",
      "Free quote / call CTAs",
      "Trust and guarantee messaging",
      "Mobile-first local business UX",
    ],
    approach:
      "Lead with the problem/solution headline, then route users to quote or call immediately.",
    result:
      "Live business website at cactusjackpc.com.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/cactusjackpc.webp",
    imageMobile: "/images/projects/cactusjackpc.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "cactusjack-properties",
    title: "Cactus Jack Properties",
    url: "https://www.cactusjackproperties.com/",
    category: "wordpress",
    role: "Business website development — property management",
    type: "Property management business website",
    description:
      "Property management site for vacancies, floor plans, tenant portal links, rent payment and maintenance requests.",
    contribution:
      "Implemented business website structure for tenants and prospects with clear contact and portal entry points.",
    challenge:
      "Serve both prospective renters and current tenants without cluttering the homepage.",
    solution:
      "Organized navigation around vacancies, tenants tools and contact — with prominent pay-rent and phone actions.",
    functionality: [
      "Vacancies and floor-plan paths",
      "Tenant portal / pay rent links",
      "Maintenance request entry",
      "Contact-first header actions",
    ],
    approach:
      "Keep the UI minimal and functional so operational tasks stay one click away.",
    result:
      "Live properties website at cactusjackproperties.com.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/cactusjackproperties.webp",
    imageMobile: "/images/projects/cactusjackproperties.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "shur-tite",
    title: "Shur-Tite",
    url: "https://shur-tite.com/",
    category: "wordpress",
    role: "Business website development — industrial / safety products",
    type: "Manufacturer business website",
    description:
      "Highway and pedestrian safety products manufacturer site — product catalogue, applications and distributor-friendly resources.",
    contribution:
      "Built a professional business website with product and application navigation, search and clear contact paths.",
    challenge:
      "Support contractors and agencies finding the right safety products quickly across categories and applications.",
    solution:
      "Structured product taxonomy, application hubs and a strong industrial visual identity with conversion CTAs.",
    functionality: [
      "Product and application browsing",
      "Resources / catalog pathways",
      "APL/QPL tracker entry point",
      "Responsive industrial layout",
    ],
    approach:
      "Pair bold safety messaging with clear product discovery and contact options.",
    result:
      "Live manufacturer website at shur-tite.com.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/shurtite.webp",
    imageMobile: "/images/projects/shurtite.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "yogispeaks",
    title: "YogiSpeaks",
    url: null,
    category: "full-stack",
    role: "Full-stack development, admin panel, APIs and deployment",
    type: "Education and content-management platform",
    description:
      "Education and content platform with centrally managed teachers, free notes, paid notes and public website content.",
    contribution:
      "Implemented responsive listings, admin CRUD workflows, protected content structures, API integration and PostgreSQL-backed functionality.",
    challenge:
      "The project required centrally managed teachers, free notes, paid notes and public website content.",
    solution:
      "Implemented responsive listings, admin CRUD workflows, protected content structures, API integration and PostgreSQL-backed functionality.",
    functionality: [
      "Teacher and content administration",
      "Free and paid note structures",
      "Public content listings",
      "Protected API-backed workflows",
    ],
    approach:
      "Connected Next.js frontend with NestJS APIs and Prisma/PostgreSQL so admin and public experiences share one data model.",
    result:
      "Platform built end-to-end — public site currently offline while hosting is updated.",
    technologies: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    image: "/images/projects/yogispeaks.webp",
    imageMobile: "/images/projects/yogispeaks.webp",
    featured: false,
    hasLiveUrl: false,
    disabled: true,
  },
  {
    id: "luminoguru",
    title: "Luminoguru",
    url: "https://luminoguru.com/",
    category: "wordpress",
    role: "WordPress Developer",
    description:
      "Responsive WordPress website covering layouts, theme customization and ongoing improvements.",
    contribution:
      "Implemented and refined WordPress layouts with Elementor-based page structure.",
    technologies: ["WordPress", "Elementor", "HTML", "CSS"],
    image: "/images/projects/luminoguru.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "quiqlabs",
    title: "Quiq Labs",
    url: "https://quiqlabs.com/",
    category: "wordpress",
    role: "WordPress Developer",
    description:
      "Customized WordPress pages with responsive layouts and design implementation.",
    contribution:
      "Developed page templates, refined responsiveness and applied design updates.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/quiqlabs.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "resourceportal",
    title: "Resource Portal",
    url: "https://resourceportal.com/",
    category: "wordpress",
    role: "WordPress Developer",
    description:
      "WordPress development focused on structured content and responsive page layouts.",
    contribution:
      "Implemented content-focused pages and responsive WordPress layouts.",
    technologies: ["WordPress", "Elementor", "HTML", "CSS"],
    image: "/images/projects/resourceportal.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "realtime-realtors",
    title: "Realtime Realtors",
    url: "https://www.realtimerealtors.in/",
    category: "wordpress",
    role: "WordPress Developer",
    description:
      "Real-estate WordPress site with responsive layouts and content-focused structure.",
    contribution:
      "Built property-oriented pages and improved mobile presentation.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/realtime.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "propertywala",
    title: "PropertyWala",
    url: "https://propertywala.com/",
    category: "wordpress",
    role: "WordPress Developer",
    description:
      "WordPress development and layout work for a property-focused website experience.",
    contribution:
      "Contributed page-level WordPress implementation and layout refinements.",
    technologies: ["WordPress", "HTML", "CSS"],
    image: "/images/projects/propertywala.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "hexahome",
    title: "HexaHome",
    url: "https://www.hexahome.in/",
    category: "wordpress",
    role: "WordPress Developer",
    description:
      "WordPress website contributions covering responsive design and page implementation.",
    contribution:
      "Supported responsive page development and WordPress layout updates.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/hexahome.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "getboldify",
    title: "Get Boldify",
    url: "https://getboldify.com/",
    category: "shopify",
    role: "Shopify Developer",
    description:
      "Shopify storefront work covering theme customization and product presentation.",
    contribution:
      "Customized theme sections and responsive product/collection presentation.",
    technologies: ["Shopify", "Liquid", "HTML", "CSS"],
    image: "/images/projects/boldify.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "resourceportal-shop",
    title: "Resource Portal Shop",
    url: "https://shop.resourceportal.com/",
    category: "shopify",
    role: "Shopify Developer",
    description:
      "Ecommerce storefront covering catalogue presentation, shopping flows and storefront refinements.",
    contribution:
      "Improved storefront presentation and shopping-related page structure.",
    technologies: ["Shopify", "Liquid", "HTML", "CSS"],
    image: "/images/projects/shop-resource.webp",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "society-of-scholars",
    title: "Society of Scholars",
    url: "https://societyofscholars.com/",
    category: "full-stack",
    role: "Front-End Developer",
    description:
      "Front-end work on a full-stack web application with responsive layouts and interactive components.",
    contribution:
      "Developed responsive interfaces, page structure and interactive website components.",
    technologies: ["React", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/sos.webp",
    featured: false,
    hasLiveUrl: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

/** Include featured projects in More Projects tabs (Talwar Sons, UtilityTools, Aivoxa, etc.). */
export const moreProjects = [...projects].sort((a, b) => {
  if (a.disabled && !b.disabled) return 1;
  if (!a.disabled && b.disabled) return -1;
  return 0;
});
