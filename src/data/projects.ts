import type { Project, ProjectCategory } from "@/types";

export const projectCollections: { id: ProjectCategory; label: string }[] = [
  { id: "wordpress", label: "WordPress" },
  { id: "shopify", label: "Shopify" },
  { id: "woocommerce", label: "WooCommerce" },
  { id: "full-stack", label: "Full Stack" },
];

export const projects: Project[] = [
  {
    id: "utilitytools",
    title: "UtilityTools",
    url: "https://utilitytools.in/",
    category: "full-stack",
    role: "Full-stack development, APIs, authentication and VPS deployment",
    type: "Multi-tool web platform",
    description:
      "A multi-tool platform with responsive interfaces, backend APIs, authentication and admin functionality.",
    contribution:
      "Built frontend and backend flows, then deployed the platform on a VPS with Nginx, PM2, domain and SSL setup.",
    challenge:
      "Deliver a production tool platform with authenticated access, admin controls and reliable hosting.",
    solution:
      "Implemented the React/Next.js frontend, Node.js APIs, MongoDB-backed data flows and VPS deployment with Nginx and PM2.",
    functionality: [
      "Responsive tool interfaces",
      "Authentication and admin flows",
      "Backend API integration",
      "Production VPS hosting",
    ],
    approach:
      "Shipped frontend and backend together, then hardened deployment with domain, SSL and process management.",
    result:
      "Live multi-tool platform at utilitytools.in with production hosting and ongoing maintenance capability.",
    technologies: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Nginx", "PM2"],
    image: "/images/projects/utilitytools.svg",
    imageMobile: "/images/projects/utilitytools.svg",
    featured: true,
    hasLiveUrl: true,
  },
  {
    id: "yogispeaks",
    title: "YogiSpeaks",
    url: "https://yogispeaks.com/",
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
      "Production education platform with admin-managed content and public access at yogispeaks.com.",
    technologies: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    image: "/images/projects/yogispeaks.svg",
    imageMobile: "/images/projects/yogispeaks.svg",
    featured: true,
    hasLiveUrl: true,
  },
  {
    id: "aivoxa-labs",
    title: "Aivoxa Labs",
    url: "https://aivoxalabs.com/",
    category: "full-stack",
    role: "Full-stack development, performance work and deployment",
    type: "Company website",
    description:
      "Company website built with Next.js and React, focused on clear presentation and production readiness.",
    contribution:
      "Implemented site functionality, performance improvements and VPS deployment with Nginx and SSL.",
    challenge:
      "Present the company clearly online with a fast, maintainable Next.js site ready for production hosting.",
    solution:
      "Built the site in Next.js/React, refined performance and deployed to a VPS with Nginx and SSL.",
    functionality: [
      "Marketing site pages",
      "Responsive layout system",
      "Performance-focused delivery",
      "VPS deployment with SSL",
    ],
    approach:
      "Prioritized clean page structure, production configuration and stable hosting from the start.",
    result:
      "Live company website at aivoxalabs.com on production infrastructure.",
    technologies: ["Next.js", "React", "VPS", "Nginx", "SSL"],
    image: "/images/projects/aivoxa.svg",
    imageMobile: "/images/projects/aivoxa.svg",
    featured: true,
    hasLiveUrl: true,
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
    image: "/images/projects/luminoguru.svg",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "placid-technologies",
    title: "Placid Technologies",
    url: "https://placidtechnologies.com/",
    category: "wordpress",
    role: "WordPress Developer",
    description:
      "Designed and developed responsive WordPress pages with content management and maintenance.",
    contribution:
      "Built page layouts, managed content structure and maintained site updates.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/placid.svg",
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
    image: "/images/projects/quiqlabs.svg",
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
    image: "/images/projects/resourceportal.svg",
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
    image: "/images/projects/realtime.svg",
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
    image: "/images/projects/propertywala.svg",
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
    image: "/images/projects/hexahome.svg",
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
    image: "/images/projects/boldify.svg",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "talwarsons",
    title: "Talwar Sons",
    url: "https://www.talwarsons.com/",
    category: "shopify",
    role: "Shopify Developer",
    description:
      "Shopify development for collections, product pages and a responsive storefront.",
    contribution:
      "Implemented storefront layouts and refined product presentation across devices.",
    technologies: ["Shopify", "Liquid", "HTML", "CSS"],
    image: "/images/projects/talwarsons.svg",
    featured: false,
    hasLiveUrl: true,
  },
  {
    id: "resourceportal-shop",
    title: "Resource Portal Shop",
    url: "https://shop.resourceportal.com/",
    category: "woocommerce",
    role: "WooCommerce Developer",
    description:
      "WooCommerce store covering catalogue presentation, shopping flows and storefront refinements.",
    contribution:
      "Improved storefront presentation and shopping-related page structure.",
    technologies: ["WooCommerce", "WordPress", "HTML", "CSS"],
    image: "/images/projects/shop-resource.svg",
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
    image: "/images/projects/sos.svg",
    featured: false,
    hasLiveUrl: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const moreProjects = projects.filter((project) => !project.featured);
