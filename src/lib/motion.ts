/**
 * Shared animation language for the portfolio.
 * Prefer these tokens over hard-coded durations/easings in components.
 */
export const EASE = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  soft: [0.33, 1, 0.68, 1] as const,
  spring: {
    type: "spring" as const,
    stiffness: 260,
    damping: 24,
    mass: 0.4,
  },
  magnetic: {
    stiffness: 260,
    damping: 20,
    mass: 0.35,
  },
  tilt: {
    stiffness: 180,
    damping: 18,
    mass: 0.4,
  },
  parallax: {
    stiffness: 55,
    damping: 18,
    mass: 0.5,
  },
};

export const DURATION = {
  micro: 0.2,
  hover: 0.35,
  reveal: 0.7,
  section: 0.85,
  hero: 1.1,
  ambient: 6,
};

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
};

export const PERSPECTIVE = {
  near: 600,
  mid: 1000,
  far: 1400,
};

export const TILT = {
  desktop: 8,
  tablet: 4,
  mobile: 0,
};

export const PARALLAX = {
  desktop: 1,
  tablet: 0.45,
  mobile: 0.2,
};

export const HOVER_DEPTH = {
  lift: 8,
  shadow: "0 24px 48px rgba(12, 18, 16, 0.14)",
  z: 28,
};

/**
 * Intersection defaults for scroll reveals.
 * Avoid negative bottom rootMargin — it prevents footer / last-section
 * elements from ever intersecting when the user reaches page end.
 * Positive bottom margin expands the detection zone so content reveals
 * slightly before it fully enters the viewport.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.05 as const,
  margin: "0px 0px 18% 0px" as const,
};
