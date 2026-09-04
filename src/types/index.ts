export type ProjectCategory =
  | "full-stack"
  | "wordpress"
  | "shopify";

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
  /** Soft-disabled card (site offline / in progress) */
  disabled?: boolean;
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
  /** Short professional summary shown opposite the timeline card */
  highlight?: string;
  /** Compact focus labels for the companion panel */
  focus?: string[];
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
  role?: string;
  company?: string;
  project?: string;
  feedback: string;
  rating?: number;
  date?: string;
  verified?: boolean;
  endorsements?: string[];
  image?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
