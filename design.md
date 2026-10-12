# Junaidi Group — Design System

Companion file: `guide.md` (research, compliance, sitemap, tech, roadmap).
Approach follows the frontend-design skill: subject first, a compact token system, a review against the brief, then one bold element and disciplined everything else.

---

## 1. Subject, audience, job

- **Subject:** a Karachi travel company whose real strength is organised Hajj and Umrah groups (Hajj 2027 through Al Wakeel Munazzam, Umrah attested 2025–26), plus ticketing and visa help.
- **Audience:** families in Karachi and overseas Pakistanis booking for themselves or their parents. Many visitors are 45+, on mobile, arriving from WhatsApp or Facebook.
- **Primary job of the site:** make a careful person feel sure enough to message Junaidi, and make it obvious how official booking works.

The design should feel like **care and precision**, not like a luxury hotel ad.

---

## 2. Design plan

### 2.1 Concept: "The route"

Hajj is a journey with fixed places and fixed days: Makkah, Mina, Arafat, Muzdalifah, Mina again, Makkah, Madinah. That sequence is the most characteristic thing in this subject's world, and no competitor uses it as the organising idea of their site.

The memorable element is a **scroll-driven route map**: a single brass line draws itself across a quiet map of the Mashair while the page tells, day by day, what the pilgrim does and what Junaidi's team does. The page background moves through the light of those days: morning marble, Arafat afternoon haze, Muzdalifah night, dawn again.

Everything else stays calm: marble-white surfaces, deep night-indigo text, real photographs, plain language.

### 2.2 Colour

Drawn from materials of the Haram and the days of Hajj.

| Token | Hex | Source idea | Use |
|---|---|---|---|
| `--marble` | `#ECEEEA` | cool polished floor of the Haram | page background |
| `--paper` | `#FFFFFF` | ihram cloth | raised surfaces, forms, tables |
| `--night` | `#16213B` | the sky at Muzdalifah | primary text, primary buttons, night section background |
| `--brass` | `#A5803F` | brass lanterns and door fittings | route line, hairline accents, active pins. **Decorative and large UI only** (≈3:1 on marble) |
| `--brass-deep` | `#7A5C26` | aged brass | small accent text that must pass AA |
| `--haze` | `#D3DEE5` | the pale sky over Arafat | map land, Arafat state, info notes |
| `--stone` | `#5E655F` | grey granite of the Makkah hills | secondary text, captions |

Functional: `--ok #2E6B4E`, `--alert #A23B2A`, `--line rgba(22,33,59,.14)`.

### 2.3 Type

| Role | Typeface | Why |
|---|---|---|
| Display (H1–H3, route place names) | **Marcellus** (Google Fonts, 400) | Inscriptional letterforms, like names cut into stone. Calm authority without gold-serif "luxury" cliché |
| Text and UI | **Hanken Grotesk** (400/500/600) | Clear at small sizes, neutral next to Marcellus, good numerals for prices and distances |
| Urdu | **Noto Nastaliq Urdu** (400/600) | Proper Nastaliq for Pakistani readers |
| Arabic (Talbiyah, verses) | **Amiri** (400) | Classical Naskh, renders Quranic text correctly |

Fallback stacks: `Marcellus, "Iowan Old Style", Georgia, serif` · `"Hanken Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif`.

**Scale** (the classic scale from *The Elements of Typographic Style*, 18px base):

| Step | px | Line-height | Used for |
|---|---|---|---|
| display | 72 | 1.05 | home H1 desktop |
| h1 | 60 | 1.08 | page titles desktop / 48 on tablet / 36 mobile |
| h2 | 36 | 1.15 | section titles |
| h3 | 24 | 1.25 | package names, route stops |
| lead | 21 | 1.5 | intro paragraphs |
| body | 18 | 1.6 | body |
| small | 16 | 1.5 | UI, table cells |
| caption | 14 | 1.45 | captions, season labels |

Rules: Marcellus has one weight, so hierarchy comes from size and space, not bold. Sentence case everywhere. No all-caps labels, no single italic word in headlines. Line length under 68 characters for body. Urdu body 20px with line-height 2.0; Urdu headings never in Marcellus.

### 2.4 Layout

- 12-column grid, 1280px max, 24px gutters, 20px page margin on mobile.
- **Left-aligned** throughout. Centred text only for the single Talbiyah line.
- Generous vertical rhythm: sections separated by 120px desktop / 72px mobile, not by divider lines.
- One shape motif: the **pointed arch** of the Haram's arcades, used only for the hero video frame and the favicon. Nowhere else.

### 2.5 Principles

1. **Proof over adjectives.** A hotel distance, a licence link or a season-labelled video replaces every "premium", "luxury", "VIP".
2. **One bold moment.** The route is the only scroll-driven spectacle. Everything else moves only when someone acts.
3. **Real places, real people.** Sacred sites and people are photographed, never generated (§9).
4. **Built for parents.** 18px body minimum, big tap targets, WhatsApp always one tap away, nothing hidden behind hover on mobile.

---

## 3. Review against the brief (what changed and why)

| First instinct | Why it was generic | Revision |
|---|---|---|
| Black background, gold serif headings, Arabic geometric pattern overlays, full-screen Kaaba video hero | This is the default look of most Pakistani Hajj sites and of AI-generated "Islamic luxury" pages. It also needs AI or stock Kaaba footage as the hero | Light marble base, night-indigo ink, real Junaidi footage inside a single arch frame |
| Warm cream page with a terracotta accent | Matches the most common AI-generated palette | Cool marble `#ECEEEA` and brass taken from actual Haram materials |
| Navy + gold as the overall theme | Reads as a hotel brand | Night indigo is text colour and the Muzdalifah night section only; brass is a thin line, not fills |
| Fade-and-slide-up on every section, animated "10,000+ pilgrims" counters | Generic, and the numbers can't be verified | Motion only in the hero load and the route; no counters |
| 01 / 02 / 03 markers on feature blocks | Decorative numbering | Numbers used only where content is a true sequence: Hajj days and booking steps |
| Identical rounded cards with soft shadows for every package | SaaS card kit | Packages are data rows led by the facts people compare (distance, duration, price); surfaces separated by paper-on-marble, not shadows |

---

## 4. Tokens (CSS)

```css
:root {
  /* colour */
  --marble: #ECEEEA;
  --paper: #FFFFFF;
  --night: #16213B;
  --brass: #A5803F;
  --brass-deep: #7A5C26;
  --haze: #D3DEE5;
  --stone: #5E655F;
  --ok: #2E6B4E;
  --alert: #A23B2A;
  --line: rgba(22, 33, 59, .14);

  /* route section state (animated by GSAP) */
  --route-bg: var(--marble);
  --route-ink: var(--night);

  /* type */
  --font-display: "Marcellus", "Iowan Old Style", Georgia, serif;
  --font-text: "Hanken Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-urdu: "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", serif;
  --font-arabic: "Amiri", "Traditional Arabic", serif;

  --fs-display: clamp(2.5rem, 1.2rem + 4.2vw, 4.5rem);  /* 40 → 72 */
  --fs-h1: clamp(2.25rem, 1.4rem + 2.8vw, 3.75rem);     /* 36 → 60 */
  --fs-h2: clamp(1.75rem, 1.3rem + 1.4vw, 2.25rem);     /* 28 → 36 */
  --fs-h3: 1.5rem;
  --fs-lead: 1.3125rem;
  --fs-body: 1.125rem;
  --fs-small: 1rem;
  --fs-caption: .875rem;

  /* space (8pt) */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 24px;
  --s-6: 32px; --s-7: 48px; --s-8: 72px; --s-9: 120px;

  /* radius — hierarchy, not one value for everything */
  --r-control: 6px;     /* buttons, inputs */
  --r-panel: 14px;      /* drawers, lightbox */
  --r-none: 0;          /* media, tables */

  /* motion */
  --ease-out: cubic-bezier(.22, 1, .36, 1);
  --ease-inout: cubic-bezier(.65, 0, .35, 1);
  --d-micro: 120ms;
  --d-ui: 240ms;
  --d-panel: 400ms;
  --d-hero: 900ms;
}
```

Tailwind: map these in `theme.extend` (`colors.marble: "var(--marble)"`, etc.) so GSAP and Tailwind read the same values.

---

## 5. Wireframes

### 5.1 Home — desktop

```
+--------------------------------------------------------------------------------+
| Private Hajj 2027 booking closes 20 November on the Pak Hajj app.  See packages |  season strip (night bg)
+--------------------------------------------------------------------------------+
| [arch] Junaidi        Hajj 2027  Umrah  Flights  Visas  About  Contact  اردو [WA]|
+--------------------------------------------------------------------------------+
|                                                    .-----------.               |
|  Hajj and Umrah from Karachi,                     /             \              |
|  with a team that travels                        |   portrait    |             |
|  with you.                                       |   video loop  |             |
|                                                  |   (Hajj 2025) |             |
|  Hajj 2027 through Al Wakeel Munazzam,           |               |             |
|  recognised by the Ministry of Religious Affairs.|               |             |
|                                                  |               |             |
|  [See Hajj 2027 packages]  [Message us on WhatsApp]  Hajj 2025 group, Mina     |
+--------------------------------------------------------------------------------+
|  What we arrange                                                               |
|  Hajj 2027 ............................................ 3 packages, 21–38 days |
|  Umrah ................................................ from PKR ___ , monthly |
|  Air tickets ............................................ any airline, any city|
|  Visa help ................................................ 8 countries        |
|  (hover a row: photo preview follows cursor; on mobile rows are plain links)   |
+--------------------------------------------------------------------------------+
|  Checked credentials        Umrah operator (MoRA 2025–26)  [view document]     |
|                             Hajj 2027 via Al Wakeel Munazzam [view document]   |
|                             IATA 27-31139-5 · DTS 2357       [view document]   |
+--------------------------------------------------------------------------------+
|  THE ROUTE (pinned)                                                            |
|  +---------------------------------------+  +-------------------------------+  |
|  |  Makkah ●---.                          |  | 9 Dhul Hijjah                 |  |
|  |              `--● Mina                  |  | Arafat                        |  |
|  |                    \                   |  | What you do: ...              |  |
|  |       Muzdalifah ●--`--● Arafat        |  | What our team does: ...       |  |
|  |   (brass line draws on scroll)         |  | [Hajj 2025 footage still]     |  |
|  +---------------------------------------+  +-------------------------------+  |
+--------------------------------------------------------------------------------+
|  Hajj 2027 packages            [Short] [Long]                [Compare]         |
|  ------------------------------------------------------------------------------|
|  Package name      21 days   Makkah hotel 450 m   Mina: ___   PKR ___   [View] |
|  Package name      38 days   Makkah hotel 1.2 km  Mina: ___   PKR ___   [View] |
+--------------------------------------------------------------------------------+
|  Past groups   [Hajj 2025] [Hajj 2024] [Umrah]     horizontal video strip      |
+--------------------------------------------------------------------------------+
|  Reviews (Google, dated)        |  Office photo   Mona Square, Jahangir Road   |
|  "..." — Name, Hajj 2025        |  map · hours · 021-34130184 · WhatsApp       |
+--------------------------------------------------------------------------------+
```
(The dot leaders and middle dots in this sketch show layout only; in the build use real table columns, not text separators.)

### 5.2 Route section — mobile (and reduced motion)

```
+---------------------------+
| The route                 |
| [static map, full width]  |
|                           |
| 8 Dhul Hijjah · Mina      |  ← each stop is a block, map pin highlights
| You: ...  Our team: ...   |    as the block enters (IntersectionObserver,
| [still]                   |    no pinning)
|---------------------------|
| 9 Dhul Hijjah · Arafat    |
| ...                       |
+---------------------------+
```

### 5.3 Package detail — mobile

```
+---------------------------+
| Hajj 2027 · Short         |  season badge (text, not a pill)
| Package name              |
| 21 days · Karachi         |
| PKR ____                  |
| Price checked 12 Oct 2026 |
| [How to book this package]|
|---------------------------|
| Stay                      |
| Makkah — Hotel, 450 m     |
| Madinah — Hotel, 300 m    |
| Mina — camp category      |
|---------------------------|
| Included | Not included   |  stacked on mobile
|---------------------------|
| Day by day (timeline)     |
| How booking works 1-2-3-4 |
| FAQ (accordion)           |
+---------------------------+
| [WhatsApp]      [Call]    |  sticky bar
+---------------------------+
```

---

## 6. Components

| Component | Notes |
|---|---|
| **Season strip** | Night background, marble text, one sentence + link. Hidden after deadline. No countdown animation |
| **Header** | Marble background, 1px `--line` bottom border after scroll. Hides on scroll down, returns on scroll up (Motion). WhatsApp button always visible on mobile |
| **Arch hero frame** | SVG `clipPath` of a pointed arch; video `object-fit: cover`; caption under it with season and place |
| **Services index** | Rows of h3-size Marcellus text + right-aligned fact. Cursor-follow preview image on pointer devices only |
| **Credential row** | Label, number, issuer, season, "View document" opens Evidence drawer with source link and date checked |
| **Evidence drawer** | Right-side panel, `--r-panel`, paper background, focus-trapped, Esc closes |
| **Route** | See §7.3 |
| **Package row** | Facts first: duration, Makkah distance, Mina category, price, then action. Status text: "Sold out", "Archived" |
| **Compare table** | Paper surface, sticky first column, highlight column on hover/focus |
| **Inclusions list** | Two columns: "Included" with a small brass tick, "Not included" with a stone dash. Text, not icons alone |
| **Itinerary timeline** | Vertical line in `--line`, day labels in `--brass-deep` |
| **Video gallery** | Horizontal snap strip; thumbnails 4:5; lightbox via shared `layoutId`; captions always show season |
| **Review** | Quote in body text, name + season + "Google review, Month YYYY" |
| **Buttons** | Primary: night fill, marble text, 48px min height. Secondary: 1px night outline. Labels say exactly what happens: "See Hajj 2027 packages", "Message us on WhatsApp", "View document" |
| **Form** | Paper surface, 1px line inputs, 6px radius, labels above fields, errors in `--alert` with a fix instruction |
| **Language toggle** | "اردو" / "English" text link, switches `dir` |

Elevation: no drop shadows on content. Depth comes from paper-on-marble and hairlines. Only drawers and lightbox get a soft shadow `0 20px 60px rgba(22,33,59,.18)`.

---

## 7. Motion specification

### 7.1 Division of labour

| Library | Owns |
|---|---|
| **GSAP** (ScrollTrigger, DrawSVG, SplitText) | Home load sequence, the route section, route background state |
| **Motion** (Framer Motion, `motion/react`) | Header hide/show, services cursor preview, drawers, accordions, tier switch, compare highlights, gallery lightbox, form states, mobile menu |

### 7.2 Catalogue

| Moment | Lib | Trigger | Spec | Reduced motion |
|---|---|---|---|---|
| Home load | GSAP | first visit per session | H1 lines rise from a mask (`yPercent 100 → 0`, stagger .06, `expo.out`, 0.9s); arch frame reveals bottom-up (`clip-path inset(100% 0 0 0) → inset(0)`, 1.1s, `power3.inOut`, starts at 0.15s); actions fade in at 0.9s, 0.3s. Whole sequence ≤ 1.4s | Everything visible immediately |
| Hero video | — | after load sequence | starts playing only after the reveal; pauses when out of view | Poster image only |
| Route | GSAP | scroll (pinned, desktop ≥ 900px) | See §7.3 | Static map + stacked stops |
| Header hide/show | Motion | scroll direction | `y: -100%` / `0`, 240ms, `--ease-out` | Always visible |
| Services preview | Motion | pointer over row | Image follows cursor via `useSpring` (stiffness 300, damping 30); reveals with `clip-path` 240ms | No preview |
| Evidence drawer | Motion | click | slides from inline-end, 400ms; backdrop fades 240ms | Instant |
| Tier switch | Motion | click | shared `layoutId` pill, spring (420/36); content cross-fades 220ms | Instant |
| Accordion | Motion | click | `height: 0 → auto`, 240ms | Instant |
| Gallery lightbox | Motion | click thumbnail | shared-layout expand from thumbnail, 400ms | Instant |
| Form submit | Motion | submit | button label changes to "Message sent" with tick, 240ms | Instant |

Not used anywhere: section fade-ups, parallax on every image, counting numbers, marquee logos, magnetic buttons, custom cursors.

### 7.3 The route — detailed spec

**Stops (sequence to be checked by the client's scholar):**

1. Makkah — arrival and Umrah (for Tamattu' pilgrims)
2. 8 Dhul Hijjah — Mina
3. 9 Dhul Hijjah — Arafat
4. Night of the 9th — Muzdalifah
5. 10 Dhul Hijjah — Jamarat, sacrifice, Tawaf al-Ifadah in Makkah
6. 11–12 (13) Dhul Hijjah — Mina, Jamarat
7. Farewell Tawaf
8. Madinah (before or after, per package)

**Each stop panel:** date, place (Marcellus h3), "What you do" (2 lines, scholar-checked), "What our team does" (from the confirmed package: transport, camp, meals, group leader), one season-labelled photo or video still.

**Map:** simplified SVG made from OpenStreetMap outlines (credit OSM). Paths per segment `#seg-{id}`, pins `#pin-{id}`. Brass stroke 2px, round caps. Inactive pins: 8px stone circles. Active pin: 14px brass circle with a 1px brass ring.

**Scroll choreography (desktop):**

- Pin the section; scroll length ≈ 90% viewport per stop; `scrub: 0.6`; snap to stop labels.
- For each stop: draw its segment (`drawSVG 0% → 100%`), activate its pin, swap the text panel.
- Background state: marble (Makkah, Mina) → haze tint (Arafat, `color-mix(in oklab, var(--haze) 60%, var(--marble))`) → **night** at Muzdalifah (`--route-bg: var(--night)`, `--route-ink: var(--marble)`, brass line stays) → back to marble at Jamarat as "dawn".
- Small faint dots appear around the Muzdalifah pin during the night state (stars, 12–20 SVG circles, opacity .5). This is the one decorative flourish; nothing else on the site gets one.

**Mobile:** no pinning. Map sits at the top of the section, sticky for the length of the stop list; IntersectionObserver highlights the matching pin and draws that segment instantly.

---

## 8. Iconography and illustration

- Icons: one outline set at 1.5px stroke (e.g. Lucide), `currentColor`. Used for phone, WhatsApp, location, document, tick, dash. No decorative icons above headings.
- WhatsApp: official glyph is allowed in its own green on the button icon only; the button itself stays in brand colours.
- Illustration: only the route map. No geometric pattern wallpapers, no clipart crescents or domes.
- Logo: if the client has no vector logo, propose a wordmark "Junaidi" in Marcellus with a small pointed-arch mark; favicon is the arch mark in night on marble.

---

## 9. Imagery rules: real, licensed, or AI

| Category | What | Source | AI allowed? |
|---|---|---|---|
| A — must be Junaidi's own | Past groups, Junaidi camps/halls, team, office, testimonials, anything a package claims | Client footage and a commissioned shoot (§11) | **No** |
| B — must be real, can be licensed | Masjid al-Haram, the Kaaba, Masjid an-Nabawi, Jabal al-Rahmah, Jamarat, hotels, holiday destinations | Licensed stock (Getty, Adobe Stock, Shutterstock), hotel media kits with written permission | **No** |
| C — AI is fine | Materials and textures, sky and desert atmosphere, aircraft window, still-life objects without text, abstract loops behind text | Midjourney / Flux / Imagen for stills; Veo / Kling / Runway for video | **Yes** |

Why the hard line: AI models misdraw sacred architecture (wrong minarets, garbled Kiswah calligraphy), which devout visitors notice immediately and which damages trust. AI people shown as pilgrims or customers would also misrepresent who Junaidi has served. Never use AI for: the Kaaba or either Haram mosque, any human face, Arabic or Urdu calligraphy, maps with labels, documents with readable text, passports, logos.

### 9.1 Shared AI style block

Paste this after every AI prompt so assets look like one family:

```
Style: photographic, natural light, 35mm lens, soft contrast, cool neutral whites,
muted brass and deep indigo tones, quiet composition with generous negative space,
fine film grain, no text, no letters, no logos, no faces.
```

Negative prompt (for tools that support it):

```
text, letters, watermark, logo, signage, human face, crowd, mosque, minaret, dome,
Kaaba, calligraphy, gold glitter, lens flare, HDR, oversaturated, fantasy, illustration
```

---

## 10. Asset plan by section

Format: **ID — where — what — source — size/ratio — motion — prompt (if AI)**.

### 10.1 Home

**H-01 — Hero — portrait video loop inside the arch**
- Source (preferred): client's "Highlights of Hajj 2025" original file. Recut to 10–12 s: wide shots of Mina camp interiors, buses arriving at night, the group walking at dusk, staff serving meals. Only shots without identifiable faces, or with consent. Cool-neutral grade, no music.
- Ratio 4:5, 1080×1350 (desktop), 720×900 (mobile). MP4 H.264 + WebM VP9, ≤ 2.5 MB / ≤ 1.2 MB, no audio track, seamless loop.
- Motion: revealed by the load sequence; plays muted, `playsinline`, pauses off-screen.
- Fallback if footage isn't ready — AI video (Veo / Kling / Runway):
  ```
  Slow-motion close shot of plain unstitched white cotton cloth moving in a gentle
  desert wind at sunrise, soft low directional light, the fabric fills the frame,
  shallow depth of field, calm and still, vertical 4:5, 8 seconds, seamless loop,
  no people visible. [style block]
  ```
  Caption for the fallback: none (it's atmosphere, not a claim).

**H-02 — Hero poster** — first frame of H-01, AVIF + WebP. This is the LCP image.

**H-03 — Marble texture (credentials band, 6–8% opacity)** — AI still, 2048×2048, tileable
```
Top-down photograph of a polished white marble floor with faint soft grey veining,
cool early-morning light at a low angle, subtle reflections, very even tone,
seamless tileable texture. [style block]
```

**S-01 to S-05 — Services index cursor previews** — 4:5, 640×800, appear on hover (desktop only)

| ID | Service | Source | Prompt (if AI) |
|---|---|---|---|
| S-01 | Hajj | Client still from Mina camp footage (A) | — |
| S-02 | Umrah | Licensed photo: Masjid al-Haram courtyard at dusk (B) | — |
| S-03 | Air tickets | AI (C) | `View through an aircraft window at dawn over an empty Arabian desert, edge of the wing visible, pale blue to soft amber sky, light haze, vertical 4:5. [style block]` |
| S-04 | Visa help | AI (C) | `Overhead still life on a pale grey stone desk: a closed deep indigo document folder, a fountain pen, one small brass paperclip, soft window light from the left, minimal, nothing written visible, vertical 4:5. [style block]` |
| S-05 | Holidays | Licensed photo of a destination the client actually sells (B) | — |

**C-01 — Credentials** — no stock imagery. Thumbnail = first page of the actual official PDF, rendered as an image, with a caption naming the document and date.

**Office block (O-01)** — real photo of Mona Square entrance and the front desk (§11). 3:2.

### 10.2 The route

**R-01 — Base map** — SVG drawn by the designer from OpenStreetMap shapes (Makkah, Mina, Muzdalifah, Arafat, roads simplified). Not AI. Credit "Map data © OpenStreetMap contributors".

**R-02 — Terrain relief under the map (optional, 8% opacity)** — AI still, 2400×1600
```
Top-down monochrome relief of rugged desert valleys and granite hills, soft hillshade,
pale grey, no roads, no buildings, no labels, abstract and calm. [style block]
```
Decorative only; the SVG map carries the real geography.

**R-03 to R-09 — Stop media** — 3:2, 900×600, cross-fade between stops

| ID | Stop | Source | Prompt (if AI) |
|---|---|---|---|
| R-03 | Makkah arrival | Licensed: Haram exterior at dawn (B) | — |
| R-04 | Mina | Client: Junaidi Mina camp, Hajj 2025 (A) | — |
| R-05 | Arafat | Client: Junaidi Arafat hall, Hajj 2025 (A); else licensed Jabal al-Rahmah (B) | — |
| R-06 | Muzdalifah (night state) | AI (C) | `Macro photograph of small smooth pebbles resting on fine pale sand at night, cool moonlight from above, deep indigo shadows, shallow depth of field, no hands, no people, horizontal 3:2. [style block]` |
| R-07 | Jamarat | Licensed (B) | — |
| R-08 | Tawaf | Licensed long-exposure of the mataf (B) | — |
| R-09 | Madinah | Licensed: Masjid an-Nabawi courtyard umbrellas (B) | — |

**R-10 — Night ambience behind the Muzdalifah panel (optional)** — AI video, 16:9, 10 s loop, 25% opacity
```
Time-lapse of a clear desert night sky deepening from dusk blue to deep indigo,
first stars appearing, a low dark line of hills at the bottom, no lights,
no people, no buildings, slow and calm, seamless loop. [style block]
```

### 10.3 Hajj 2027 page and package detail

- **Page header:** no hero image. Title, deadline sentence, credential line. Facts are the visual.
- **P-01 — Hotel photos:** official hotel media only, with permission, captioned with hotel name. If unavailable, show the hotel name, distance and map pin in type. **Never AI, never generic "luxury room" stock** — it implies a room the pilgrim may not get.
- **P-02 — Mina / Arafat photos:** client's own season-labelled stills (A).
- **Training videos:** embed Junaidi's YouTube videos with captions and season labels.

### 10.4 Umrah hub

**U-01 — Header loop** — AI video, 16:9, 8 s, behind the page title at 35% opacity with a marble overlay
```
Soft sunlight and moving shadows from a carved lattice window sliding slowly
across a smooth white marble wall, calm, slow, no people, no text, seamless loop.
[style block]
```
**U-02 — Package photos** — hotel media kits (B) and client stills (A).

### 10.5 Flights

**F-01 — Header loop** — AI video, 16:9, 8 s
```
Slow push-in towards an aircraft wing above a calm sea of clouds at sunrise,
smooth steady motion, soft light, seamless loop. [style block]
```
Airline logos: only if the client has permission from the airline; otherwise list airline names in text.

### 10.6 Visas

**V-01 — Header still** — 16:9 variant of S-04. No flags, no embassy imagery, no passports.

### 10.7 Holidays (Phase 3)

Licensed photos of each confirmed destination (B). AI only for abstract section backgrounds:
```
Late-afternoon light falling across a calm stone terrace and still water,
no landmarks, no people, warm-cool balance, horizontal 16:9. [style block]
```

### 10.8 About

- **A-01 Team portraits** — real photos, all shot against the same plain light-grey paper backdrop, soft window light, shoulders-up, 4:5.
- **A-02 Office** — real (§11).

### 10.9 Social / OG images

Generated in code (`next/og`): marble background, page title in Marcellus, a short brass rule, "Junaidi Group" in Hanken Grotesk. 1200×630. No photos, so they never go out of date.

### 10.10 Export specs

| Type | Format | Sizes |
|---|---|---|
| Photos | AVIF + WebP fallback | 1x and 2x of display size, quality 60–70 |
| Textures | WebP | 2048 tileable |
| Loops | MP4 (H.264, CRF 26–28) + WebM (VP9), no audio | 1080p desktop, 720p mobile, 8–12 s |
| Posters | AVIF | First frame of each loop |
| Map | Inline SVG | Optimised with SVGO, IDs preserved for GSAP |

---

## 11. Shoot list for the next Umrah group (and Hajj 2027)

Get signed consent from anyone identifiable. Phone in 4K/30fps, both horizontal and vertical, stabilised, ambient audio only (no music).

1. Karachi office exterior, Mona Square, morning
2. Front desk with staff at work
3. Pre-departure briefing with the group leader
4. Airport check-in assistance (wide, faces with consent)
5. Bus interior on arrival in Makkah
6. Hotel lobby and a real room of the package hotel
7. **Walk from the hotel door to the Haram gate, filmed continuously with a timestamp** — this is the evidence for distance claims
8. Meal service
9. Staff helping an elderly pilgrim or wheelchair user (with consent)
10. Ziyarat bus and stops
11. Madinah hotel and walk to Masjid an-Nabawi (timestamped)
12. Short interviews: 30–60 s each, three questions — what you were worried about before, what the team did, would you recommend. Record the season and package
13. Return arrival in Karachi
14. Hajj 2027 only: Mina camp setup, Arafat hall, bus staging, night at Muzdalifah (respectfully, no close faces during worship)

Deliver originals (not WhatsApp-compressed copies) to the developer.

---

## 12. Design log

- Tried: black + gold Hajj template, cream + terracotta, numbered feature blocks, counters. Rejected (§3).
- Kept: the route as the single bold idea; arch used once; brass as a line, not a fill.
- Open questions for the client: logo files; scholar review of route text; whether Urdu or English should be the default language for the home page.
