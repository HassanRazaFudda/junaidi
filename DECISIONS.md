# DECISIONS.md — Junaidi Group Website

Every deviation from `guide.md` / `design.md` / `code.md`, or judgement call where they're silent or in tension, with the reason. Newest at the bottom.

---

## 1. Design-token reconciliation: `design.md`'s brass/night/Marcellus system is superseded by `code.md`'s actual crimson/ink/Archivo tokens

**What's in tension:** `design.md` §2.2–2.3 and §4 define the colour system as `--marble #ECEEEA`, `--paper #FFFFFF`, `--night #16213B` (primary text/buttons), `--brass #A5803F` (the route line / accent), `--brass-deep #7A5C26`, `--haze #D3DEE5`, `--stone #5E655F`, and the type system as **Marcellus** (display) + **Hanken Grotesk** (text/UI). But `code.md` §5.1's actual `globals.css` `@theme` block defines `--color-crimson: #A00C20`, `--color-ink: #111726`, and §5.2's actual `fonts.ts` loads only **Archivo** (plus Noto Nastaliq Urdu and Amiri) — Marcellus and Hanken Grotesk never appear anywhere in `code.md`, and brass/night never appear in `code.md`'s CSS. `haze`, `stone`, `ok`, `marble`, `paper`, and the whole spacing/radius/type-scale system match exactly between the two files — only the accent colour, the "ink" colour, and the display/text typefaces actually conflict.

**Why this isn't a typo to route around:** the brief's own "Known facts" section states the brand colours are `#A00C20` and `#111726` and cites `design.md §2.2` for them — a claim that doesn't match the `design.md` file as written (its §2.2 never mentions those hexes). The brief's Definition of Done also says the result should look like "design.md v2 (marble, ink, one **crimson line** motif, **Archivo**, client logo)". Both independent signals point the same direction: the `design.md` supplied here is an earlier revision on this one axis, and `code.md` + the brief itself reflect the current ("v2") version.

**Update (Checkpoint 1):** the client's actual logo artwork arrived mid-build as `logo.png` — a 3810×3810 transparent PNG of the icon mark (black swoosh + crimson swoosh + crimson aircraft + a red dot), no wordmark lockup, no SVG. This resolves the "no brand files" contingency below: the icon mark is real client artwork and is used untouched, archived at `brand/junaidi-icon-mark.png` and served from `public/brand/junaidi-icon-mark.png` (a straight copy, not a re-export or recolour). The missing SVG redraw and wordmark lockup are logged in `ASSETS-NEEDED.md`. Site header/footer pair this untouched icon with "Junaidi Group" set as real text in the site's own Archivo type — that's typesetting a name next to supplied artwork, not redrawing the wordmark, so it doesn't conflict with the hard rule against retyping the logo.

**Decision:** Per the brief's own authority order (code.md wins over design.md on anything about how it's built, and code.md's tokens are literally executable CSS/font-loading code), I'm using `code.md`'s tokens as ground truth:

- "brass" → **crimson** `#A00C20` everywhere design.md describes a brass line, hairline accent, or active pin (the route line, credential tick marks, active map pins, focus rings already use crimson in code.md §5.1).
- "night" → **ink** `#111726` everywhere design.md describes night-indigo text, primary buttons, or the Muzdalifah night-state background (the GSAP route enhancer snippet in code.md §11.3 already animates to `--color-ink` for the night state, confirming this mapping).
- Display and UI type: **Archivo** only (both roles), dropping Marcellus and Hanken Grotesk. Archivo is a geometric grotesk, not an inscriptional serif — the "names cut into stone" rationale in design.md §2.3 no longer literally applies, so route place-names and package titles get their authority from size/space/weight instead (Archivo supports a variable `wdth` axis, used for `.font-display` in code.md §5.1's `font-variation-settings`), keeping design.md's underlying principle ("hierarchy from size and space, not bold/colour") intact even though the specific typeface rationale doesn't carry over.
- Unaffected and kept as-is from design.md: the 12-col grid, left-aligned layout, 8pt spacing scale, the full type **scale** (sizes/line-heights — these numbers are identical in both files), radius hierarchy, the "one bold moment" principle, the route concept and its stop sequence, the motion catalogue, the imagery rules (§9), and every component behaviour spec.

**Effect on copy:** anywhere design.md's prose says "brass line" I read it as "the route's one crimson line motif" (matching the brief's DoD wording exactly); anywhere it says "night section" I read it as "ink section."

---

## 2. Next.js app scaffolds in place at the existing project root, not in a nested `junaidi-web/` folder

`code.md` §2's setup command is `pnpm create next-app@latest junaidi-web`, which assumes an empty parent directory and names a new child folder for the app. Here, the brief's own framing treats the folder already holding `guide.md`/`design.md`/`code.md` (and the future `brand/`) as _the_ project root. Nesting a nested `junaidi-web/` subfolder under it would split the repo into a docs layer and a disconnected app layer for no benefit — git, CI, and `pnpm` all need to run from one root. Scaffolding directly into the existing `junaidi/` directory (passing `.` instead of a new folder name) keeps the brief's own three source files and this plan sitting next to the code that implements them, which is also how `code.md` §4's folder structure diagram is written (it starts from `src/`, implying it's already at repo root).

---

## 3. The Hajj 2027 credential claim is withheld from rendering, not just its `Credential` record

`guide.md` §1.2 gives the honest line to use _if confirmed_, and the brief's "Known facts" section says to store it as a `Credential` with `verifiedByClient: false` until the client confirms. `code.md`'s local adapter (§7.3) already filters `listCredentials()` to `verifiedByClient` records only, so the four Credential rows (Hajj 2027/Al Wakeel, DTS, IATA, HGO licence) correctly disappear from `/about/credentials` and the home Credentials section on their own.

The one place the schema doesn't naturally enforce this is `Season.credentialLine` (`code.md` §7.2) — a separate, required field on the Season document, with no `verifiedByClient` gate of its own, that would otherwise let the same unconfirmed sentence leak onto `/hajj/2027` even while the matching Credential stays hidden. Since `guide.md` §2 rule 2 ("no authorisation claim without a source") and rule 1 context make this the single most compliance-sensitive sentence on the whole site, I'm adding one small rendering rule (not a schema change): the season page looks up the linked Credential by ID and only prints `Season.credentialLine` verbatim when that Credential's `verifiedByClient` is `true`; otherwise it shows a neutral, honest placeholder ("Credential status: being confirmed with the client — message us") in the same slot. This keeps `Season.credentialLine` populated with the real, sourced sentence in the data layer (so flipping one boolean on the Credential ships it instantly, per the brief's own "may use now, stored as... until confirmed" instruction) without ever displaying it as settled fact before the client says so.

**Practical effect, surfaced to the user directly (not just logged here):** at Phase 1 launch, unless the client confirms in writing before then, the site will not claim Hajj 2027 authorisation/credential status anywhere — only the booking deadline, the official-portal link, and the booking mechanics (which don't depend on the shareholder relationship) are stated as fact.

---

## 4. No `Credential` record created for the Umrah 2025–26 attestation

`guide.md` §1.4 asserts Junaidi is on MoRA's 2025–26 Umrah attested-operators list but gives no citable URL for that specific list (the only Umrah-attestation URL in `guide.md`'s Sources section is the 2021–22 list, a different document). `Credential.sourceUrl` is a required field, and attaching the 2021–22 PDF to a 2025–26 claim would misattribute the source. Rather than invent a URL or attach the wrong one, I'm not creating this Credential record in Phase 1 at all — logged in `CLIENT-TODO.md` as data still needed, not built around with a placeholder.

---

## 5a. Nine packages needed `minimumReleaseAgeExclude` to install

`pnpm-workspace.yaml`'s `minimumReleaseAge: 4320` (code.md §2.1's "3 days") rejected nine of code.md §1's exact pins on first install, because today (12 Oct 2026) is within three days of their publish dates — `vitest@5.0.4` and its `@vitest/mocker`/`@vitest/spy` were published _this morning_. This isn't a sign the pins are wrong; it's confirmation code.md's version table really was taken as a same-day snapshot. Per pnpm's own guidance, I added the nine packages (`motion`, `motion-dom`, `motion-utils`, `framer-motion` [motion's own dependency], `lucide-react`, `zod`, `prettier`, `vitest`, `@vitest/mocker`, `@vitest/spy`, `tinybench`) to `minimumReleaseAgeExclude` in `pnpm-workspace.yaml`. This exempts only these exact already-chosen versions from the maturity wait — it does not weaken the policy for any future version of these or any other package, which still has to sit for 3 days before `pnpm add`/`pnpm up` will take it.

`@parcel/watcher` and `@swc/core` also needed adding to `allowBuilds` (they run native-binary install scripts, pulled in transitively by the dev tooling) — both are widely-used, well-known build tools, not something installed deliberately by this project.

## 5b. `eslint-plugin-import` / `-jsx-a11y` / `-react` haven't declared ESLint 10 support yet

`pnpm peers check` reports these three plugins (bundled inside `eslint-config-next@16.4.0`) list a peer range topping out at `eslint@^9`, while code.md pins `eslint@10.12.0`. This is a metadata lag, not a functional break — `pnpm install` still succeeded, and these plugins' rules run on ESLint's flat-config API, which didn't change between 9 and 10. Leaving the exact pin as code.md specifies; revisit only if `pnpm lint` actually fails (not just warns) in Checkpoint 2+.

## 5c. `routing.locales` is `["en"]` only in Phase 1, not `["en", "ur"]`

code.md §8 and the brief both say Phase 1 ships English-only "with the `[locale]` segment in place" for Urdu later. Read literally as `locales: ["en", "ur"]`, every page's `generateStaticParams` would try to prerender an `/ur/...` tree with no Urdu messages or content behind it — either a build break or, worse, silently falling back to English under an `/ur/` URL, which misrepresents the page as translated. guide.md §6 is explicit that Urdu must be written or reviewed by a native writer, never machine-translated, so there is no honest placeholder to put there yet. `routing.locales` is `["en"]` for Phase 1; the `[locale]` dynamic segment, the `LocalizedText` content shape (`{ en, ur? }`), and `dir`/`lang` plumbing are all in place and untouched, so adding `"ur"` to this one array is genuinely the only change Phase 2 needs once real translations exist.

## 5d. `tsconfig.json` has `esModuleInterop: true`, which code.md's §3.2 snippet omits

Running `next typegen` (part of the `typecheck` script) auto-rewrote `tsconfig.json` to add `esModuleInterop: true`, reporting it as "a mandatory change... requirement for SWC / babel" for this Next.js version. Kept as Next's tooling set it — code.md §3.2 itself says to keep whatever `create-next-app`/Next's own tooling generates when it differs from the snippet.

## 5e. Header nav — and the home services index — in Phase 1 only list routes that actually exist

design.md §5.1's wireframe shows the full future nav ("Hajj 2027 · Umrah · Flights · Visas · About · Contact") and a four-row services index (Hajj, Umrah, air tickets, visa help). But guide.md §4.3's own priority table puts only Home, `/hajj/2027`, package detail, the booking guide, `/contact`, and `/about/credentials` in P0 (Phase 1) — Umrah, Flights, Visas and Holidays are explicitly out of scope for this phase (prompt.md). Linking to, or listing a service row for, a page that doesn't exist yet would be broken/misleading, not a faithful implementation of the design — and design.md §6 itself says the services index should "hide unconfirmed" rows. Phase 1's header lists only "Hajj 2027," "Credentials," and "Contact"; the home services index (`components/home/services-index.tsx`) lists only Hajj. Re-add the rest to both as each hub ships in Phase 2/3; no structural change needed.

## 5f. Footer's copyright year, and the Hajj 2027 deadline countdown, go through `"use cache"` helpers, not a bare `Date.now()`

`next build` with `cacheComponents: true` (code.md §3.1) refused to prerender over a bare `new Date().getFullYear()` in the footer, and separately over `daysUntil()`'s `Date.now()` default parameter in the `/hajj/2027` page — both correctly flagged as unstable prerender-time values, exactly the "static by default" discipline code.md §0 rule 3 asks for. Added `getCurrentYear()` (`src/lib/format.ts`) and `getSeasonDeadlineStatus()` (`src/content/queries.ts`), both one-line `"use cache"` wrappers with `cacheLife("hours"/"days")` as appropriate, since neither value needs to be live-to-the-second — the deadline is already shown as "days left," never ticking seconds (guide.md §5.2).

## 5g. The hero headline lives in `messages/en.json`, not hardcoded JSX or a new content schema

guide.md §6 offers two sample hero lines "to pick one with client." Picking a hero headline isn't inventing a fact (unlike a price or a hotel name), but code.md §0 rule 2 still says content shouldn't live in components. code.md's schema doesn't define a type for page-level editorial copy like this (only Package/Season/Credential/Review/Video/SiteSettings), and inventing a new content entity for one headline felt like more structure than the problem needs. Used the existing `messages/en.json` "hero" namespace instead (`hero.headline`) — it's already wired into this component for the two CTA labels, and it keeps the string in one swappable file rather than in JSX. Picked guide.md's first option ("Hajj and Umrah from Karachi, with a team that travels with you.") since neither option is marked preferred; easy to change once the client picks.

## 5h. Package detail route needs a build-time-only placeholder param, not a real one

`next build` under Cache Components refuses to build a dynamic route whose `generateStaticParams` returns an empty array — it can't validate there's no unguarded dynamic access without at least one param to render against (https://nextjs.org/docs/messages/empty-generate-static-params). With zero live packages (DECISIONS.md #5), `/hajj/[season]/[slug]`'s own `generateStaticParams` is legitimately empty. The docs' own documented fix for exactly this case is a placeholder param that the page immediately `notFound()`s on, before touching any real data — not a real, crawlable, invented page. Implemented in `src/app/[locale]/hajj/[season]/[slug]/page.tsx` as `PLACEHOLDER_SLUG = "__placeholder__"`; the moment real packages exist, `generateStaticParams` falls through to the normal `listPackages()` mapping and this branch never triggers again.

## 5i. "Instant Navigations" dev warnings on the dynamic Hajj routes, deliberately not fixed in Phase 1

`next dev` (not `next build` — the production build is clean) flags `/hajj/[season]`, `/hajj/[season]/[slug]`, and the `/hajj` redirect with Next 16.3's new Instant Navigations validation: reading `params` directly at the top of a route, outside `<Suspense>`, means a client-side link to that route can't reuse a shared prefetched "App Shell" across different URLs (https://nextjs.org/docs/messages/instant-shell-url-data). This is a real, current Next.js feature — not something code.md anticipated, since it shipped in 16.3 — so it's not silent drift to flag it: it's a genuine finding against the installed version.

The documented fix is to push the `params` read down into a `<Suspense>`-wrapped leaf with a skeleton fallback, restructuring each of these pages. Not doing that in Phase 1: it's a navigation-prefetch optimization, not a correctness issue (every route still prerenders fully and serves the right content — confirmed via `pnpm build` and a live smoke test), it doesn't affect any of code.md §18's actual measured budgets (LCP/CLS/INP/TBT), and in practice visitors mostly arrive at these specific pages directly (WhatsApp links, search, the one Hajj 2027 page) rather than rapidly clicking between many sibling package pages where shared-prefetch reuse would matter most. Worth revisiting once real package data (and therefore real inter-package navigation) exists.

## 5. `packages.ts` ships as an empty array, not draft entries with placeholder facts

`code.md` §0 rule 6 says missing client data gets a `status: "draft"` entry with a `TODO(client)` comment, which read at first glance like it wants draft _rows_. But every field on `Package` that would make a draft row meaningful — name, duration, price, hotel, distance — is exactly the invented-fact category the hard rules forbid, even under a draft label (the rule is "never invent content," not "never invent content for live content"). Since none of guide.md §3's blocking Hajj 2027 package specifics have arrived from the client, `packages.ts` is `[]`. The package-detail template is still fully built and tested — against a fixture in `tests/fixtures/example-package.ts` that's structurally valid but never imported by `app/` — so the moment real package data lands, it ships with zero code changes.
