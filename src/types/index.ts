export type ProjectCategory =
  | "full-stack"
  | "wordpress"
  | "shopify"
  | "woocommerce";

export interface Project {
  id: string;
  title: string;
  url: string | null;
  category: ProjectCategory;
  role: string;
  description: string;
  technologies: string[];
  contribution: string;
  image: string;
  imageMobile?: string;
  featured: boolean;
  hasLiveUrl: boolean;
  type?: string;
  challenge?: string;
  solution?: string;
  functionality?: string[];
  approach?: string;
  result?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  outcome: string;
  capabilities: string[];
  relevantProject: string;
  relevantProjectHref: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface WhyHireItem {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  project?: string;
  feedback: string;
  image?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}
