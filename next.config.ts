import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Sources in /public/images are already compressed WebP/JPEG — skip runtime re-encode for faster loads */
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
