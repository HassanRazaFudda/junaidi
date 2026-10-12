# ASSETS-NEEDED.md

Every placeholder asset slot, by design.md §10 asset ID where one exists. Updated as pages are built (Checkpoint 2+ will add the home/route/package slots below as those components are written). Nothing here is downloaded from the web or AI-generated for people/sacred-site slots, per the hard rules.

## Logo (resolved, partially)

- **Icon mark** — resolved. Client supplied `logo.png` (3810×3810, transparent) mid-build; archived at `brand/junaidi-icon-mark.png`, served from `public/brand/junaidi-icon-mark.png`. Used untouched (DECISIONS.md, "Update (Checkpoint 1)" note under §1).
- **SVG redraw of the icon mark** — still needed. Only a raster PNG exists; a vector redraw is needed for the favicon and any large/print use. Per the hard rule, using the PNG as-is until this is delivered.
- **Wordmark lockup** — not supplied. No "Junaidi Group" wordmark artwork file exists (only the icon). Header/footer pair the untouched icon with "Junaidi Group" set as real text in the site's own Archivo type (not a redraw of a wordmark that was never supplied).
- **Favicon** — pending. Needs the SVG redraw above before it can be produced per design.md §8's spec ("the arch/icon mark in ink on marble").

## Home (design.md §10.1)

- **H-01/H-02 hero video loop + poster** — built as a placeholder (`components/home/hero.tsx`, inside the arch `clipPath` frame). Renders `PlaceholderMedia` until client footage arrives (guide.md §1.6).
- **H-03 marble texture, S-01–S-05 services cursor previews, C-01 credentials thumbnail** — not needed yet in Phase 1: the credentials-band texture isn't used without real credentials rendering, and the services cursor-preview is Motion/Checkpoint 3 scope and only applies to the full multi-row services index, which is currently a single Hajj-only row (DECISIONS.md #5e).
- **O-01 office photo** — built as a placeholder (`components/home/office.tsx`). Pending the shoot in design.md §11.
- **contact-map** (not a design.md-numbered asset) — a map/pin for the office location on `/contact`; currently a placeholder block.

## The route (design.md §10.2)

- **R-01 base map** — built, but as a schematic stand-in (`src/components/route/route-map.tsx`): an abstract flowing path through the 8 stops, not a traced geographic map. design.md specifies this as hand-traced from real OpenStreetMap shapes by a designer, which this agent can't faithfully do without GIS tooling or a human design pass — so it deliberately carries no OpenStreetMap attribution (that would misstate its source). Needs a real designer pass; IDs (`#seg-{id}`, `#pin-{id}`) already match design.md's convention so swapping the markup won't touch the Checkpoint 3 GSAP enhancer.
- R-03–R-09 stop media, R-02/R-10 optional AI atmosphere layers (category C, fine to generate if used) — not built yet; each stop currently renders the `PlaceholderMedia` block.

## Hajj 2027 / package detail (design.md §10.3)

- P-01 hotel photos, P-02 Mina/Arafat photos — moot until real packages exist (DECISIONS.md #5); will be built against real package content once it arrives, never generic "luxury room" stock per the hard rule.

## OG images (design.md §10.9)

- Not yet built (Checkpoint 4). Generated in code via `next/og` — marble background, Archivo title, a crimson rule, "Junaidi Group" wordmark text. No photos, so never goes out of date.
