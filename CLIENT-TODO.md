# CLIENT-TODO.md

Every `TODO(client)` / `TODO(client/legal)`, grouped by page/area. Updated as the build progresses — Checkpoint 2+ will add page-specific items as those pages are built.

## Blocking Phase 1 (guide.md §3)

- [ ] Written confirmation of the Hajj 2027 arrangement with Al Wakeel Munazzam, and the exact wording approved for publication. Until this arrives, the credential line and all four licence/registration rows stay hidden site-wide (DECISIONS.md #3; confirmed as the default by the user at Checkpoint 0).
- [ ] Hajj 2027 package list as it appears on the official portal: name, duration, price, Makkah hotel, Madinah hotel, distance claims (and how measured), Mina/Arafat category, flights, Qurbani, inclusions/exclusions. Nothing renders on `/hajj/2027` or any package page until this arrives (DECISIONS.md #5) — `src/content/local/data/packages.ts` is intentionally empty.
- [ ] One primary WhatsApp number — guide.md §1.1 found two conflicting numbers in use (+92 332 2202656 on Facebook, +92 323 4271012 elsewhere). Site reads `NEXT_PUBLIC_WHATSAPP_NUMBER` from the environment; set the real number at deploy time.
- [ ] One canonical email address — guide.md §1.5 found a Gmail address on Facebook and a junaidigroup.com address elsewhere, with no single confirmed one. Omitted from the site entirely until resolved (contact page currently shows landline/WhatsApp/office only).
- [ ] Original files (not Facebook-downloaded/compressed copies) of the Hajj 2024/2025 videos, if they're to be used beyond the existing YouTube embeds.
- [ ] Logo source files: an SVG/vector redraw of the icon mark, and (if there is one) the "Junaidi Group" wordmark artwork. See ASSETS-NEEDED.md.
- [ ] Domain registrar + hosting access for `junaidigroup.com` (currently a broken "Index of /" directory listing per guide.md §1.5) and Facebook page admin access (its website field currently points to an unrelated India-based company).

## Licences and credentials (guide.md §1.1)

- [ ] DTS licence 2357, IATA 27-31139-5, HGO enrolment 4299 — currently sourced only from a secondary directory (Ibadat.pk); need the original certificates to verify.
- [ ] "Founded 2005" — currently only the company's own self-description; not published as fact until confirmed.
- [ ] Leadership names/titles — not published until the client confirms who should appear.
- [ ] Official MoRA 2025–26 Umrah attested-operators list URL — guide.md §1.4 asserts Junaidi is on this list, but only a 2021–22 list is linked in guide.md's sources. No Credential record was created for this without a real citable source (DECISIONS.md #4).

## Videos (guide.md §1.6)

- [ ] guide.md explicitly asks to "open each one before using it" — this agent cannot screen video content or verify consent/face-visibility compliance. All four YouTube videos are in the data layer with real IDs and season labels but `openedAndReviewed: false`, so none render yet. A human needs to watch each one and flip the flag in `src/content/local/data/videos.ts`:
  - `kvf_3_NYtSY` — Special Hajj packages, Hajj 2024
  - `zM_GAKnPZZw` — VIP/Deluxe halls in Arafat, Hajj 2025
  - `YhAEdfjsmgA` — VIP camps in Mina, Hajj 2025
  - `m6SOo712028` — Brand clip
- [ ] Facebook "Junaidi Group Highlights of HAJJ 2025" clip — guide.md flags this as the best hero-loop candidate; need the original file from the client.

## Reviews

- [ ] Google Business Profile access + permission to embed real, dated reviews. None are seeded (guide.md: hidden until real reviews exist; `Review.consent` can't be fabricated).

## Blocking Phase 2 (guide.md §3, for later reference)

- [ ] IATA, DTS and Umrah attestation certificates (scans)
- [ ] Current Umrah packages: hotels, nights, prices, transport, visa included or not
- [ ] Which visa countries/categories are actually handled
- [ ] Whether holiday packages are sold today, and which destinations/suppliers
- [ ] Team members willing to appear on the site (name, role, photo)
- [ ] Consent forms on file for any pilgrim identifiable in footage used

## Legal (structured placeholder pages, Phase 1)

- [ ] `/privacy`, `/terms`, `/cancellation-policy`, `/complaints` ship as structured placeholders explaining the policy is being finalised with legal counsel. Real policy text needed before these can be marked complete.
