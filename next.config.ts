import type { NextConfig } from "next";

/**
 * 301 redirect map. Add legacy URLs here when the owner supplies the old
 * site structure. Keep entries explicit (no wildcards) to avoid loops.
 */
const redirectMap: { source: string; destination: string }[] = [
  // Example: { source: "/old-path", destination: "/services" },
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75, 85, 90],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
  },
  async redirects() {
    return redirectMap.map((r) => ({ ...r, permanent: true }));
  },
  async rewrites() {
    // Browsers still probe /favicon.ico; serve the SVG icon instead of a 404.
    return [{ source: "/favicon.ico", destination: "/icon.svg" }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
