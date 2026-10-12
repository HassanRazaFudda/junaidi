import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProd = process.env.NODE_ENV === "production";

// Static-friendly CSP (no nonce: nonces force dynamic rendering).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com https://www.google-analytics.com",
  "media-src 'self' blob:",
  "font-src 'self'",
  "frame-src https://www.youtube-nocookie.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Rendering model (recommended from 16.4, default in 17) — code.md §3.1
  cacheComponents: true,
  partialPrefetching: true,

  reactCompiler: true,
  typedRoutes: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      // future CMS media host goes here
    ],
  },

  experimental: {
    agentUpgrade: "security",
    turbopackGc: true,
  },

  async headers() {
    return isProd ? [{ source: "/:path*", headers: securityHeaders }] : [];
  },

  async redirects() {
    return [
      // keep old URLs alive if the client had any
    ];
  },
};

export default withNextIntl(nextConfig);
