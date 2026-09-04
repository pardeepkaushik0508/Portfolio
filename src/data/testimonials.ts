import type { Testimonial } from "@/types";

/** Verified client testimonials from Upwork and LinkedIn. */
export const testimonials: Testimonial[] = [
  {
    id: "anitha-venkat",
    name: "Anitha Venkat",
    role: "Shop owner & jewelry broker",
    project: "Dynamic jewellery website",
    feedback:
      "Good work, friendly approach. Fast acting. Thanks.",
    rating: 5,
    date: "May 2026",
    verified: true,
    endorsements: [
      "Committed to Quality",
      "Solution Oriented",
      "Accountable for Outcomes",
    ],
    sourceUrl: "https://www.upwork.com/freelancers/pardeepwebdev",
    sourceLabel: "View on Upwork",
  },
  {
    id: "prabhjot-k",
    name: "Prabhjot K.",
    role: "SEO Executive",
    project: "WordPress portfolio website",
    feedback:
      "Pardeep did a great job developing my portfolio website in WordPress. He understood my requirements well, created a clean and professional design, and made sure the website was responsive across all devices. Communication was smooth, and he completed the requested changes quickly. I'm very happy with the final result and would definitely recommend him for WordPress development projects.",
    rating: 5,
    date: "Aug 2026",
    verified: true,
    sourceLabel: "Client endorsement",
  },
  {
    id: "anil-walia",
    name: "Anil Walia",
    project: "Website development",
    feedback:
      "Pradeep did a great job with the website development. He was professional, responsive, and understood our requirements well. The communication throughout the project was smooth, and he was quick to make the required changes. Overall, I'm very happy with the quality of work and would definitely recommend his services.",
    rating: 5,
    verified: true,
    sourceUrl: "https://www.linkedin.com/in/pardeep-kaushik-29206722a",
    sourceLabel: "Shared on LinkedIn",
  },
];
