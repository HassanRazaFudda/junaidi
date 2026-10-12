# Junaidi Group website

Next.js 16 / React 19 / TypeScript / Tailwind 4. Source of truth: `guide.md` (content/compliance), `design.md` (visual system), `code.md` (architecture) — read `DECISIONS.md` for every place this build deviates from or resolves a conflict between them, `PLAN.md` for the build order, `ASSETS-NEEDED.md` for pending media, and `CLIENT-TODO.md` for everything blocked on the client.

## Setup

```bash
corepack enable && corepack prepare pnpm@12.11.2 --activate
pnpm install
cp .env.example .env.local   # fill in real values — see CLIENT-TODO.md for what's still missing
pnpm dev
```

Node 24 LTS (`.nvmrc`). Switch to Node 26 after it enters Active LTS (28 Oct 2026, code.md §1.1).

## Scripts

| Script                          | What                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| `pnpm dev`                      | Dev server                                                   |
| `pnpm build` / `pnpm start`     | Production build / serve                                     |
| `pnpm check`                    | `typecheck` + `lint` + `format:check` + `test` — the CI gate |
| `pnpm typecheck`                | `next typegen` then `tsc --noEmit`                           |
| `pnpm lint` / `pnpm format`     | ESLint / Prettier (`format` writes, `format:check` doesn't)  |
| `pnpm test` / `pnpm test:watch` | Vitest unit tests (`tests/unit/`)                            |
| `pnpm e2e`                      | Playwright E2E + accessibility tests (`tests/e2e/`)          |

## Content layer

Nothing in `src/app/` reads data directly — every page goes through `src/content/queries.ts`, which wraps a `ContentRepository` (`src/content/repository.ts`) behind cached, tagged functions. Phase 1's implementation is the local adapter (`src/content/local/adapter.ts`), reading typed, Zod-validated data files from `src/content/local/data/`. ESLint enforces the boundary: importing `@/content/local/*` from outside `content/queries.ts` is a lint error (tests are the one allowed exception, to test the adapter's filtering logic directly).

### Adding a package

Add an entry to `src/content/local/data/packages.ts`, matching the `Package` schema in `src/content/schema.ts`. A few rules the schema enforces for you:

- `status: "draft"` packages never render. Only `"live"` (or `"soldOut"`/`"archived"`) packages are returned by `listPackages`/`getPackage`.
- A `"live"` package with `priceFromPKR` set must also set `priceCheckedOn` (fails to parse otherwise).
- A `type: "hajj"` package's `officialBookingUrl`, if set, must point at the official portal (`hajj.mora.gov.pk` or `hajjinfo.org`) — this is a hard compliance rule (guide.md §2 rule 1), not just a convention.
- **Never invent a fact to fill a field.** If real data for a field doesn't exist yet, don't add the package at all rather than guessing — see `DECISIONS.md` #5.

### Adding a season

Add an entry to `src/content/local/data/seasons.ts`, matching the `Season` schema. Only one season should have `isCurrent: true` per `type` at a time — `getCurrentHajjSeason()` picks the first match. The season strip auto-hides once `Date.now()` passes `bookingDeadline` (computed inside a `cacheLife("hours")` function, so the page itself stays static — code.md §6.1).

If a season's `credentialLine` makes an authorisation claim that isn't independently obvious (e.g. "operates through X, recognised by Y"), gate its rendering on a matching `Credential` record's `verifiedByClient` flag rather than printing it unconditionally — see `DECISIONS.md` #3 for why, and `src/content/queries.ts`'s `isCredentialConfirmed()` for the helper.

### Credentials, reviews, videos

Same pattern — typed data files under `src/content/local/data/`, parsed once at module load (invalid data fails `pnpm build`, not a user's page load). Three fields gate rendering deliberately: `Credential.verifiedByClient`, `Review.consent` (a non-fabricatable `true` literal), and `Video.openedAndReviewed` (this project's own addition, since guide.md §1.6 asks that footage be screened before use — see `CLIENT-TODO.md`).

## Internationalisation

Routes already live under `src/app/[locale]/`, and `LocalizedText` content fields are always `{ en, ur? }` — but `src/i18n/routing.ts`'s `locales` is `["en"]` only for Phase 1 (English-only scope; guide.md §6 requires Urdu to be written/reviewed by a native writer, never machine-translated). Phase 2 adds `"ur"` to that one array; nothing else in the routing, content, or RTL plumbing needs to change (`DECISIONS.md` #5c).

## Moving to a CMS later

Per code.md §19: add a `payload/` adapter implementing the same `ContentRepository` interface, parsing through the same Zod schemas in `src/content/schema.ts`, then switch `src/content/repository.ts`'s export behind a `CONTENT_SOURCE` env check. Pages, components and tests don't change — they only ever talked to `content/queries.ts`.
