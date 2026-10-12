# Junaidi Group Website — Code Standard

Companion files: `guide.md` (what to build and what the site may claim), `design.md` (how it looks and moves).
This file decides **how** it is built. Versions were checked against the npm registry on **12 October 2026**.

---

## 0. Non-negotiables

1. **Server Components by default.** `"use client"` only on small leaf islands that need state, effects or browser APIs.
2. **Content never lives in components.** Every package, season, review, video and setting comes through the content layer (§7), so swapping in a CMS later touches one folder.
3. **Static by default.** Marketing pages prerender. Anything dynamic must be a conscious, documented exception.
4. **Progressive enhancement.** Every page is readable and usable with JavaScript off and with `prefers-reduced-motion: reduce`. Animation enhances server-rendered HTML; it never creates content.
5. **Validated at the edges.** Content, env vars and form input pass through Zod schemas. Bad data fails the build, not the user.
6. **No invented facts.** Missing client data renders an honest pending state ("Details being confirmed — message us"), never placeholder prices or fake reviews.
7. **Budgets are tests.** Performance and accessibility budgets run in CI and block merges.

---

## 1. Versions

### 1.1 Pinned stack (latest stable on 12 Oct 2026)

| Package | Version | Notes |
|---|---|---|
| Node.js | **24 LTS** now (Active LTS) | Node 26 enters Active LTS on **28 Oct 2026**; switch `.nvmrc` and CI to 26 after that date. Next 16.4 requires ≥ 20.9 |
| pnpm | **12.11.2** | Set via `packageManager` field |
| next | **16.4.0** | Released 6 Oct 2026. Cache Components now recommended for all apps |
| react / react-dom | **19.3.0** | Stable View Transitions, Fragment Refs |
| typescript | **6.0.3** | **Not 7.0.2 — see §1.2** |
| tailwindcss / @tailwindcss/postcss | **4.3.3** | CSS-first config, no `tailwind.config.js` |
| motion | **14.1.0** | Formerly Framer Motion. Import from `motion/react` |
| gsap | **3.15.0** | All plugins (ScrollTrigger, DrawSVG, SplitText) ship in the public package |
| @gsap/react | **2.1.2** | `useGSAP` hook |
| lenis | **1.3.26** | Optional smooth scroll, desktop only |
| zod | **4.6.6** | |
| next-intl | **4.14.9** | Supports Next 16 |
| @t3-oss/env-nextjs | **0.13.11** | Typed, validated env |
| schema-dts | **2.1.0** | Typed JSON-LD |
| resend | **6.32.1** | Inquiry emails |
| @upstash/ratelimit | **2.2.0** | Form rate limiting (optional) |
| @next/third-parties | **16.4.0** | GA4 after consent |
| clsx / tailwind-merge | **2.1.1 / 3.7.0** | `cn()` helper |
| lucide-react | **1.55.0** | Icons (import individually) |
| sharp | **0.35.5** | Image optimisation (self-host) |
| babel-plugin-react-compiler | **1.0.0** | Needed while using the stable (Babel) React Compiler |
| eslint / eslint-config-next | **10.12.0 / 16.4.0** | Flat config |
| prettier / prettier-plugin-tailwindcss | **3.9.10 / 0.8.1** | |
| vitest | **5.0.4** | Unit tests |
| @playwright/test / @axe-core/playwright | **1.64.0 / 4.13.0** | E2E + accessibility |
| husky / lint-staged | **9.1.7 / 17.6.0** | Pre-commit |
| @types/react / @types/node | **19.3.0 / match Node major** | Use `@types/node@24` while on Node 24 |

Future CMS (not installed in Phase 1): **payload 3.90.2** (+ `@payloadcms/next`, `@payloadcms/db-postgres` 3.90.2; peer range covers Next ≥ 16.3.3). Payload 4 is in beta; wait for stable.

### 1.2 Why TypeScript 6, not 7

TypeScript 7.0.2 (the native Go compiler) is the npm `latest`, and Next 16.4 can type-check with it via `experimental.useTypeScriptCli`. But `eslint-config-next@16.4.0` depends on `typescript-eslint@^8`, whose peer range is `typescript >=4.8.4 <6.1.0`. Installing TS 7 breaks type-aware linting.

**Rule:** use `typescript@6.0.3`. Re-check when typescript-eslint publishes TS 7 support:
```bash
pnpm view typescript-eslint peerDependencies
```

### 1.3 Version policy

- Exact versions in `package.json` (no `^`). Upgrades are deliberate PRs.
- pnpm's `minimumReleaseAge` (1 day by default since pnpm 11) blocks brand-new releases; we raise it to 3 days. Security fixes can bypass it via `pnpm audit --fix`.
- Before scaffolding, re-check latest with `pnpm view <pkg> version` — this table is a snapshot.
- Next.js upgrades: `npx next@canary upgrade --agent=latest` produces version-specific migration steps.

---

## 2. Project setup

```bash
# Node 24 LTS, pnpm via corepack or standalone
corepack enable && corepack prepare pnpm@12.11.2 --activate

pnpm create next-app@latest junaidi-web
#   TypeScript: yes · ESLint: yes · Tailwind: yes · src/ directory: yes
#   App Router: yes · import alias: @/*  · recommended settings (Cache Components on)

cd junaidi-web

pnpm add next@16.4.0 react@19.3.0 react-dom@19.3.0 \
  motion@14.1.0 gsap@3.15.0 @gsap/react@2.1.2 lenis@1.3.26 \
  zod@4.6.6 next-intl@4.14.9 @t3-oss/env-nextjs@0.13.11 \
  clsx@2.1.1 tailwind-merge@3.7.0 lucide-react@1.55.0 \
  resend@6.32.1 @next/third-parties@16.4.0 server-only@0.0.1 sharp@0.35.5

pnpm add -D typescript@6.0.3 @types/react@19.3.0 @types/node@24 \
  tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 \
  eslint@10.12.0 eslint-config-next@16.4.0 \
  prettier@3.9.10 prettier-plugin-tailwindcss@0.8.1 \
  babel-plugin-react-compiler@1.0.0 schema-dts@2.1.0 \
  vitest@5.0.4 @playwright/test@1.64.0 @axe-core/playwright@4.13.0 \
  husky@9.1.7 lint-staged@17.6.0

pnpm approve-builds   # allow only what's needed (sharp, @tailwindcss/oxide, esbuild-type deps)
```

### 2.1 `pnpm-workspace.yaml`

pnpm 11+ reads settings from here, not from `package.json`.

```yaml
# Supply-chain safety
minimumReleaseAge: 4320        # 3 days
blockExoticSubdeps: true
strictDepBuilds: true

# Only these packages may run install scripts
allowBuilds:
  sharp: true
  "@tailwindcss/oxide": true
  unrs-resolver: true
```

### 2.2 `package.json` (relevant parts)

```json
{
  "name": "junaidi-web",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@12.11.2",
  "engines": { "node": ">=24.0.0" },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typegen": "next typegen",
    "typecheck": "next typegen && tsc --noEmit",
    "lint": "eslint . --max-warnings=0",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test",
    "check": "pnpm typecheck && pnpm lint && pnpm format:check && pnpm test",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix --max-warnings=0", "prettier --write"],
    "*.{css,md,json,yaml}": ["prettier --write"]
  }
}
```

`.nvmrc` → `24` (change to `26` after 28 Oct 2026).

---

## 3. Configuration

### 3.1 `next.config.ts`

```ts
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
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  // Rendering model (recommended from 16.4, default in 17)
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
```

Notes:
- The Rust React Compiler (`experimental.turbopackRustReactCompiler`) is faster but experimental — enable only after the site is stable and tests pass with it.
- Do not add flags you cannot explain. Every `experimental` key gets a comment.

### 3.2 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["dom", "dom.iterable", "es2023"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "allowJs": false,
    "skipLibCheck": true,
    "noEmit": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

If `create-next-app` generates a different `jsx` value, keep the generated one.

### 3.3 `eslint.config.mjs`

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "next-env.d.ts", "playwright-report/**"]),
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["framer-motion"], message: "Use 'motion/react'." },
            { group: ["@/content/local/*"], message: "Import content through '@/content/queries' only." },
          ],
          paths: [
            { name: "gsap", message: "Import GSAP dynamically inside a client enhancer (see code.md §11)." },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/**/*.enhancer.tsx", "src/lib/gsap.ts"],
    rules: { "no-restricted-imports": "off" },
  },
]);
```

### 3.4 `.prettierrc.json`

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/styles/globals.css",
  "tailwindFunctions": ["cn"]
}
```

---

## 4. Folder structure

```
src/
  app/
    [locale]/
      layout.tsx                 root layout: <html lang dir>, fonts, providers
      page.tsx                   home
      hajj/
        page.tsx                 hub → redirects or links to current season
        [season]/page.tsx
        [season]/[slug]/page.tsx
        how-private-hajj-booking-works/page.tsx
        past-groups/page.tsx
        faq/page.tsx
      umrah/…                    same pattern
      about/page.tsx
      about/credentials/page.tsx
      contact/page.tsx
      not-found.tsx
    api/revalidate/route.ts      future CMS webhook (§19)
    sitemap.ts
    robots.ts
    manifest.ts
  components/
    ui/                          primitives: button, link, container, section, drawer, accordion, tabs
    layout/                      header, footer, season-strip, sticky-contact-bar, language-toggle
    home/                        hero, services-index, credentials, packages-preview, past-groups, reviews, office
    route/                       manasik-route.tsx (server), route-map.tsx (SVG), manasik-route.enhancer.tsx (client)
    package/                     package-row, package-facts, compare-table, inclusions-list, itinerary, booking-steps
    media/                       hero-video.client.tsx, youtube-facade.client.tsx, lightbox.client.tsx
    forms/                       inquiry-form.client.tsx, actions.ts
    motion/                      motion-provider.client.tsx, smooth-scroll.client.tsx
  content/
    schema.ts                    Zod schemas = single source of truth for content shape
    types.ts                     z.infer types
    repository.ts                ContentRepository interface
    local/                       Phase 1 adapter + typed data files
      adapter.ts
      data/seasons.ts, packages/*.ts, reviews.ts, videos.ts, credentials.ts, site.ts
    queries.ts                   cached, tagged read functions (the only import used by app/)
    localize.ts                  LocalizedText helpers
  i18n/
    routing.ts  request.ts  navigation.ts
  messages/
    en.json  ur.json             UI strings only (not content)
  lib/
    cn.ts  env.ts  whatsapp.ts  season.ts  seo.ts  jsonld.ts  analytics.ts  format.ts
  styles/
    globals.css
  proxy.ts                       next-intl locale routing (Next 16 name for middleware)
tests/
  unit/  e2e/
public/
  media/  (only static brand assets; content media comes via content layer)
```

**Conventions**
- File names in kebab-case. Client components end in `.client.tsx`; scroll enhancers end in `.enhancer.tsx`. You can see the client boundary from the file tree.
- **No barrel files** (`index.ts` re-exports). They defeat tree-shaking and blur client/server boundaries.
- One component per file; components over ~200 lines get split.
- `server-only` imported at the top of every module under `content/`, `lib/env.ts` server section, and `forms/actions.ts`.

---

## 5. Styling

### 5.1 `src/styles/globals.css` (Tailwind 4, CSS-first)

```css
@import "tailwindcss";

/* Design tokens from design.md §4 */
@theme {
  --color-crimson: #A00C20;
  --color-crimson-night: #D2404F;   /* line/pins on navy only */
  --color-ink: #111726;
  --color-marble: #ECEEEA;
  --color-paper: #FFFFFF;
  --color-haze: #D3DEE5;
  --color-stone: #5E655F;
  --color-ok: #2E6B4E;
  --color-line: rgb(17 23 38 / 0.14);

  --radius-control: 6px;
  --radius-panel: 14px;

  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);

  --text-display: clamp(2.5rem, 1.2rem + 4.2vw, 4.5rem);
  --text-h1: clamp(2.25rem, 1.4rem + 2.8vw, 3.75rem);
  --text-h2: clamp(1.75rem, 1.3rem + 1.4vw, 2.25rem);
  --text-h3: 1.5rem;
  --text-lead: 1.3125rem;
  --text-body: 1.125rem;
}

/* Fonts come from next/font CSS variables; `inline` resolves them at use time */
@theme inline {
  --font-sans: var(--font-archivo), system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-urdu: var(--font-nastaliq), serif;
  --font-arabic: var(--font-amiri), serif;
}

@layer base {
  :root {
    --route-bg: var(--color-marble);
    --route-ink: var(--color-ink);
    color-scheme: light;
  }
  html { background: var(--color-marble); color: var(--color-ink); }
  body { font-family: var(--font-sans); font-size: var(--text-body); line-height: 1.6; }
  html[lang="ur"] body { font-family: var(--font-urdu); font-size: 1.25rem; line-height: 2; }
  :focus-visible { outline: 2px solid var(--color-crimson); outline-offset: 3px; }
  .font-display { font-variation-settings: "wdth" 112; font-weight: 650; letter-spacing: -0.01em; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

Rules:
- Use **logical properties** utilities (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`) everywhere so Urdu RTL works without overrides.
- No arbitrary hex values in components. If a colour isn't a token, it doesn't belong.
- `cn()` merges classes:
  ```ts
  // src/lib/cn.ts
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
  ```

### 5.2 Fonts (`src/app/[locale]/fonts.ts`)

```ts
import { Archivo, Noto_Nastaliq_Urdu, Amiri } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
  preload: false, // only preloaded by the Urdu layout
});

export const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});
```

Fonts are self-hosted by `next/font` at build time: no request to Google at runtime, which also keeps the CSP simple.

---

## 6. Rendering and caching

The site is ~95% static. Use the Cache Components model deliberately.

### 6.1 Rules

- Root locale layout declares `export const ensureStatic = "navigation";` — the build **fails** if any page in the site accidentally becomes dynamic. Remove it only on a route that genuinely needs request-time data, with a comment explaining why.
- All content reads go through `'use cache'` functions in `content/queries.ts` with `cacheLife` and `cacheTag`.
- Dynamic routes export `generateStaticParams` so every package page is prerendered.
- `params` is a Promise. Use the generated `PageProps<'/route'>` helper types (`pnpm typegen`).
- **Don't read `searchParams` on marketing pages** (it makes them dynamic). Package filters and comparison state live in client state; deep-linkable state goes in the hash.
- Time-based logic (season deadline) runs **inside** a cached function with `cacheLife("hours")`, so the page stays static and refreshes hourly:

```ts
// src/content/queries.ts
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { repository } from "@/content/repository";
import type { Locale } from "@/i18n/routing";

export async function getSeasonBanner(locale: Locale) {
  "use cache";
  cacheLife("hours");
  cacheTag("seasons");
  const season = await repository.getCurrentHajjSeason();
  if (!season || Date.now() > Date.parse(season.bookingDeadline)) return null;
  return { message: season.stripMessage[locale] ?? season.stripMessage.en, href: `/hajj/${season.slug}` } as const;
}

export async function getPackage(type: "hajj" | "umrah", slug: string) {
  "use cache";
  cacheLife("max");
  cacheTag("packages", `package:${type}:${slug}`);
  return repository.getPackage(type, slug);
}

export async function listPackages(filter: { type: "hajj" | "umrah"; season?: string }) {
  "use cache";
  cacheLife("max");
  cacheTag("packages");
  return repository.listPackages(filter);
}
```

### 6.2 Page example

```tsx
// src/app/[locale]/hajj/[season]/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getPackage, listPackages } from "@/content/queries";
import { routing } from "@/i18n/routing";
import { PackageFacts } from "@/components/package/package-facts";
import { buildPackageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const pkgs = await listPackages({ type: "hajj" });
  return routing.locales.flatMap((locale) =>
    pkgs.map((p) => ({ locale, season: p.seasonSlug, slug: p.slug })),
  );
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/hajj/[season]/[slug]">,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const pkg = await getPackage("hajj", slug);
  return pkg ? buildPackageMetadata(pkg, locale) : {};
}

export default async function Page({ params }: PageProps<"/[locale]/hajj/[season]/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const pkg = await getPackage("hajj", slug);
  if (!pkg || pkg.status === "draft") notFound();
  return <PackageFacts pkg={pkg} locale={locale} />;
}
```

If the generated `PageProps` helper isn't available in your setup, type params as `{ params: Promise<{ locale: string; season: string; slug: string }> }`.

---

## 7. Content layer (CMS-ready from day one)

### 7.1 Principle

```
app/ pages  ──►  content/queries.ts  ──►  ContentRepository interface
                 (cache + tags)            ├── local adapter   (Phase 1: typed files in repo)
                                           └── payload adapter (later: CMS)
```

Pages never know where content comes from. Moving to a CMS = writing one adapter + one webhook.

### 7.2 Schemas (`src/content/schema.ts`)

```ts
import "server-only";
import { z } from "zod";

export const LocalizedText = z.object({ en: z.string().min(1), ur: z.string().optional() });
export const ImageRef = z.object({
  src: z.string(),                 // local path now, CMS URL later
  alt: LocalizedText,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  source: z.enum(["client", "licensed", "ai", "official-doc"]),  // design.md §9 enforcement
  credit: z.string().optional(),
  seasonLabel: z.string().optional(),
});

export const Hotel = z.object({
  city: z.string(),
  name: z.string(),
  orSimilar: z.boolean(),
  distanceMeters: z.number().int().positive().optional(),
  distanceNote: LocalizedText.optional(),       // how it was measured
  roomSharing: LocalizedText,
  photos: z.array(ImageRef).default([]),
});

export const Package = z
  .object({
    id: z.string(),
    type: z.enum(["hajj", "umrah", "holiday"]),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    seasonSlug: z.string(),
    seasonLabel: LocalizedText,                   // "Hajj 2027"
    title: LocalizedText,
    status: z.enum(["draft", "live", "soldOut", "archived"]),
    validUntil: z.iso.date(),
    priceFromPKR: z.number().int().positive().optional(),
    priceCheckedOn: z.iso.date().optional(),
    durationDays: z.number().int().positive(),
    departureCities: z.array(z.string()).min(1),
    hotels: z.array(Hotel),
    mina: LocalizedText.optional(),
    arafat: LocalizedText.optional(),
    flights: z.object({ included: z.boolean(), airline: z.string().optional(), baggage: z.string().optional() }).optional(),
    included: z.array(LocalizedText),
    notIncluded: z.array(LocalizedText),
    itinerary: z.array(z.object({ day: z.string(), title: LocalizedText, detail: LocalizedText })),
    operatorLine: LocalizedText.optional(),
    officialBookingUrl: z.url().optional(),
    faqs: z.array(z.object({ q: LocalizedText, a: LocalizedText })).default([]),
    videos: z.array(z.object({ youtubeId: z.string(), title: LocalizedText, seasonLabel: z.string() })).default([]),
  })
  .superRefine((p, ctx) => {
    // guide.md §2: a live package must show a price-checked date if it shows a price
    if (p.status === "live" && p.priceFromPKR && !p.priceCheckedOn) {
      ctx.addIssue({ code: "custom", message: "priceCheckedOn required when priceFromPKR is set", path: ["priceCheckedOn"] });
    }
    // guide.md §2.1: Hajj packages never link to anything but the official portal
    if (p.type === "hajj" && p.officialBookingUrl && !/^https:\/\/(hajj\.mora\.gov\.pk|.*hajjinfo\.org)/.test(p.officialBookingUrl)) {
      ctx.addIssue({ code: "custom", message: "Hajj booking URL must be the official portal", path: ["officialBookingUrl"] });
    }
  });

export const Season = z.object({
  slug: z.string(),
  type: z.enum(["hajj", "umrah"]),
  name: LocalizedText,
  bookingDeadline: z.iso.datetime({ offset: true }),
  officialPortalUrl: z.url(),
  stripMessage: LocalizedText,
  credentialLine: LocalizedText,
  sourceDocUrl: z.url(),
  isCurrent: z.boolean(),
});

export const Credential = z.object({
  id: z.string(),
  label: LocalizedText,
  number: z.string().optional(),
  issuer: z.string(),
  validity: z.string(),
  sourceUrl: z.url(),
  checkedOn: z.iso.date(),
  verifiedByClient: z.boolean(),        // false = never rendered
});

export const Review = z.object({
  id: z.string(),
  author: z.string(),
  season: z.string(),
  text: LocalizedText,
  source: z.enum(["google", "facebook", "direct"]),
  date: z.iso.date(),
  consent: z.literal(true),             // cannot add a review without consent
});
```

Types: `export type Package = z.infer<typeof Package>` etc. in `types.ts`.

### 7.3 Repository interface and local adapter

```ts
// src/content/repository.ts
import "server-only";
import type { Package, Season, Credential, Review, SiteSettings, Video } from "./types";
import { localAdapter } from "./local/adapter";

export interface ContentRepository {
  getSiteSettings(): Promise<SiteSettings>;
  getCurrentHajjSeason(): Promise<Season | null>;
  getSeason(slug: string): Promise<Season | null>;
  listPackages(f: { type: Package["type"]; season?: string }): Promise<Package[]>;
  getPackage(type: Package["type"], slug: string): Promise<Package | null>;
  listCredentials(): Promise<Credential[]>;
  listReviews(limit?: number): Promise<Review[]>;
  listVideos(f?: { season?: string }): Promise<Video[]>;
}

// Swap point. Later: process.env.CONTENT_SOURCE === "payload" ? payloadAdapter : localAdapter
export const repository: ContentRepository = localAdapter;
```

```ts
// src/content/local/adapter.ts
import "server-only";
import { z } from "zod";
import { Package, Season, Credential, Review } from "../schema";
import type { ContentRepository } from "../repository";
import { packages } from "./data/packages";
import { seasons } from "./data/seasons";
import { credentials } from "./data/credentials";
import { reviews } from "./data/reviews";
import { site } from "./data/site";
import { videos } from "./data/videos";

// Parse once at module load: invalid content fails `next build`.
const P = z.array(Package).parse(packages);
const S = z.array(Season).parse(seasons);
const C = z.array(Credential).parse(credentials).filter((c) => c.verifiedByClient);
const R = z.array(Review).parse(reviews);

export const localAdapter: ContentRepository = {
  getSiteSettings: async () => site,
  getCurrentHajjSeason: async () => S.find((s) => s.type === "hajj" && s.isCurrent) ?? null,
  getSeason: async (slug) => S.find((s) => s.slug === slug) ?? null,
  listPackages: async ({ type, season }) =>
    P.filter((p) => p.type === type && p.status !== "draft" && (!season || p.seasonSlug === season)),
  getPackage: async (type, slug) => P.find((p) => p.type === type && p.slug === slug) ?? null,
  listCredentials: async () => C,
  listReviews: async (limit = 6) => [...R].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit),
  listVideos: async (f) => videos.filter((v) => !f?.season || v.season === f.season),
};
```

Data files use `satisfies z.input<typeof Package>[]` so editors get autocomplete and the compiler catches shape errors before Zod does.

### 7.4 Localised content

Content fields are `{ en, ur? }`. UI strings (buttons, labels) live in `messages/*.json` via next-intl. Helper:

```ts
// src/content/localize.ts
import type { Locale } from "@/i18n/routing";
export const pick = (t: { en: string; ur?: string | undefined }, locale: Locale) =>
  (locale === "ur" && t.ur) || t.en;
```

This maps directly onto Payload's field-level localisation later.

---

## 8. Internationalisation

```ts
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "ur"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed",       // /hajj/2027 (en), /ur/hajj/2027 (ur)
});
export type Locale = (typeof routing.locales)[number];
```

```ts
// src/proxy.ts  (Next 16: proxy replaces middleware)
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
export default createMiddleware(routing);
export const config = { matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"] };
```

Root layout sets `<html lang={locale} dir={locale === "ur" ? "rtl" : "ltr"}>`, calls `setRequestLocale(locale)`, and loads the Nastaliq font class only for `ur`. Every page calls `setRequestLocale` before using translations so pages stay static. Navigation uses next-intl's `createNavigation(routing)` `Link`, not `next/link` directly.

Phase 1 ships English only but **with** the `[locale]` segment in place, so Urdu is additive later.

---

## 9. Components

### 9.1 Server/client split

| Server component (default) | Client island |
|---|---|
| Page sections, package facts, tables, lists, footer, header shell | Header scroll behaviour, mobile menu, drawers, tabs, accordion, compare toggles, video player, YouTube facade, inquiry form, route enhancer, language toggle |

Pass **serialisable data** into islands (strings, numbers, plain objects). Never pass the whole package object if the island needs two fields.

### 9.2 Primitive example: Button

```tsx
// src/components/ui/button.tsx
import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "quiet";
const styles: Record<Variant, string> = {
  primary: "bg-ink text-marble hover:bg-ink/90",
  secondary: "border border-ink text-ink hover:bg-ink/5",
  quiet: "text-crimson underline underline-offset-4 hover:no-underline",
};

export function Button({ variant = "primary", className, ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-5 font-medium transition-colors duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
```

Link-styled-as-button uses the same `styles` map on the next-intl `Link`. Button labels follow design.md copy rules (no trailing arrows).

### 9.3 Accessibility rules

- Every interactive element reachable by keyboard; drawers trap focus and close on Esc; tabs follow the WAI-ARIA tabs pattern.
- Images: meaningful `alt` from content (`ImageRef.alt`); decorative textures `alt=""`.
- Video with speech: captions (`<track>`). Hero loop has no speech and is `aria-hidden` with a text caption next to it.
- Colour pairs from design.md only (contrast pre-checked).
- Touch targets ≥ 44×44 px.

---

## 10. Media

### 10.1 Images

- Always `next/image` with explicit `width`/`height` (from content) and a correct `sizes`.
- The LCP image (hero poster) uses the `preload` prop (Next 16 replaced `priority`) and `fetchPriority="high"`. Nothing else is preloaded.
- AVIF first; quality 70 default, 80 for photos of people.
- Content images enforce `ImageRef.source`; a lint-like unit test fails if any `ImageRef` in a "people" slot has `source: "ai"` (design.md §9).

### 10.2 Hero video (`hero-video.client.tsx`)

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

type Props = { mp4: string; webm: string; poster: React.ReactNode; label: string };

export function HeroVideo({ mp4, webm, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduce && !saveData) setEnabled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <figure className="relative aspect-[4/5] overflow-hidden rounded-panel">
      {poster /* server-rendered next/image, the LCP element */}
      {enabled && (
        <video ref={ref} className="absolute inset-0 size-full object-cover" muted loop playsInline preload="none" aria-hidden>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      )}
      <figcaption className="mt-2 text-sm text-stone">{label}</figcaption>
    </figure>
  );
}
```

### 10.3 YouTube

Facade pattern: render the thumbnail (`i.ytimg.com`) with a play button; load the `youtube-nocookie.com` iframe only on click. Saves ~500 KB+ per embed. Every embed shows its season label.

---

## 11. Motion architecture

### 11.1 Ownership (from design.md §7)

| GSAP | Motion |
|---|---|
| Home load sequence, the route (ScrollTrigger + DrawSVG), route background state | Header hide/show, cursor preview, drawers, accordion, tabs, lightbox, form states |

Never animate one element with both.

### 11.2 Motion: small bundle

```tsx
// src/components/motion/motion-provider.client.tsx
"use client";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./motion-features").then((m) => m.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
```

```ts
// src/components/motion/motion-features.ts
import { domMax } from "motion/react";   // domMax: needed for layoutId / shared layout
export default domMax;
```

In components use the slim `m` elements: `import * as m from "motion/react-m";` (`strict` mode throws if someone imports the full `motion` component).

### 11.3 GSAP: progressive enhancement, loaded on demand

The route section is **server-rendered HTML** (map SVG + all stop panels, fully readable). A tiny client enhancer loads GSAP only when the section approaches the viewport, on capable devices.

```tsx
// src/components/route/manasik-route.enhancer.tsx
"use client";
import { useEffect, useRef } from "react";

export function ManasikRouteEnhancer({ stopIds }: { stopIds: readonly string[] }) {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sentinel.current?.closest<HTMLElement>("[data-route]");
    if (!root) return;

    const mq = matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 900px)");
    if (!mq.matches) return;

    let revert: (() => void) | undefined;
    const io = new IntersectionObserver(async ([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();

      const [{ gsap }, { ScrollTrigger }, { DrawSVGPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/DrawSVGPlugin"),
      ]);
      gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

      const ctx = gsap.context(() => {
        root.dataset.enhanced = "true"; // CSS switches from stacked layout to pinned layout
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${stopIds.length * 90}%`,
            pin: true,
            scrub: 0.6,
            snap: { snapTo: "labels", duration: 0.4, ease: "power1.inOut" },
            invalidateOnRefresh: true,
          },
        });

        for (const id of stopIds) {
          tl.addLabel(id)
            .fromTo(`#seg-${id}`, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1 })
            .to(`#pin-${id}`, { scale: 1, autoAlpha: 1, duration: 0.2 }, "<0.8")
            .to(`[data-panel="${id}"]`, { autoAlpha: 1, y: 0, duration: 0.3 }, "<")
            .to(`[data-panel]:not([data-panel="${id}"])`, { autoAlpha: 0, y: -12, duration: 0.2 }, "<");

          if (id === "muzdalifah") tl.to(root, { "--route-bg": "var(--color-ink)", "--route-ink": "var(--color-marble)", duration: 0.5 }, "<");
          if (id === "jamarat") tl.to(root, { "--route-bg": "var(--color-marble)", "--route-ink": "var(--color-ink)", duration: 0.5 }, "<");
        }
      }, root);

      revert = () => { ctx.revert(); delete root.dataset.enhanced; };
    }, { rootMargin: "50% 0px" });

    io.observe(root);
    const onChange = () => revert?.();
    mq.addEventListener("change", onChange);
    return () => { io.disconnect(); mq.removeEventListener("change", onChange); revert?.(); };
  }, [stopIds]);

  return <div ref={sentinel} hidden />;
}
```

Why this way:
- GSAP (~70 KB with plugins) never ships in the initial bundle and never loads on mobile or reduced-motion devices.
- Content is SSR and indexable; without JS the section is a clean stacked timeline.
- `gsap.context().revert()` guarantees cleanup on navigation (no leaked ScrollTriggers).

The home load sequence follows the same pattern: SSR markup is fully visible by default; the enhancer sets initial states and animates only if motion is allowed. **Never hide content in CSS waiting for JS** — no `opacity: 0` in the stylesheet.

### 11.4 Lenis (optional)

Only if it measurably improves the route feel on desktop. Same dynamic-import pattern; disabled on touch and reduced motion; hooked to `ScrollTrigger.update` and `gsap.ticker`.

### 11.5 View transitions

React 19.3 ships stable View Transitions. Optional for route changes between package pages; check the current Next docs for how it's enabled before adding it, and keep it off for reduced motion.

---

## 12. Forms and leads

### 12.1 Server action

```ts
// src/components/forms/actions.ts
"use server";
import "server-only";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/lib/env";

const Inquiry = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{10,16}$/, "Enter a phone or WhatsApp number with country code"),
  service: z.enum(["hajj", "umrah", "flights", "visa", "holiday", "other"]),
  packageSlug: z.string().max(80).optional(),
  city: z.string().trim().max(60).optional(),
  month: z.string().trim().max(30).optional(),
  travellers: z.coerce.number().int().min(1).max(60),
  message: z.string().trim().max(1000).optional(),
  company: z.string().max(0).optional(),   // honeypot: must stay empty
});

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; fieldErrors: Partial<Record<keyof z.infer<typeof Inquiry>, string[]>> }
  | { status: "sent" };

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const parsed = Inquiry.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  if (parsed.data.company) return { status: "sent" }; // silently drop bots

  // optional: rate limit by IP with @upstash/ratelimit here

  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: env.INQUIRY_FROM_EMAIL,
    to: env.INQUIRY_TO_EMAIL,
    subject: `New ${parsed.data.service} inquiry — ${parsed.data.name}`,
    text: JSON.stringify(parsed.data, null, 2),
  });

  return { status: "sent" };
}
```

Client form uses `useActionState(submitInquiry, { status: "idle" })`, native `<form action>` (works without JS), labels above inputs, field errors with fix instructions, and after success shows the WhatsApp continuation link. **Never collect passport, CNIC or health data** (guide.md §5.9).

### 12.2 WhatsApp helper (tested)

```ts
// src/lib/whatsapp.ts
export function whatsappUrl(number: string, parts: { packageName?: string; season?: string; travellers?: number }) {
  const lines = ["Assalam o Alaikum,"];
  if (parts.packageName) {
    lines.push(`I'm asking about ${parts.packageName}${parts.season ? ` (${parts.season})` : ""}${parts.travellers ? ` for ${parts.travellers} travellers` : ""}.`);
  } else {
    lines.push("I'd like to ask about your services.");
  }
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(lines.join(" "))}`;
}
```

### 12.3 Environment (`src/lib/env.ts`)

```ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1),
    INQUIRY_TO_EMAIL: z.email(),
    INQUIRY_FROM_EMAIL: z.email(),
    REVALIDATE_SECRET: z.string().min(32).optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.url(),
    NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().regex(/^92\d{10}$/),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
});
```

Commit `.env.example`; never commit `.env*.local`.

---

## 13. SEO

- **Metadata API** only: root `metadata` with `metadataBase`, title template `%s · Junaidi Group`, per-page `generateMetadata` built by helpers in `lib/seo.ts`. `alternates.languages` for en/ur.
- `app/sitemap.ts` reads from the repository (live packages, seasons, guides); archived packages stay in the sitemap with lower priority.
- `app/robots.ts`: allow all; disallow `/api/`.
- **JSON-LD** via `schema-dts` types, rendered server-side:

```tsx
// src/lib/jsonld.tsx
import type { Thing, WithContext } from "schema-dts";
export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
```

  Use `TravelAgency` (verified NAP only), `Product` + `Offer` with `validThrough` for packages with real prices, `FAQPage` where FAQs are visible, `VideoObject` for gallery items, `BreadcrumbList`.
- **OG images** with `next/og` (`opengraph-image.tsx` per route group): marble background, Archivo title, crimson swoosh, logo. Font loaded from a local file.

---

## 14. Analytics and consent

- `@next/third-parties/google` `GoogleAnalytics`, rendered only after the consent banner is accepted (consent state in a cookie read client-side, so pages stay static).
- Events (guide.md §11): `whatsapp_click`, `call_click`, `form_submit`, `portal_link_click`, `compare_open`, `video_play`, `lang_switch` — all through one typed `track()` helper in `lib/analytics.ts`.
- Web Vitals: report via `useReportWebVitals` to GA4 (sampled).

---

## 15. Security

- Headers from §3.1. Check with securityheaders.com after deploy.
- Server actions validate everything; no secrets in client bundles (`env` client section only holds public values).
- Revalidation webhook (§19) checks a shared secret with a constant-time comparison.
- Dependencies: `pnpm audit` in CI; `experimental.agentUpgrade: "security"` nudges on known vulnerabilities.
- The 16.3.8 release fixed an Image Optimization SSRF among other issues: **stay on the latest 16.x patch.**

---

## 16. Testing

| Layer | Tool | What |
|---|---|---|
| Content | Vitest | All data files parse; no `ai` images in people slots; Hajj URLs only official; no live package without `priceCheckedOn` when priced |
| Logic | Vitest | `whatsappUrl`, season deadline helper, `pick()` localisation, formatters |
| E2E | Playwright | Home → Hajj 2027 → package → WhatsApp link has correct prefill; contact form happy/error paths; Urdu page renders RTL |
| Accessibility | @axe-core/playwright | Zero serious/critical violations on every route |
| Motion | Playwright with `reducedMotion: "reduce"` | Route section readable and complete; no hidden content |
| Performance | Lighthouse CI | Budgets below |

```ts
// tests/unit/whatsapp.test.ts
import { describe, expect, it } from "vitest";
import { whatsappUrl } from "@/lib/whatsapp";

describe("whatsappUrl", () => {
  it("encodes package, season and travellers", () => {
    const url = whatsappUrl("+92 300 0000000", { packageName: "Short Hajj", season: "Hajj 2027", travellers: 2 });
    expect(url.startsWith("https://wa.me/923000000000?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1]!)).toContain("Short Hajj (Hajj 2027) for 2 travellers");
  });
});
```

---

## 17. CI (GitHub Actions)

```yaml
name: ci
on: [pull_request, push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: pnpm/action-setup@v4          # reads packageManager from package.json
      - uses: actions/setup-node@v5
        with: { node-version-file: .nvmrc, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm check                        # typecheck + lint + format + unit
      - run: pnpm build
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm e2e
      - run: pnpm audit --audit-level=high
```

Use the latest major of each action at setup time. Add Lighthouse CI against the preview deployment.

---

## 18. Performance budgets and checklist

| Metric (mobile, 4G, Lighthouse) | Budget |
|---|---|
| LCP | < 2.0 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| TBT | < 150 ms |
| Initial JS, home (gzip) | < 130 KB |
| Initial JS, package page (gzip) | < 110 KB |
| Hero video | ≤ 1.2 MB mobile / 2.5 MB desktop, never the LCP element |
| Lighthouse Performance / Accessibility / SEO / Best Practices | ≥ 95 / 100 / 100 / 100 |

Checklist:
- [ ] Every page prerendered (`ensureStatic` passes)
- [ ] GSAP absent from the initial bundle (check with the Turbopack Bundle Analyzer)
- [ ] Motion loaded via `LazyMotion` + `m` only
- [ ] One preloaded image per page, all others lazy with `sizes`
- [ ] No layout shift from fonts (`next/font`), images (dimensions) or the season strip (reserved height)
- [ ] Third-party scripts only after consent
- [ ] YouTube via facade
- [ ] `lucide-react` icons imported individually
- [ ] No client component imports a server-only module (build fails if so, thanks to `server-only`)

---

## 19. Moving to a CMS later (Payload 3)

Payload runs inside the same Next.js app (admin at `/admin`), so no second service.

1. `pnpm add payload@3.x @payloadcms/next@3.x @payloadcms/db-postgres@3.x` (+ a storage adapter for media, e.g. S3/R2). Check the peer range against the installed Next version first. Verify Payload's compatibility with `cacheComponents` in its docs at that time.
2. Create collections that **mirror `content/schema.ts`**: `packages`, `seasons`, `credentials`, `reviews`, `videos`, `media`; global `site`. Enable field localisation (`en`, `ur`) to match `LocalizedText`.
3. Write `content/payload/adapter.ts` implementing `ContentRepository`, parsing every result through the **same Zod schemas**.
4. Switch `repository` to the Payload adapter behind `CONTENT_SOURCE=payload`.
5. Add `afterChange` hooks that call `revalidateTag("packages", "max")` / `revalidateTag("seasons", "max")` (Next 16 requires the cache-life profile argument), or post to `app/api/revalidate/route.ts` with the shared secret.
6. Migrate the local data files with a one-off seed script.
7. Pages, components, tests: unchanged.

This is why §0 rule 2 is non-negotiable.

---

## 20. Do / Don't

**Do**
- Keep pages as thin composition of server components fed by `content/queries.ts`
- Write the static, no-JS version first; enhance second
- Name things by what users understand (`PackageFacts`, not `PkgDataBlock`)
- Add a test whenever you encode a guide.md rule in code

**Don't**
- Import `gsap` at the top of any module
- Use `useEffect` for data fetching
- Put prices, hotels or dates in JSX
- Read `searchParams`, `cookies()` or `headers()` in marketing pages
- Add a dependency without checking its size and whether the platform already does it
- Use `any`, non-null assertions outside tests, or `// @ts-ignore`
- Ship placeholder facts

---

## Sources (versions and APIs)

- npm registry, queried 12 Oct 2026 (`https://registry.npmjs.org/<package>/latest`)
- Next.js 16.4 release notes: https://nextjs.org/blog/next-16-4
- Next.js TypeScript 7 support (`experimental.useTypeScriptCli`): https://nextjs.org/docs/app/api-reference/config/typescript
- Next.js docs index for agents: https://nextjs.org/docs/llms.txt
- pnpm 11 release notes (`allowBuilds`, `minimumReleaseAge`): https://pnpm.io/blog/releases/11.0
- Node.js 26 LTS date: https://www.devx.com/coding/nodejs-26-lts-new-features-release-date/
