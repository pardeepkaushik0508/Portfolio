import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    /** Match real display sizes used in the portfolio grid / hero */
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [48, 64, 96, 128, 256, 384],
    /** Cache optimized variants for a year */
    minimumCacheTTL: 60 * 60 * 24 * 365,
    /** Prefer leaner defaults when quality prop is omitted */
    qualities: [60, 70, 75, 85],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
