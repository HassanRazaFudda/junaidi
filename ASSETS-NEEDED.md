# ASSETS-NEEDED.md

Every placeholder asset slot, by design.md §10 asset ID where one exists. Updated as pages are built (Checkpoint 2+ will add the home/route/package slots below as those components are written). Nothing here is downloaded from the web or AI-generated for people/sacred-site slots, per the hard rules.

## fix.md v3 review-build stock photography (temporary exception)

fix.md's client-review build is deliberately photo-heavy; the original hard rule against stock/AI imagery of the Kaaba, the Haram/Nabawi mosques, or people was relaxed **for this review build only**, on the user's explicit instruction. Every photo below is a genuinely free licence (verified "Free Photo" on its source page, not a paid Unsplash+/Getty tier), credited in code via `ImageRef.credit`, and contains no identifiable people. **All must be swapped for the client's own or commissioned photography before any production launch** — none of these are licensed for indefinite commercial use beyond this review.

No file was downloaded; each is referenced by its source CDN URL and loaded through `next/image` (`next.config.ts` `images.remotePatterns`).

| Use                                                                                                        | File / component                        | Source   | Photographer       | Licence page                                                                                      |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| Home hero, full-bleed (high aerial, Haram at night)                                                        | `components/home/hero.tsx`              | Pexels   | arjan carja        | https://www.pexels.com/photo/aerial-view-of-mecca-s-grand-mosque-at-night-36954370/               |
| CTA band background, heavily darkened (same aerial as hero)                                                | `components/home/cta-band.tsx`          | Pexels   | arjan carja        | https://www.pexels.com/photo/aerial-view-of-mecca-s-grand-mosque-at-night-36954370/               |
| Package card — "Makkah skyline at dusk" (Umrah economy tiers)                                              | `content/local/data/packages.sample.ts` | Pexels   | Rushdi Fatani      | https://www.pexels.com/photo/illuminated-clock-tower-and-cityscape-at-dusk-19174886/              |
| Package card — "Makkah hotel district" (Umrah/Hajj standard-premium tiers)                                 | `content/local/data/packages.sample.ts` | Pexels   | Musaddek Sayek     | https://www.pexels.com/photo/arial-view-of-makkah-skyline-and-mountains-38461889/                 |
| Package card — "Haram at night" (Umrah premium tiers)                                                      | `content/local/data/packages.sample.ts` | Unsplash | Ben Latif          | https://unsplash.com/photos/a-tall-clock-tower-illuminated-at-night-with-green-lights-EoboBF6RfDY |
| Package card — Hajj short (tent camp, illustrative, explicitly captioned "not our actual Mina camp")       | `content/local/data/packages.sample.ts` | Pexels   | Moussa Idrissi     | https://www.pexels.com/photo/traditional-berber-tents-in-m-hamid-el-ghizlane-desert-35666328/     |
| Package card — Hajj long (desert plain/mountains, illustrative, explicitly captioned "not Jabal al-Rahma") | `content/local/data/packages.sample.ts` | Pexels   | Veronika Latysheva | https://www.pexels.com/photo/vast-desert-landscape-with-mountain-range-37676612/                  |
| Services card — Air tickets                                                                                | `components/home/services-cards.tsx`    | Pexels   | Nihar Manyalli     | https://www.pexels.com/photo/aerial-view-of-clouds-through-airplane-window-35173466/              |
| Services card — Visa & documentation                                                                       | `components/home/services-cards.tsx`    | Pexels   | Pixabay            | https://www.pexels.com/photo/selective-focus-photography-of-person-signing-on-paper-261621/       |
| Services card — International tours                                                                        | `components/home/services-cards.tsx`    | Pexels   | Ayşe7              | https://www.pexels.com/photo/city-against-the-sky-at-dusk-14529110/                               |
| Services card — Hotels                                                                                     | `components/home/services-cards.tsx`    | Pexels   | Mateusz Pielech    | https://www.pexels.com/photo/modern-hotel-bedroom-with-sleek-minimalist-design-39338444/          |

Two photo slots were deliberately rejected after review and are **not** used: a Pexels "Ukrainian passports" flat-lay and a Pexels "US passport + boarding pass" flat-lay, both for showing a specific country's passport on a Pakistani agency's visa card (would misrepresent the service, same reasoning as the "never invent content" rule applied to imagery) — replaced with the nationality-neutral signature/document photo above. Two Unsplash Mina-tent candidates were rejected as Unsplash+ (paid) before the Pexels tent-camp photo was found.

A close-up, ground-level crowd photo of pilgrims at the Kaaba (Pexels, "Pilgrims Gather at the Kaaba in Mecca," Fahad Puthawala) was also rejected for the hero, twice — once as a screenshot the user supplied directly, once when the same photo turned up again by URL. Both times for the same reason: individual faces, including a child's, are clearly identifiable. A free Pexels licence covers the photographer's copyright, not consent from the people pictured, and the hard rule against images of identifiable people doesn't carve out an exception for "found on a stock site." The high-aerial photo used instead (arjan carja, above) gives the same sense of scale the user wanted without that problem — from that height the crowd reads as texture, not as individuals.

Two more photos were sourced (verified free, credited) but ended up **not placed anywhere** — fix.md §6.2's shot list names a "Madinah/Masjid an-Nabawi accent" and a "minaret accent," but fix.md §7's actual section-by-section mockup has no photo slot in the Umrah-packages header or the Hajj 2027 band, and adding one not called for by the structural spec would be scope creep. Kept here in case a future pass (e.g. a dedicated Umrah hub page, guide.md §4) wants them: Masjid an-Nabawi green dome, photographer djonk creative, https://unsplash.com/photos/a-domed-building-with-a-green-dome-YpMYTuKTglA; minaret against a clear sky, photographer Hisham Zayadneh, https://unsplash.com/photos/minaret-of-a-mosque-against-a-clear-sky-RTBQX1sfmXo.

## Logo (resolved, partially)

- **Icon mark** — resolved. Client supplied `logo.png` (3810×3810, transparent) mid-build; archived at `brand/junaidi-icon-mark.png`, served from `public/brand/junaidi-icon-mark.png`. Used untouched (DECISIONS.md, "Update (Checkpoint 1)" note under §1).
- **SVG redraw of the icon mark** — still needed. Only a raster PNG exists; a vector redraw is needed for the favicon and any large/print use. Per the hard rule, using the PNG as-is until this is delivered.
- **Wordmark lockup** — not supplied. No "Junaidi Group" wordmark artwork file exists (only the icon). Header/footer pair the untouched icon with "Junaidi Group" set as real text in the site's own Archivo type (not a redraw of a wordmark that was never supplied).
- **Favicon** — pending. Needs the SVG redraw above before it can be produced per design.md §8's spec ("the arch/icon mark in ink on marble").

## Home (design.md §10.1)

- **H-01/H-02 hero video loop + poster** — superseded for the review build by fix.md §3.2's full-bleed photo hero (`components/home/hero.tsx`), using the licensed Haram-at-night stock photo above instead of the arch-framed `PlaceholderMedia` block the v2 design used. Once Junaidi's own hero footage arrives (guide.md §1.6), it replaces the stock photo here — the surrounding markup (gradient overlay, Talbiyah line, H1) doesn't need to change for that swap.
- **H-03 marble texture, S-01–S-05 services cursor previews, C-01 credentials thumbnail** — still not needed: the credentials-band texture isn't used without real credentials rendering, and the services cursor-preview was v2's single-row nav-style services index, which fix.md §7 replaced with the 4 image cards above (DECISIONS.md #5e's "only real routes" reasoning no longer blocks this card row — fix.md's cards link out to WhatsApp, not to unbuilt pages).
- **O-01 office photo** — `components/home/office.tsx` was deleted when the v3 home page order (fix.md §7) dropped the standalone Office section: the office address is still real, confirmed content, shown via the Trust strip badge on home and the full address + map placeholder on `/contact`. If a future pass wants the fuller Office block back, it's in git history.
- **contact-map** (not a design.md-numbered asset) — a map/pin for the office location on `/contact`; currently a placeholder block.

## The route (design.md §10.2) — superseded by fix.md §11 step 7

design.md §10.2's R-01–R-10 asset slots (base map, per-stop photos, AI atmosphere layers) were all scoped to the original pinned, map-driven home-page route (`components/route/manasik-route.tsx`, `route-map.tsx`), which fix.md §3.2/§9.1 removed entirely — it's not coming back. That route's content is now a compact, text-only horizontal stepper on `/hajj/[season]` (`components/route/hajj-stepper.tsx`, fix.md §11 step 7) with no map and no per-stop imagery at all, so none of these asset slots apply any more. If a future pass wants per-stop photography on the stepper, that would be new asset planning against the current design, not a resumption of design.md §10.2's old spec.

## Hajj 2027 / package detail (design.md §10.3)

- P-01 hotel photos, P-02 Mina/Arafat photos — moot until real packages exist (DECISIONS.md #5); will be built against real package content once it arrives, never generic "luxury room" stock per the hard rule.

## OG images (design.md §10.9)

- Not yet built (Checkpoint 4). Generated in code via `next/og` — marble background, Archivo title, a crimson rule, "Junaidi Group" wordmark text. No photos, so never goes out of date.
