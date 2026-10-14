import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProd = process.env.NODE_ENV === "production";

// fix.md §5.1: demo content (sample packages/photos/testimonials, clearly
// labelled) can never reach the real production site. VERCEL_ENV is unset
// locally, so this only fires on an actual Vercel production deploy — a
// local `next build` with demo mode on (for our own review/testing) is
// unaffected.
if (process.env.NEXT_PUBLIC_CONTENT_MODE === "demo" && process.env.VERCEL_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_CONTENT_MODE=demo must never be set on a production deploy (fix.md §5.1). " +
      "Set it to 'live' (or unset it) in the production environment's variables.",
  );
}

// Static-friendly CSP (no nonce: nonces force dynamic rendering).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  // https://images.pexels.com: the hero's <video poster> (components/home/
  // hero.tsx) bypasses next/image on purpose — it's a plain attribute on a
  // native <video>, not an <Image>, so the browser fetches it directly
  // from Pexels rather than through /_next/image's same-origin proxy the
  // way every other photo on the site does. Same reasoning for
  // videos.pexels.com in media-src below — it's the hero's actual video
  // source. Neither was ever caught by dev-mode testing: these headers
  // only apply when isProd is true (next build / Docker), never under
  // `next dev`.
  "img-src 'self' data: blob: https://i.ytimg.com https://images.pexels.com https://www.google-analytics.com",
  "media-src 'self' blob: https://videos.pexels.com",
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
  // NEXT_OUTPUT=standalone (Dockerfile's build stage only) emits
  // .next/standalone, which the runner stage copies instead of full
  // node_modules. Conditional so a plain local `pnpm build` or a Vercel
  // deploy — neither of which sets this — stays exactly as it was.
  ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" } : {}),

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
      // Review-build-only licensed stock (fix.md §6.1) — each image's
      // credit/licence URL is tracked in ImageRef.credit and
      // ASSETS-NEEDED.md. Swapped for real/commissioned photography before
      // any production launch (DECISIONS.md).
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
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
