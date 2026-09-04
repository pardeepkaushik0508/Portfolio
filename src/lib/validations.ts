import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(200, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter your phone number")
    .max(30, "Phone number is too long")
    .refine(
      (value) => /^[+]?[\d\s()-]{7,20}$/.test(value),
      "Please enter a valid mobile number",
    ),
  details: z
    .string()
    .trim()
    .min(10, "Please share a short requirement")
    .max(4000, "Message is too long"),
  /** Honeypot */
  website: z.string().optional(),
  /** Optional source label for analytics / email subject */
  source: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** @deprecated kept for any leftover imports */
export const contactProjectTypeOptions = [
  "Full-Stack Development",
  "WordPress & WooCommerce",
  "Shopify Development",
  "Website Redesign & Optimization",
  "Other",
] as const;

/** @deprecated */
export const contactBudgetOptions = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Hourly / Retainer",
  "Not sure yet",
] as const;

/** @deprecated */
export const contactTimelineOptions = [
  "ASAP",
  "1 – 2 weeks",
  "2 – 4 weeks",
  "1 – 3 months",
  "Flexible",
] as const;

/** @deprecated Use contactProjectTypeOptions */
export const contactServiceOptions = contactProjectTypeOptions;
