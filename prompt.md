# Prompt: Build the Junaidi Group website (Phase 1)

Paste everything below the line into your coding agent (Claude Code, Cursor, etc.) from the root of an empty project folder that contains `guide.md`, `design.md`, `code.md` and a `brand/` folder with the logo files.

---

You are the lead engineer and design engineer for the Junaidi Group website: a Karachi Hajj, Umrah and travel company. Build **Phase 1** to production quality.

## Source documents and authority

Read all three files completely before writing any code:

1. `guide.md` — what the site is, what it may and may not claim, sitemap, page specs, roadmap.
2. `design.md` — visual system, tokens, wireframes, components, motion spec, imagery rules.
3. `code.md` — versions, configuration, architecture, content layer, caching, motion implementation, testing, budgets.

When they conflict, follow this order:
1. **guide.md §2 compliance rules** (always win: no Hajj payments, no unsourced claims, no guarantees, no pilgrim personal data, no fake people)
2. **code.md** for anything about how it is built
3. **design.md** for anything about how it looks and moves
4. Your own judgement, written down in `DECISIONS.md` with the reason

If something in the files is technically wrong for the installed versions (an API changed, a flag was renamed), check the official docs (`https://nextjs.org/docs/llms.txt` for Next.js), fix it, and record it in `DECISIONS.md`. Don't silently drift from the documents.

## Hard rules

- **Never invent content.** No made-up prices, hotels, distances, reviews, team members, pilgrim counts or awards. Where client data is missing, add content entries with `status: "draft"` or `verifiedByClient: false` and a `// TODO(client): …` comment. Drafts don't render; pages show the honest pending state described in code.md §0.
- **No Hajj payment path anywhere.** Hajj CTAs lead to the official portal and to WhatsApp, exactly as guide.md §5.2–5.3 describe.
- **No AI-generated or stock images of the Kaaba, the Haram mosques, or people.** For any asset slot listed in design.md §10, render a neutral placeholder (marble block with the asset ID and its intended content as a caption visible only in development) and list it in `ASSETS-NEEDED.md`. Do not download images from the web.
- **The logo is the client's artwork.** Use the files in `brand/`. Don't redraw, recolour or retype the wordmark. If no SVG exists, use the PNG and add the SVG redraw to `ASSETS-NEEDED.md`.
- **Exact versions** from code.md §1, verified with `pnpm view <pkg> version` at start. Use pnpm only. TypeScript 6.x unless typescript-eslint now supports 7 (check its peer range).
- **Every page prerendered.** Keep `ensureStatic = "navigation"` passing.
- **Motion only where design.md §7 specifies.** No extra fade-ups, counters, parallax or cursor effects.
- **Accessibility and reduced motion are not optional.** Content must be complete with JS off and with reduced motion on.

## Known facts you may use now

From guide.md §1 (all others are TODO(client)):
- Legal name: Junaidi Air Travels & Tours (Pvt) Ltd; brand: Junaidi Group
- Office: Suite 7–8, Mezzanine Floor, Mona Square, Jahangir Road, near Kanzul Iman Masjid, Gurumandir, Karachi
- Landline: 021-34130184-88
- Hajj 2027 credential line and its two MoRA source documents (guide.md §1.2), stored as a `Credential` with `verifiedByClient: false` until the client confirms
- Hajj 2027 private booking deadline: 20 November 2026; official portal https://hajj.mora.gov.pk
- Brand colours `#A00C20` and `#111726` (design.md §2.2)

Mobile/WhatsApp number is unconfirmed: read it from `NEXT_PUBLIC_WHATSAPP_NUMBER` and leave the value for the client.

## Phase 1 scope

Build exactly these, English only, with the `[locale]` routing already in place for Urdu later:

1. Project scaffold and tooling (code.md §2–3, §17)
2. Design tokens, fonts, global styles (code.md §5, design.md §2–4)
3. Layout: season strip, header (logo, nav, WhatsApp), footer with credentials and policies, mobile sticky contact bar
4. Content layer with schemas, local adapter and seed data from known facts + drafts (code.md §7)
5. Home (guide.md §5.1): season strip, hero with video slot and crimson swoosh, services index, credentials with evidence drawer, the route section, packages preview, past groups (placeholder slots), reviews (hidden until real reviews exist), office block
6. `/hajj/2027` season page (guide.md §5.2)
7. Package detail template (guide.md §5.3), rendered from content; drafts not rendered
8. `/hajj/how-private-hajj-booking-works` guide page (copy from guide.md §5.2 steps; mark for scholar/client review)
9. `/about/credentials` and `/contact` with the inquiry form (code.md §12)
10. Privacy, terms, cancellation and complaints pages as structured placeholders marked TODO(client/legal)
11. SEO: metadata, sitemap, robots, JSON-LD for `TravelAgency` (verified fields only), OG image route
12. Tests and CI (code.md §16–17)

Out of scope for Phase 1: Umrah pages, flights, visas, holidays, Urdu translations, CMS, analytics consent banner (stub the `track()` helper only).

## Work plan

Work in this order. After each checkpoint, stop and give me a short report: what you built, what you decided (and logged), what's blocked on the client, and the output of `pnpm check` and `pnpm build`.

**Checkpoint 0 — Plan (no code yet)**
- Confirm Node and latest package versions; list any differences from code.md §1.
- Write `PLAN.md`: file tree, components per page, content entries, and the order you'll build them.
- List questions that genuinely block you. Otherwise proceed with documented assumptions.

**Checkpoint 1 — Foundation**
- Scaffold with pnpm per code.md §2, apply all configs from §3, tokens and fonts from §5, i18n skeleton from §8.
- Content schemas, repository, local adapter, seed data, content unit tests.
- Layout shell: header, footer, season strip (cached deadline logic per code.md §6.1), sticky contact bar.

**Checkpoint 2 — Pages without motion**
- Build every Phase 1 page fully server-rendered and complete without any animation.
- Package detail template wired to content; Hajj 2027 page lists live packages or the pending state.
- Inquiry form with server action, validation, honeypot, error states and WhatsApp continuation.
- Route section as a static, accessible stacked timeline with the SVG map (stops and copy from design.md §7.3, flagged for scholar review).

**Checkpoint 3 — Motion**
- Motion provider with `LazyMotion` + `m`; header hide/show, drawers, accordion, tabs, cursor preview exactly per design.md §7.2.
- Home load sequence and the route enhancer with dynamically imported GSAP per code.md §11.3.
- Verify: GSAP not in the initial bundle; reduced-motion run shows complete content; no ScrollTrigger leaks on navigation.

**Checkpoint 4 — Quality**
- SEO (code.md §13), security headers (§3.1, §15), E2E + axe tests (§16), CI workflow (§17).
- Run Lighthouse on Home, `/hajj/2027` and one package page against code.md §18 budgets. Fix until they pass, or explain exactly why one can't yet (e.g. a missing real asset).
- If you can take screenshots, review Home and the package page at 390px and 1440px against design.md §5 wireframes and §3 "what changed" table. Remove anything that drifts toward the rejected looks.

## Deliverables

- Working Next.js app passing `pnpm check`, `pnpm build` and `pnpm e2e`
- `PLAN.md`, `DECISIONS.md` (every deviation, with reason), `ASSETS-NEEDED.md` (every placeholder by design.md asset ID), `CLIENT-TODO.md` (every `TODO(client)` collected, grouped by page)
- `README.md`: setup, scripts, how to add a package or season in the content files, how the CMS swap will work (code.md §19)

## Definition of done

- Every guide.md §13 launch-checklist item that doesn't depend on the client is ticked; the rest are listed in `CLIENT-TODO.md`
- No invented facts anywhere in the rendered site
- All pages static, keyboard-usable, readable with JS off and with reduced motion
- Budgets in code.md §18 met on the three key pages
- The site looks like design.md v2 (marble, ink, one crimson line motif, Archivo, client logo), not like a generic travel template
