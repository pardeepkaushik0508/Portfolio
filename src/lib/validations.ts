import { z } from "zod";

export const contactProjectTypeOptions = [
  "Full-Stack Development",
  "WordPress & WooCommerce",
  "Shopify Development",
  "Website Redesign & Optimization",
  "Other",
] as const;

export const contactBudgetOptions = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Hourly / Retainer",
  "Not sure yet",
] as const;

export const contactTimelineOptions = [
  "ASAP",
  "1 – 2 weeks",
  "2 – 4 weeks",
  "1 – 3 months",
  "Flexible",
] as const;

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
    .max(30, "Phone number is too long")
    .refine(
      (value) => value === "" || /^[+]?[\d\s()-]{7,20}$/.test(value),
      "Please enter a valid mobile number",
    )
    .optional(),
  projectType: z.enum(contactProjectTypeOptions, {
    message: "Please select a project type",
  }),
  details: z
    .string()
    .trim()
    .min(20, "Please share a bit more about your project")
    .max(4000, "Project details are too long"),
  budget: z
    .union([z.enum(contactBudgetOptions), z.literal("")])
    .optional(),
  timeline: z
    .union([z.enum(contactTimelineOptions), z.literal("")])
    .optional(),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** @deprecated Use contactProjectTypeOptions */
export const contactServiceOptions = contactProjectTypeOptions;
