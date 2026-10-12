# ASSETS-NEEDED.md

Every placeholder asset slot, by design.md §10 asset ID where one exists. Updated as pages are built (Checkpoint 2+ will add the home/route/package slots below as those components are written). Nothing here is downloaded from the web or AI-generated for people/sacred-site slots, per the hard rules.

## Logo (resolved, partially)

- **Icon mark** — resolved. Client supplied `logo.png` (3810×3810, transparent) mid-build; archived at `brand/junaidi-icon-mark.png`, served from `public/brand/junaidi-icon-mark.png`. Used untouched (DECISIONS.md, "Update (Checkpoint 1)" note under §1).
- **SVG redraw of the icon mark** — still needed. Only a raster PNG exists; a vector redraw is needed for the favicon and any large/print use. Per the hard rule, using the PNG as-is until this is delivered.
- **Wordmark lockup** — not supplied. No "Junaidi Group" wordmark artwork file exists (only the icon). Header/footer pair the untouched icon with "Junaidi Group" set as real text in the site's own Archivo type (not a redraw of a wordmark that was never supplied).
- **Favicon** — pending. Needs the SVG redraw above before it can be produced per design.md §8's spec ("the arch/icon mark in ink on marble").

## Home (design.md §10.1) — not yet built (Checkpoint 2)

- H-01 Hero video loop, H-02 Hero poster, H-03 Marble texture, S-01–S-05 services cursor previews, C-01 credentials thumbnail, O-01 office photo — none built yet. Each will render as a neutral marble-block placeholder with the asset ID and intended content as a dev-only caption until real client footage/licensed photos arrive, per the hard rule (no AI/stock Kaaba, Haram, or people images; design.md §10's AI prompts are only for category C slots).

## The route (design.md §10.2) — not yet built (Checkpoint 2)

- R-01 base map (SVG, built by hand from OSM shapes — not a placeholder, built directly), R-03–R-09 stop media, R-02/R-10 optional AI atmosphere layers (category C, fine to generate if used) — none built yet.

## Hajj 2027 / package detail (design.md §10.3)

- P-01 hotel photos, P-02 Mina/Arafat photos — moot until real packages exist (DECISIONS.md #5); will be built against real package content once it arrives, never generic "luxury room" stock per the hard rule.

## OG images (design.md §10.9)

- Not yet built (Checkpoint 4). Generated in code via `next/og` — marble background, Archivo title, a crimson rule, "Junaidi Group" wordmark text. No photos, so never goes out of date.
