import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    step: 1,
    title: "Discovery",
    description: "Understand goals, users, scope and existing assets.",
  },
  {
    id: "planning",
    step: 2,
    title: "Planning",
    description: "Define architecture, stack, milestones and delivery plan.",
  },
  {
    id: "development",
    step: 3,
    title: "Development",
    description: "Build, integrate, test and provide progress updates.",
  },
  {
    id: "launch",
    step: 4,
    title: "Launch & Support",
    description: "Deploy, configure production and provide post-launch help.",
  },
];
