# CLIENT-TODO.md

Every `TODO(client)` / `TODO(client/legal)`, grouped by page/area. Updated as the build progresses — Checkpoint 2+ will add page-specific items as those pages are built.

## guide.md §13 launch checklist — status

- [x] No Hajj payment path anywhere on the site (verified by `tests/e2e/hajj-2027.spec.ts`)
- [x] No AI-generated faces anywhere (none used; real people/sacred-site slots are all placeholders pending real assets — `ASSETS-NEEDED.md`)
- [x] Reduced-motion and keyboard pass on every page (`tests/e2e/reduced-motion.spec.ts`, `tests/e2e/a11y.spec.ts` — zero serious/critical axe violations on every Phase 1 route)
- [x] Lighthouse mobile ≥ 90 performance on Home and `/hajj/2027` (97 and 97 respectively; see DECISIONS.md #5n for the one sub-budget that still misses — LCP ~2.6s vs code.md §18's stricter <2.0s)
- [ ] Every credential links to an official source **and** the client has approved the wording in writing — sources are linked in the data layer now, but nothing renders until `verifiedByClient: true` (DECISIONS.md #3)
- [x] Every package has season/price-checked date/inclusions/exclusions — enforced structurally by the Zod schema; two real Umrah packages now populated this way (DECISIONS.md #5z+7). Hajj 2027 still has none — see "Blocking Phase 1" below (DECISIONS.md #5).
- [ ] Every photo/video of an identifiable person has consent on file — the four YouTube videos need a human to actually watch them first (`openedAndReviewed`, CLIENT-TODO "Videos" section below)
- [ ] Phone/WhatsApp/address identical across footer, contact page, Google Business Profile, and Facebook — internally consistent across the site itself; aligning the client's Google/Facebook profiles to match is outside this codebase
- [ ] Urdu pages reviewed by a native writer — not applicable yet, Phase 1 is English-only by scope (`DECISIONS.md` #5c)
- [ ] Privacy policy covers form data and WhatsApp — currently a structured placeholder pending real legal text
- [ ] Old domain (`junaidigroup.com`) directory listing disabled; redirects in place — hosting/infrastructure work outside this codebase

## Blocking Phase 1 (guide.md §3)

- [ ] Written confirmation of the Hajj 2027 arrangement with Al Wakeel Munazzam, and the exact wording approved for publication. Until this arrives, the credential line and all four licence/registration rows stay hidden site-wide (DECISIONS.md #3; confirmed as the default by the user at Checkpoint 0).
- [ ] Hajj 2027 package list as it appears on the official portal: name, duration, price, Makkah hotel, Madinah hotel, distance claims (and how measured), Mina/Arafat category, flights, Qurbani, inclusions/exclusions. Nothing renders on `/hajj/2027` or any package page until this arrives (DECISIONS.md #5) — `src/content/local/data/packages.ts` has zero Hajj rows. The client's own Facebook (DECISIONS.md #5z+7) gave a partial data point — a "C Category" price from PKR 1,795,000 and an "11–25 days" duration range across two separate posts — but that's too thin for the required fields (a specific `durationDays`, hotels, inclusions) without guessing inside the range, so no Hajj package was added from it.
- [x] Current Umrah package list — two real tiers now populated in `src/content/local/data/packages.ts` (Economy from Fundaq Bilal/Shaza Munawara, Star from Badar Al Masa/Rua Al Masi Hotel), sourced from the client's own Facebook posts (DECISIONS.md #5z+7). Both posts advertised a single 20 Aug departure that has already passed — the hotel pairing/nights/4-tier pricing structure is real, but `priceCheckedOn` is dated 13 Jul so the site's own "Price checked on" line honestly shows this as several months stale rather than current. Worth asking the client directly for the current month's batch/pricing to replace these with a non-stale instance.
- [ ] One primary WhatsApp number — guide.md §1.1 found two conflicting numbers in use (+92 332 2202656 on Facebook, +92 323 4271012 elsewhere). Site reads `NEXT_PUBLIC_WHATSAPP_NUMBER` from the environment; set the real number at deploy time.
- [x] One canonical email address — resolved by checking Facebook's own "Contact info" page directly rather than a flyer graphic: it lists `junaiditravels@gmail.com` as the page's own published email. Added to `site.ts` and now shown on `/contact` (DECISIONS.md #5z+7).
- [ ] Minor landline discrepancy spotted while sourcing the above: `site.ts` has `021-34130184-88`, but flyer footers consistently print `+92 21 34130184-87` (one digit short on the range). Not changed either way without the client confirming which is correct.
- [ ] A real Hajj 2027 document-preparation checklist (new-fixes.md §15.3 names this explicitly, alongside the "How booking works" steps `BookingSteps` already covers) — what a pilgrim actually needs to prepare (passport validity window, photos, any required certificates, etc.). No such list exists in `guide.md` or anywhere else in the project's sourced facts, so nothing was built for this rather than inventing a plausible-sounding one.
- [ ] Original files (not Facebook-downloaded/compressed copies) of the Hajj 2024/2025 videos, if they're to be used beyond the existing YouTube embeds.
- [ ] Logo source files: an SVG/vector redraw of the icon mark, and (if there is one) the "Junaidi Group" wordmark artwork. See ASSETS-NEEDED.md.
- [ ] Domain registrar + hosting access for `junaidigroup.com` (currently a broken "Index of /" directory listing per guide.md §1.5) and Facebook page admin access (its website field currently points to an unrelated India-based company).

## Licences and credentials (guide.md §1.1)

- [ ] DTS licence 2357, IATA 27-31139-5, HGO enrolment 4299 — currently sourced only from a secondary directory (Ibadat.pk); need the original certificates to verify.
- [ ] Footer badge row — added 2026-10-14 per a client request, removed the same day on new-fixes.md's explicit guidance against unverified badge walls (DECISIONS.md #5z / #5z+6). If the client later confirms actual membership in IATA, HOAP (Hajj Organizers Association of Pakistan), TAAP (Travel Agents Association of Pakistan), SECP, and which exact Pakistan-government seal applies, add real `Credential` records for each (HOAP/TAAP/SECP have none today) the same way IATA/DTS/HGO are modelled, with a citable `sourceUrl` — that's the better path back in, not a bare image strip.
- [ ] "Founded 2005" — currently only the company's own self-description; not published as fact until confirmed.
- [ ] Leadership names/titles — not published until the client confirms who should appear.
- [ ] Official MoRA 2025–26 Umrah attested-operators list URL — guide.md §1.4 asserts Junaidi is on this list, but only a 2021–22 list is linked in guide.md's sources. No Credential record was created for this without a real citable source (DECISIONS.md #4).

## Videos (guide.md §1.6)

- [x] All five opened and scrubbed through in browser (2026-10-14), confirmed real on the client's own "Junaidi Air Travels" channel, `openedAndReviewed: true` in `src/content/local/data/videos.ts`. See DECISIONS.md #5z+1: consent-for-filming is the agency's own operational matter for its own past-client footage, not something visual review from outside resolves either way — flipped per the user's explicit direction, not a claim that every frame was legally cleared.
  - `kvf_3_NYtSY` — Special Hajj packages, Hajj 2024
  - `zM_GAKnPZZw` — VIP/Deluxe halls in Arafat, Hajj 2025
  - `YhAEdfjsmgA` — VIP camps in Mina, Hajj 2025
  - `m6SOo712028` — Brand clip
  - `G3-Y2EFkwps` — "Our exclusive Hajj package offers the best location"
- [ ] A sixth real video the user pointed at, `SY_QAy_FETE` ("A Simple Guide to Hajj"), was **not** added — at ~45 minutes it doesn't fit fix.md §4.5's short-highlight-clip card format regardless of content. Worth a short, purpose-cut highlight reel if the client wants more than these five.
- [ ] Facebook "Junaidi Group Highlights of HAJJ 2025" clip — guide.md flags this as the best hero-loop candidate; need the original file from the client.

## Office

- [ ] Office hours — not given anywhere in guide.md. Facebook's own "Hours" field says "Always open," but that reads like an unedited Facebook default most businesses never bother changing, not a real confirmed schedule — not trusted as a fact, still omitted from the Home office block and the Hajj 2027 contact block rather than guessed.
- [ ] Office photo (O-01, entrance + front desk) and a map embed/pin — both pending the shoot described in design.md §11.

## Reviews

- [ ] Google Business Profile access + permission to embed real, dated reviews. None are seeded (guide.md: hidden until real reviews exist; `Review.consent` can't be fabricated).

## Blocking Phase 2 (guide.md §3, for later reference)

- [ ] IATA, DTS and Umrah attestation certificates (scans)
- [ ] Which visa countries/categories are actually handled
- [ ] Whether holiday packages are sold today, and which destinations/suppliers
- [ ] Team members willing to appear on the site (name, role, photo)
- [ ] Consent forms on file for any pilgrim identifiable in footage used

## Legal (structured placeholder pages, Phase 1)

- [ ] `/privacy`, `/terms`, `/cancellation-policy`, `/complaints` ship as structured placeholders explaining the policy is being finalised with legal counsel. Real policy text needed before these can be marked complete.
