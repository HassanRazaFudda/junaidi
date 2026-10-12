# PLAN.md — Junaidi Group Website, Phase 1

Written at Checkpoint 0. Companion files: `guide.md`, `design.md`, `code.md`, `prompt.md` (the brief), `DECISIONS.md`.

---

## 0. Version check against `code.md` §1

Checked live against the npm registry on 12 Oct 2026 (today, per the environment clock):

| Package                                 | code.md pin        | Registry now                                                                                                | Match?                                                               |
| --------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| next                                    | 16.4.0             | 16.4.0                                                                                                      | ✅                                                                   |
| react / react-dom                       | 19.3.0             | 19.3.0                                                                                                      | ✅                                                                   |
| typescript                              | 6.0.3              | latest tag is **7.0.2**, but `typescript-eslint@8.71.1` peer range is still `>=4.8.4 <6.1.0` (checked live) | ✅ pin stays 6.0.3 — code.md's reasoning is still correct, unchanged |
| tailwindcss / @tailwindcss/postcss      | 4.3.3              | 4.3.3                                                                                                       | ✅                                                                   |
| motion                                  | 14.1.0             | 14.1.0                                                                                                      | ✅                                                                   |
| gsap / @gsap/react                      | 3.15.0 / 2.1.2     | 3.15.0 / 2.1.2                                                                                              | ✅                                                                   |
| lenis                                   | 1.3.26             | 1.3.26                                                                                                      | ✅                                                                   |
| zod                                     | 4.6.6              | 4.6.6                                                                                                       | ✅                                                                   |
| next-intl                               | 4.14.9             | 4.14.9                                                                                                      | ✅                                                                   |
| @t3-oss/env-nextjs                      | 0.13.11            | 0.13.11                                                                                                     | ✅                                                                   |
| schema-dts                              | 2.1.0              | 2.1.0                                                                                                       | ✅                                                                   |
| resend                                  | 6.32.1             | 6.32.1                                                                                                      | ✅                                                                   |
| @upstash/ratelimit                      | 2.2.0              | 2.2.0                                                                                                       | ✅                                                                   |
| @next/third-parties                     | 16.4.0             | 16.4.0                                                                                                      | ✅                                                                   |
| clsx / tailwind-merge                   | 2.1.1 / 3.7.0      | 2.1.1 / 3.7.0                                                                                               | ✅                                                                   |
| lucide-react                            | 1.55.0             | 1.55.0                                                                                                      | ✅                                                                   |
| sharp                                   | 0.35.5             | 0.35.5                                                                                                      | ✅                                                                   |
| babel-plugin-react-compiler             | 1.0.0              | 1.0.0                                                                                                       | ✅                                                                   |
| eslint / eslint-config-next             | 10.12.0 / 16.4.0   | 10.12.0 / 16.4.0                                                                                            | ✅                                                                   |
| prettier / prettier-plugin-tailwindcss  | 3.9.10 / 0.8.1     | 3.9.10 / 0.8.1                                                                                              | ✅                                                                   |
| vitest                                  | 5.0.4              | 5.0.4                                                                                                       | ✅                                                                   |
| @playwright/test / @axe-core/playwright | 1.64.0 / 4.13.0    | 1.64.0 / 4.13.0                                                                                             | ✅                                                                   |
| husky / lint-staged                     | 9.1.7 / 17.6.0     | 9.1.7 / 17.6.0                                                                                              | ✅                                                                   |
| @types/node                             | "match Node major" | latest 24.x = **24.9.2** (dist-tag `latest` now resolves to 26.x — don't use that)                          | use `24.9.2` explicitly                                              |
| @types/react                            | 19.3.0             | 19.3.0                                                                                                      | ✅                                                                   |
| pnpm                                    | 12.11.2            | 12.11.2 exists on registry (newer 12.12.1 also exists, not used — exact-pin policy)                         | ✅                                                                   |

**Result: zero drift.** code.md's snapshot is still accurate today. The only concrete action is pinning `@types/node@24.9.2` instead of whatever `latest` resolves to, since Node 26 hasn't entered Active LTS yet (28 Oct 2026). Local machine has Node v24.21.0 (good, matches Active LTS) and a global pnpm 12.6.0 — Checkpoint 1 will `corepack prepare pnpm@12.11.2 --activate` so the project uses the exact pinned pnpm regardless of the global one.

No brand/ folder and no logo files exist anywhere under the project directory. Handled as a documented fallback, not a blocker — see `DECISIONS.md`.

---

## 1. File tree

Project root stays `D:\New folder\junaidi\` (already holds `guide.md`, `design.md`, `code.md`, `prompt.md`). The Next.js app scaffolds **in place** at this root (not a nested `junaidi-web/` subfolder — see `DECISIONS.md` #2), so the final tree is:

```
junaidi/
  guide.md  design.md  code.md  prompt.md        (source briefs — untouched)
  PLAN.md  DECISIONS.md  ASSETS-NEEDED.md  CLIENT-TODO.md  README.md
  brand/                                          (client logo files — pending, see ASSETS-NEEDED.md)
  .nvmrc  .env.example  package.json  pnpm-workspace.yaml
  next.config.ts  tsconfig.json  eslint.config.mjs  .prettierrc.json
  .github/workflows/ci.yml
  src/
    app/
      [locale]/
        layout.tsx
        page.tsx                                  Home
        fonts.ts
        hajj/
          page.tsx                                hub → redirects to current season
          [season]/page.tsx                        /hajj/2027
          [season]/[slug]/page.tsx                 package detail
          how-private-hajj-booking-works/page.tsx
        about/
          page.tsx                                 (minimal stub, story pending — About isn't P0 but credentials is)
          credentials/page.tsx
        contact/page.tsx
        privacy/page.tsx
        terms/page.tsx
        cancellation-policy/page.tsx
        complaints/page.tsx
        not-found.tsx
      api/
        og/route.tsx                                (next/og image route, or opengraph-image.tsx per group)
      sitemap.ts
      robots.ts
      manifest.ts
    components/
      ui/                 button.tsx link-button.tsx container.tsx section.tsx drawer.client.tsx accordion.client.tsx tabs.client.tsx skip-link.tsx
      layout/             header.client.tsx footer.tsx season-strip.tsx sticky-contact-bar.tsx language-toggle.client.tsx
      home/               hero.tsx hero-video.client.tsx services-index.tsx services-preview.client.tsx credentials-section.tsx packages-preview.tsx past-groups.tsx reviews.tsx office.tsx
      route/              manasik-route.tsx route-map.tsx manasik-route.enhancer.tsx
      package/            package-header.tsx package-facts.tsx stay-block.tsx inclusions-list.tsx itinerary.tsx booking-steps.tsx compare-table.client.tsx pending-packages-notice.tsx
      credentials/        credential-row.tsx evidence-drawer.client.tsx
      media/              youtube-facade.client.tsx lightbox.client.tsx placeholder-media.tsx   (marble-block dev placeholder, design.md §10 asset IDs)
      forms/              inquiry-form.client.tsx actions.ts
      motion/             motion-provider.client.tsx motion-features.ts smooth-scroll.client.tsx
      seo/                jsonld.tsx
    content/
      schema.ts  types.ts  repository.ts  localize.ts  queries.ts
      local/
        adapter.ts
        data/ site.ts seasons.ts credentials.ts packages.ts reviews.ts videos.ts
    i18n/            routing.ts request.ts navigation.ts
    messages/        en.json  ur.json
    lib/             cn.ts env.ts whatsapp.ts season.ts seo.ts jsonld.ts analytics.ts format.ts
    styles/          globals.css
    proxy.ts
  tests/
    unit/            whatsapp.test.ts season.test.ts content-schema.test.ts content-compliance.test.ts localize.test.ts
    e2e/             home.spec.ts hajj-2027.spec.ts package-detail.spec.ts contact-form.spec.ts a11y.spec.ts reduced-motion.spec.ts
    fixtures/        example-package.ts            (schema/UI test fixture only — never imported by app/)
  public/
    media/           (brand assets only; content media goes through content layer per code.md §4)
```

This is code.md §4's structure, taken as-is (code.md wins on "how it is built"), with two Phase-1-scoped additions: `tests/fixtures/` for a non-rendered example package (needed to test the package template against the real schema without inventing live content), and a `pending-packages-notice.tsx` / credential-pending-state component to render the honest "being confirmed" states the hard rules require.

---

## 2. Components per page (Phase 1 scope only)

**Home** (`[locale]/page.tsx`) — composition only, each section a server component fed by `content/queries.ts`:
`SeasonStrip` → `Header` → `Hero` (+ `HeroVideo` client island, poster is the LCP image) → `ServicesIndex` (+ `ServicesPreview` client cursor-follow island, desktop pointer only) → `CredentialsSection` (renders `CredentialRow` × N, or the pending-state notice when the list is empty — expected in Phase 1, see §4) → `ManasikRoute` (server-rendered static timeline + `ManasikRouteEnhancer` client island, GSAP dynamically imported) → `PackagesPreview` (renders live packages or the pending-state notice — expected empty in Phase 1) → `PastGroups` (season-labelled video strip from `videos.ts`, `YoutubeFacade`) → `Reviews` (returns `null` when `listReviews()` is empty — true in Phase 1) → `Office` → `Footer`.

**`/hajj/2027`** — `PageHeader` (season name, days-only deadline, credential line _or_ pending notice) → `BookingStepsStatic` (the 4 real steps from guide.md §5.2, copied verbatim) → `PackagesList` + filters (renders pending notice in Phase 1) → `CompareTable` (not rendered when there's nothing to compare) → `CommonInclusions` → training videos (`YoutubeFacade` × confirmed videos) → `PastGroups` → `Faq` (empty-safe accordion) → `ContactBlock`.

**Package detail** (`[locale]/hajj/[season]/[slug]/page.tsx`) — `generateStaticParams` from `listPackages`; since Phase 1 has zero live packages, this generates zero routes and the dynamic segment simply doesn't exist yet on the live site — intentional, not a bug. Fully built and unit/E2E-tested against `tests/fixtures/example-package.ts`. Components: `PackageHeader` → `StayBlock` → `TravelBlock` → `CareBlock` (only if confirmed) → `InclusionsList` → `Itinerary` → `BookingSteps` → `CancellationNotice` (portal rules, static) → `Faq` → `StickyContactBar`.

**`/hajj/how-private-hajj-booking-works`** — static server page, the four steps from guide.md §5.2 verbatim, a visible "Pending scholar/client review" note, links to the official portal and to `/hajj/2027`.

**`/about/credentials`** — `CredentialRow` × N or the pending notice (expected empty in Phase 1 — see §4 and `DECISIONS.md` #3).

**`/contact`** — office block, map (static, no API key needed — a `next/image` of a map or an embed iframe with no key, TBD in Checkpoint 2), `InquiryForm` (server action `submitInquiry`, honeypot, `useActionState`, WhatsApp continuation link on success).

**`/privacy` `/terms` `/cancellation-policy` `/complaints`** — structured placeholder pages: heading, one paragraph explaining the policy is being finalised with the client's legal counsel, what it will cover, and a contact link. Marked `TODO(client/legal)`.

---

## 3. Content entries (seed data, `content/local/data/`)

What's **confirmed** and goes in as real data (guide.md §1.1, no "verify" flag on these rows):

- `site.ts`: legal name, brand name, office address (3 lines), landline `021-34130184-88`, WhatsApp read from `NEXT_PUBLIC_WHATSAPP_NUMBER`, Facebook URL. Email: **not** confirmed (guide.md §1.5 shows conflicting addresses) → omitted, `CLIENT-TODO.md`.
- `seasons.ts`: one `Season` doc, `slug: "2027"`, real deadline `2026-11-20` (Asia/Karachi), real portal URL, real `sourceDocUrl` (MoRA PRL PDF). `credentialLine` field holds the sourced sentence from guide.md §1.2, but **rendering is gated** on the linked Credential's `verifiedByClient` (see `DECISIONS.md` #3) — until the client confirms, the page shows a neutral pending sentence instead of the declarative claim, never a false negative _or_ a premature claim.
- `credentials.ts`: four `Credential` records (Hajj 2027 / Al Wakeel, DTS 2357, IATA 27-31139-5, HGO 4299), all real sourced numbers from guide.md §1.1–1.2, **all `verifiedByClient: false`** — none render until the client confirms in writing. (A fifth, the Umrah 2025–26 attestation, is **not** added as a Credential record at all: guide.md §1.4 doesn't give a citable URL for that specific list, and `Credential.sourceUrl` is required — I won't invent one. Logged in `CLIENT-TODO.md` instead.)
- `videos.ts`: the four real YouTube IDs from guide.md §1.6, each with its real date and a season label. Flagged in `CLIENT-TODO.md` for the "open each one before using it" review guide.md asks for, since I can't screen video content myself.
- `packages.ts`: **empty array.** No Hajj 2027 package specifics exist yet (guide.md §3 lists this as "Blocking Phase 1"), and the hard rule against invented content applies even to drafts — a draft entry would still need a fabricated name/price/hotel to be structurally meaningful. Zero fabricated numbers anywhere, including in draft form.
- `reviews.ts`: empty array (no real reviews exist; `Review.consent` is a non-fabricatable literal `true`).

What's a genuinely **open question** for the client (not a blocker to building, just to what the site can say): mobile number conflict (two numbers reported), licence numbers unverified, "founded 2005" unverified, leadership names withheld. All flow into `CLIENT-TODO.md`, grouped by page.

---

## 4. Build order

**Checkpoint 1 — Foundation**

1. `git init`; scaffold Next.js app in place via `pnpm create next-app` (non-interactive flags) + the exact pinned installs from code.md §2.
2. Apply `pnpm-workspace.yaml`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.json`, `next.config.ts` from code.md §3, adjusted for the reconciled token names (`DECISIONS.md` #1).
3. `globals.css` tokens + `fonts.ts` (Archivo, Noto Nastaliq Urdu, Amiri — see `DECISIONS.md` #1 on why Marcellus/Hanken Grotesk/brass are superseded).
4. i18n skeleton (`routing.ts`, `request.ts`, `navigation.ts`, `proxy.ts`, `messages/en.json` with `ur.json` stubbed empty) — English-only content, but the `[locale]` segment and RTL plumbing exist now per the brief.
5. `content/schema.ts`, `types.ts`, `repository.ts`, `local/adapter.ts`, seed data files from §3 above.
6. Content unit tests: every data file parses; no `ai`-sourced image in a people slot; Hajj booking URLs match the official-portal regex; no live package without `priceCheckedOn`.
7. Layout shell: `SeasonStrip` (cached deadline logic, code.md §6.1), `Header`, `Footer`, `StickyContactBar` — static, no motion yet.

**Checkpoint 2 — Pages without motion** 8. Build every Phase 1 page server-rendered, zero animation, per §2 above. 9. `InquiryForm` server action: validation, honeypot, error states, WhatsApp continuation. 10. `ManasikRoute` as a static accessible stacked timeline (SVG map inline, stops/copy from design.md §7.3, visibly flagged "pending scholar review"). 11. Verify every page is readable and keyboard-usable with JS conceptually off (no content gated behind a client-only render).

**Checkpoint 3 — Motion** 12. `MotionProvider` (`LazyMotion` + `m`), header hide/show, drawers, accordion, tabs, services cursor preview — exactly per design.md §7.2 catalogue, using crimson/ink tokens. 13. Home load sequence + `ManasikRouteEnhancer` with dynamically imported GSAP, per code.md §11.3. 14. Verify: GSAP absent from the initial bundle; `prefers-reduced-motion` shows complete content with no pinning; no leaked `ScrollTrigger`s on navigation.

**Checkpoint 4 — Quality** 15. SEO (metadata, sitemap, robots, JSON-LD `TravelAgency` with verified NAP only, OG image route), security headers, E2E + axe tests, CI workflow. 16. Lighthouse on Home, `/hajj/2027`, and the package-detail template (tested via the fixture, since no live package exists) against code.md §18 budgets. 17. Visual check against design.md §5 wireframes at 390px/1440px (adjusted for the crimson/ink token swap).

---

## 5. Flagged for the user/client — see chat for the one genuinely blocking question

Everything above proceeds on documented assumptions. The one item that materially changes what the Hajj 2027 page is allowed to say — whether there's already written confirmation of the Al Wakeel Munazzam relationship for 2027 — is asked separately rather than assumed, since it's a compliance-sensitive call only the client/user can make. Default without an answer: treat it as unconfirmed (`verifiedByClient: false`, hidden), per the brief's own instruction.
