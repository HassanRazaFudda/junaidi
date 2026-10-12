# Junaidi Group Website — Build Guide

Companion file: `design.md` (visual system, motion spec, image and video plan with AI prompts).
Research checked on **12 October 2026**. Anything marked *verify* must be confirmed by the client in writing before it goes live.

---

## 0. How to use this guide

1. Read section 1 and 2 before writing any copy. They decide what the site is allowed to say.
2. Send the client the checklist in section 3 on day one. Several pages are blocked until those answers arrive.
3. Build in the order of section 12. Phase 1 has a hard external deadline (20 November 2026).
4. `design.md` is the source of truth for anything visual or animated.

---

## 1. What is verified (and what isn't)

### 1.1 Company identity

| Item | Finding | Status / source |
|---|---|---|
| Legal name | Junaidi Air Travels & Tours (Pvt) Ltd | MoRA Umrah attested list 2021-22, MoRA Munazzam list 2026 |
| Brand name | Junaidi Group | Facebook URL `facebook.com/Junaidigroup`, email domain `junaidigroup.com` |
| Office | Suite 7–8, Mezzanine Floor, Mona Square, Jahangir Road, near Kanzul Iman Masjid, Gurumandir, Karachi | Consistent across MoRA + directories |
| Landline | 021-34130184-88 | MoRA list |
| Mobile | +92 332 2202656 (Facebook) / +92 323 4271012 (another social listing) | **Conflict — verify which is primary** |
| Licences | DTS licence 2357, IATA 27-31139-5, HGO enrolment 4299 | Ibadat.pk directory (old). **Verify with certificates** |
| Founded | 2005 | Company self-description only. **Verify before publishing "since 2005"** |
| Leadership | Not established | Do not publish names/titles until client confirms |

### 1.2 Hajj 2027 status — the most important finding

- MoRA's **Hajj 2026** Munazzam list shows **Junaidi Air Travels & Tours (Pvt) Ltd as shareholder company #13 of Al Wakeel Munazzam (Pvt) Ltd**.
  Source: `https://www.mora.gov.pk/SiteImage/Misc/files/090925-List-Munazim_2026.pdf`
- **Al Wakeel Munazzam (Pvt) Ltd (MoRA reg. 0417)** is one of the **25 companies holding a Provisional Recognition Letter for Hajj 2027**, with a 2,000-pilgrim provisional quota.
  Source: `https://www.mora.gov.pk/SiteImage/Misc/files/030826_PRLissuedHaj27.pdf`
- **Verify:** that Junaidi is still a shareholder of Al Wakeel for 2027, and that Junaidi's packages appear on the official Hajj Portal / Pak Hajj app.

If confirmed, the honest credential line is:
> "For Hajj 2027, Junaidi operates through Al Wakeel Munazzam (Pvt) Ltd, one of 25 companies recognised by the Ministry of Religious Affairs."

### 1.3 Hajj 2027 rules that shape the website

- Private Hajj 2027 bookings and payments happen **only** through the official Hajj Portal (`hajj.mora.gov.pk`) or the Pak Hajj app. Direct payment to operators is not accepted.
- 71,684 seats are allocated to the private scheme for 2027.
- **Private booking deadline: 20 November 2026** (Radio Pakistan, 12 Sep 2026).
- The 2027–2030 policy bans manual bookings and cash transactions; operators are licensed and evaluated under a performance framework.

### 1.4 Umrah

- Junaidi appears on MoRA's **2025–26 list of Umrah operators with attested contracts**. Season-specific — re-check each season.

### 1.5 Current digital presence (all need fixing)

| Problem | Detail | Fix |
|---|---|---|
| Dead website | `junaidigroup.com` shows a raw server "Index of /" listing (checked 12 Oct 2026). The Perplexity report saying it has content is outdated. | Disable directory listing now (`Options -Indexes` on Apache), put a holding page up until launch |
| Wrong website on Facebook | Facebook page links to `junaiditravels.com`, which is **an unrelated Junaidi company in Hyderabad, India** | Change the Facebook website field to the new domain immediately |
| Inconsistent contacts | Gmail on Facebook, junaidigroup.com email elsewhere, two different mobiles | Pick one email domain and one WhatsApp number for the whole brand |
| Small social presence | Facebook ~6.1K likes; Instagram ~1.2K followers | Website should feed Instagram/YouTube, not depend on them |

### 1.6 Junaidi videos (reported, not yet opened by us)

Perplexity found these on a channel named "Junaidi Air Travels". Open each one before using it.

| Video | Date | Use |
|---|---|---|
| `youtube.com/watch?v=kvf_3_NYtSY` — Special Hajj packages, Hajj 2024 (5:14) | Feb 2024 | Hajj hub, "How we look after our groups" |
| `youtube.com/watch?v=zM_GAKnPZZw` — VIP/Deluxe halls in Arafat, Hajj 2025 (2:24) | Jun 2025 | Past groups gallery, Arafat stop of the route |
| `youtube.com/watch?v=YhAEdfjsmgA` — VIP camps in Mina, Hajj 2025 (4:41) | Jun 2025 | Past groups gallery, Mina stop of the route |
| `youtube.com/watch?v=m6SOo712028` — Brand clip (0:54) | Jan 2024 | Optional About page |
| Facebook: "Junaidi Group Highlights of HAJJ 2025 \| H1446" | 2025 | Best candidate for the hero loop — ask client for the original file |

Always label footage with its season ("Hajj 2025 group"). Never imply a past camp/hotel is part of a 2027 package unless the package says so.

---

## 2. Compliance rules for every page

These are non-negotiable. Put them in the CMS editor help text too.

1. **No Hajj payment on the website.** No "Pay deposit", no bank details for Hajj, no card checkout. The Hajj CTA is "Choose this package on the Pak Hajj app" plus "Talk to our Hajj team".
2. **No authorisation claim without a source.** Every credential on the site links to the official document it comes from.
3. **No guarantees.** Never "guaranteed visa", "guaranteed seat", "100% approval". Visa pages carry: "Visa decisions are made by the embassy or authority concerned. We help you prepare and submit your application."
4. **No pilgrim personal data in public.** Competitors publish "Hujjaj lists" with passport numbers and dates of birth. Junaidi never does. Booking status goes through the official portal or a private message.
5. **No unverified numbers.** No "10,000+ happy pilgrims", "#1 in Karachi", "100% satisfaction" unless the client provides evidence.
6. **Season labels everywhere.** Every package, price, photo and video shows its season. Expired packages move to an archive automatically (`validUntil` field, section 7.3).
7. **Consent for faces.** Any identifiable pilgrim in photo/video needs written consent on file. Testimonials need the person's permission and the season they travelled.
8. **No fake people.** AI-generated faces are never used as customers, staff or testimonials (see `design.md` §9).

---

## 3. Client checklist (send on day one)

**Blocking Phase 1 (Hajj 2027 landing):**
- [ ] Written confirmation of Hajj 2027 arrangement with Al Wakeel Munazzam, and the exact wording they want
- [ ] List of Junaidi's Hajj 2027 packages as they appear on the official portal: name, duration, price, Makkah hotel, Madinah hotel, distance claims, Mina/Arafat category, flights, Qurbani, inclusions/exclusions
- [ ] One primary WhatsApp number and one email address
- [ ] Original files of Hajj 2024/2025 videos (not downloads from Facebook)
- [ ] Logo source files (AI/SVG) — or approval to redesign the wordmark
- [ ] Domain registrar + hosting access for `junaidigroup.com`; Facebook page admin access

**Blocking Phase 2:**
- [ ] IATA, DTS and Umrah attestation certificates (scans)
- [ ] Current Umrah packages with hotels, nights, prices, transport, visa included or not
- [ ] Which visa countries and categories they actually handle
- [ ] Do they sell holiday packages today? Which destinations, which suppliers?
- [ ] Google Business Profile access; permission to embed Google reviews
- [ ] Team members willing to appear on the site (name, role, photo)
- [ ] Consent forms from pilgrims shown in footage

---

## 4. Information architecture

### 4.1 Primary navigation

```
Hajj 2027 · Umrah · Flights · Visas · Holidays · About · Contact      [اردو]  [WhatsApp]
```
(Write the nav as separate links; the dots above are only for this document.)

### 4.2 Sitemap and URLs

```
/                                   Home
/hajj                               Hajj hub (current season)
/hajj/2027                          Hajj 2027 season page (packages list, deadline, how booking works)
/hajj/2027/[package-slug]           Package detail
/hajj/how-private-hajj-booking-works  Evergreen guide: portal, app, instalments
/hajj/preparation                   Manasik / training content, videos
/hajj/past-groups                   Season-labelled galleries (2024, 2025…)
/hajj/faq
/umrah                              Umrah hub
/umrah/[package-slug]               Package detail
/umrah/ramadan                      Seasonal (only when packages exist)
/umrah/family · /umrah/custom       Only if offered
/umrah/past-groups
/umrah/faq
/flights                            Inquiry-led ticketing
/flights/group-bookings
/visas                              Visa assistance overview
/visas/[country]                    Only verified countries
/holidays                           Only if products confirmed
/holidays/[destination]
/holidays/[destination]/[package]
/about                              Story, team, office, credentials
/about/credentials                  Every licence with its source document
/reviews
/resources                          Guides (blog)
/resources/[slug]
/contact
/privacy · /terms · /cancellation-policy · /complaints
/ur/...                             Urdu mirror of key pages (Phase 2)
```

### 4.3 Page priority

| Priority | Pages |
|---|---|
| P0 (Phase 1) | Home (lite), /hajj/2027, package detail, /hajj/how-private-hajj-booking-works, /contact, /about/credentials |
| P1 (Phase 2) | Umrah hub + packages, past groups, reviews, about, flights, FAQ pages, Urdu versions |
| P2 (Phase 3) | Visas, holidays, resources blog |

---

## 5. Page specifications

### 5.1 Home

| # | Section | Job | Notes |
|---|---|---|---|
| 1 | Season strip | Tell Hajj 2027 visitors the deadline | CMS-driven, auto-hides after deadline. Copy: "Private Hajj 2027 booking closes 20 November on the Pak Hajj app. See our packages." |
| 2 | Hero | Who Junaidi is in one sentence + main actions | Arch-framed video (see design.md). Actions: "See Hajj 2027 packages", "Message us on WhatsApp" |
| 3 | Services index | Route people to the right service | Large-type list, not cards. Hajj, Umrah, Flights, Visas, Holidays (hide unconfirmed) |
| 4 | Credentials | Prove legitimacy | Each item opens a drawer with the official document link |
| 5 | The route (signature) | Show what Hajj with Junaidi actually looks like, day by day | Pinned GSAP scroll section. Content from the confirmed package, not marketing |
| 6 | Packages preview | Hajj 2027 tiers + current Umrah | Max 3 per row; "Compare packages" opens comparison |
| 7 | Past groups | Real footage | Only season-labelled client footage |
| 8 | Reviews | Social proof | Real Google reviews with date; link to profile |
| 9 | Office | Physical trust | Photo of real office, map, hours, phones |
| 10 | Footer | Legal + contacts | Licence numbers with links, policies |

### 5.2 Hajj 2027 season page (`/hajj/2027`)

1. Header: season name, deadline countdown (days only — no ticking seconds), credential line.
2. "How private Hajj booking works in 2027" — 4 steps (real sequence, numbering is fine):
   1. Compare our packages here
   2. Open the Pak Hajj app or Hajj Portal and choose the Junaidi / Al Wakeel package
   3. Pay through the portal only
   4. We contact you for documents, training and departure
3. Packages list with filters: duration (short/long), price band, hotel distance.
4. Comparison table (sticky first column on mobile).
5. What every package includes (only items common to all).
6. Hajj training and preparation (videos).
7. Past groups (2024, 2025).
8. FAQ.
9. Contact block: Hajj desk WhatsApp, office hours.

### 5.3 Package detail template (Hajj and Umrah)

Everything above the first form:

```
[Season badge]  [Package name]
Duration · Departure city · Price (PKR) · "Price checked on DD MMM YYYY"
[Primary CTA: How to book this package]  [Secondary: WhatsApp us about this package]

Stay
  Makkah hotel — name, distance (and how measured), room sharing
  Madinah hotel — same
  Mina — camp category; Arafat — arrangement
Travel
  Flights (airline if confirmed, baggage), ground transport
Care
  Group leader, scholar, Saudi-side support, women's guidance (only if confirmed)
Included | Not included   (two columns, itemised)
Day-by-day itinerary       (timeline)
How booking works          (4 steps, links to portal)
Cancellation and refunds   (portal rules + Junaidi's own terms)
FAQ
Sticky mobile bar: [WhatsApp]  [Call]
```

WhatsApp prefill pattern:
```
https://wa.me/92XXXXXXXXXX?text=Assalam%20o%20Alaikum%2C%20I%27m%20asking%20about%20{packageName}%20({season})%20for%20{n}%20travellers.
```

### 5.4 Umrah hub

Tiers only if they genuinely differ (hotel, distance, transport, group size). Seasonal pages (Ramadan, school holidays) appear only when packages exist. Include visa-included/excluded clearly. Umrah *can* take deposits if the client wants — but that's a later decision with a payment gateway (section 7.5).

### 5.5 Flights

Inquiry-led. Be explicit: "Tell us your route and dates. We'll send fares by WhatsApp within [X] hours during office time." Form fields: from, to, dates, one-way/return, travellers, class, flexible dates yes/no. No fake search box that pretends to show live fares.

### 5.6 Visas

Overview + one page per verified country. Each country page: who it's for, documents checklist, processing steps, what Junaidi does vs. what the embassy does, fees (Junaidi service fee separate from embassy fee), disclaimer from §2.3. Never use embassy logos.

### 5.7 Holidays

Only after products are confirmed. Pattern borrowed from Holidays Maker (duration + "from" price) but each package must show departure dates, room basis, inclusions, exclusions and the date the price was checked.

### 5.8 About + Credentials

About: story (verified facts only), office, team (real photos), how a group is looked after. Credentials page: table of every licence/registration → number → issuing body → season/validity → link to source document → date checked.

### 5.9 Contact

Office map, landline, WhatsApp, email, hours, and a short form: name, mobile/WhatsApp, service, departure city, preferred month, travellers, message. Do not ask for passport or CNIC numbers.

---

## 6. Copy guidance

**Voice:** calm, specific, respectful. Plain verbs. Sentence case. The reader is often an older parent or someone booking for parents — clarity beats flourish.

**Do**
- "Makkah hotel: [Name], about 450 m from the Haram (walking distance measured by our team, 2025)"
- "Booking closes 20 November on the Pak Hajj app."
- "Message our Hajj desk" (button) → "Message sent" (confirmation)

**Don't**
- "Experience the ultimate luxury spiritual journey"
- "VVVIP" (no defined meaning; use the concrete features instead)
- Emoji in headings, "→" after button text, ALL-CAPS labels

**Sample hero copy (pick one with client):**
- "Hajj and Umrah from Karachi, with a team that travels with you."
- "Your Hajj, planned in Karachi and looked after in Makkah."

**Religious text:** Quranic verses and the Talbiyah in Arabic (Amiri font) with Urdu/English translation; get a scholar to check any religious content.

**Bilingual:** English first for Phase 1; Urdu versions of Home, Hajj 2027, package detail and Contact in Phase 2. Urdu is not machine-translated — have it written or reviewed by a native writer.

---

## 7. Tech stack and architecture

### 7.1 Recommended stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | SSG/ISR for SEO, server actions for forms |
| Styling | Tailwind CSS with CSS variables from `design.md` §3 | Tokens shared between Tailwind and GSAP |
| UI motion | **Motion** (formerly Framer Motion) — `npm i motion`, import from `motion/react` | Layout animations, presence, gestures |
| Scroll motion | **GSAP 3.13+** with ScrollTrigger, DrawSVG, SplitText + `@gsap/react` | All GSAP plugins are now in the free public package; confirm the current licence page before launch |
| Smooth scroll | Lenis (optional, desktop only) | Pairs with ScrollTrigger |
| CMS | Sanity or Payload | Client edits packages/seasons without a developer |
| Video | Mux or Cloudflare Stream (or self-hosted MP4/WebM + poster) | Adaptive streaming for the gallery; hero loop self-hosted |
| Images | `next/image`, AVIF/WebP | |
| Forms | Server action → email + Google Sheet/CRM + WhatsApp link | |
| Hosting | Vercel (or similar) | |
| Analytics | GA4 + Meta Pixel, behind a consent banner | |

### 7.2 Folder structure (suggested)

```
app/
  (site)/page.tsx
  hajj/[season]/page.tsx
  hajj/[season]/[slug]/page.tsx
  umrah/...
  ur/...                      Urdu routes (dir="rtl")
components/
  motion/                     Motion (Framer) components
  scroll/                     GSAP components (client-only)
  route/ManasikRoute.tsx      signature section
  package/                    PackageCard, CompareTable, InclusionsList
lib/
  gsap.ts                     plugin registration
  whatsapp.ts                 prefill builder
  season.ts                   deadline + expiry helpers
sanity/ or payload/           schemas
```

### 7.3 CMS schema — Package

```ts
type Package = {
  title: string;
  slug: string;
  type: "hajj" | "umrah" | "holiday";
  season: string;               // "Hajj 2027", "Ramadan 1448"
  validUntil: string;           // ISO date — after this the page shows "Archived"
  status: "draft" | "live" | "soldOut" | "archived";
  priceFromPKR?: number;
  priceCheckedOn: string;       // shown on page
  durationDays: number;
  departureCities: string[];
  hotels: { city: "Makkah" | "Madinah" | string; name: string; orSimilar: boolean;
            distanceMeters?: number; distanceNote?: string; roomSharing: string; photos: Image[] }[];
  mina?: string; arafat?: string;
  flights?: { airline?: string; baggage?: string; included: boolean };
  included: string[];
  notIncluded: string[];
  itinerary: { day: string; title: string; detail: string }[];
  officialBookingUrl?: string;  // portal link for Hajj
  operatorLine?: string;        // e.g. "Operated through Al Wakeel Munazzam (Pvt) Ltd"
  faqs: { q: string; a: string }[];
  videos: { url: string; seasonLabel: string }[];
};
```

Season document: `name`, `bookingDeadline`, `officialPortalUrl`, `stripMessage`, `credentialLine`, `sourceDocUrl`.

### 7.4 Forms and leads

- Server action validates, stores to sheet/CRM, emails the desk, returns a WhatsApp deep link so the user can continue there.
- Fields minimal (section 5.9). Rate-limit + honeypot.
- Response promise shown on the form ("We reply within 2 office hours") — only if the team can keep it.

### 7.5 Payments

Phase 1–2: none. Later, for Umrah/holidays only, a local gateway (e.g. bank-hosted checkout) with clear refund terms. Never for Hajj.

### 7.6 Internationalisation

- `next-intl` or built-in routing; `/ur` routes render `<html lang="ur" dir="rtl">`.
- Use CSS logical properties (`margin-inline-start`, `padding-inline`) everywhere so RTL works without overrides.
- GSAP: flip x-direction values when `dir === "rtl"`.

---

## 8. Animation implementation

Full spec in `design.md` §7. Rules:

- **GSAP** owns scroll-linked and timeline animation (hero load sequence, the route section, number tickers in the route).
- **Motion** owns user-triggered UI (menu, drawers, accordions, tier switch, comparison, gallery lightbox, cursor-follow preview on services list).
- Never animate the same element with both libraries.
- Everything respects `prefers-reduced-motion`: content is visible and readable with motion off.

### 8.1 GSAP setup

```ts
// lib/gsap.ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, useGSAP);
gsap.defaults({ ease: "power3.out", duration: 0.6 });
export { gsap, ScrollTrigger, useGSAP };
```

### 8.2 Lenis + ScrollTrigger (desktop only)

```ts
"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;
    const lenis = new Lenis({ lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return null;
}
```

### 8.3 Signature section skeleton — the Manasik route

```tsx
"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ManasikRoute({ stops }: { stops: Stop[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${stops.length * 90}%`,
          pin: true,
          scrub: 0.6,
          snap: { snapTo: "labels", duration: 0.4, ease: "power1.inOut" },
        },
      });

      stops.forEach((s, i) => {
        tl.addLabel(s.id)
          .fromTo(`#seg-${s.id}`, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: 1 })
          .to(`#pin-${s.id}`, { scale: 1, autoAlpha: 1, duration: 0.2 }, "<0.8")
          .to(`[data-panel="${s.id}"]`, { autoAlpha: 1, y: 0, duration: 0.3 }, "<")
          .to(`[data-panel]:not([data-panel="${s.id}"])`, { autoAlpha: 0, y: -12, duration: 0.2 }, "<");
        if (s.id === "muzdalifah") {
          tl.to(root.current, { "--route-bg": "var(--night)", "--route-ink": "var(--marble)", duration: 0.5 }, "<");
        }
        if (s.id === "jamarat") {
          tl.to(root.current, { "--route-bg": "var(--marble)", "--route-ink": "var(--night)", duration: 0.5 }, "<");
        }
      });
    });

    // Mobile + reduced motion: no pin; static map, stacked panels
    return () => mm.revert();
  }, { scope: root });

  return <section ref={root} className="route">{/* SVG map + panels */}</section>;
}
```

### 8.4 Motion (Framer) pattern — tier switch

```tsx
"use client";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

export function TierSwitch({ tiers, active, onChange }) {
  return (
    <LayoutGroup>
      <div role="tablist" className="tier-switch">
        {tiers.map(t => (
          <button key={t.id} role="tab" aria-selected={active === t.id}
                  onClick={() => onChange(t.id)} className="tier-tab">
            {active === t.id && (
              <motion.span layoutId="tier-pill" className="tier-pill"
                           transition={{ type: "spring", stiffness: 420, damping: 36 }} />
            )}
            <span className="tier-label">{t.name}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
          {/* tier details */}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
```

Wrap the app in `<MotionConfig reducedMotion="user">` so Motion respects the OS setting automatically.

---

## 9. SEO plan

### 9.1 Target pages and intents

| Page | Primary query intent |
|---|---|
| /hajj/2027 | "private hajj packages 2027 Karachi", "hajj 2027 package price Pakistan" |
| /hajj/how-private-hajj-booking-works | "how to book private hajj 2027 Pak Hajj app" |
| /umrah | "umrah packages from Karachi", "umrah package 2026 price" |
| /umrah/ramadan | "Ramadan umrah package Karachi" (seasonal) |
| /flights | "air ticket agent Gurumandir Karachi", "Jeddah ticket Karachi" |
| /visas/[country] | "[country] visit visa from Pakistan documents" |

Validate volumes with a keyword tool before writing; these are starting hypotheses, not measured data.

### 9.2 Rules

- One page per real intent; no thin city/country pages.
- Every season page shows "Last updated" and archives when the season ends (keep the URL, change status, link to the new season).
- Structured data: `TravelAgency` (verified NAP), `Product`/`Offer` only with real prices and `validThrough`, `FAQPage` where FAQs are visible, `VideoObject` for gallery videos, `BreadcrumbList`.
- Google Business Profile: same name, address, phone as the site footer.
- Internal links: every package links to the booking guide; every guide links to the current season page.

---

## 10. Performance and accessibility budgets

| Metric | Target (mobile, 4G) |
|---|---|
| LCP | < 2.5 s (hero poster image is the LCP element, not the video) |
| CLS | < 0.05 |
| INP | < 200 ms |
| JS on home | < 180 KB gzip (GSAP + Motion load per-section, `dynamic()` import) |
| Hero video | ≤ 2.5 MB desktop, ≤ 1.2 MB mobile, or poster only on Save-Data |

- Do not autoplay video when `navigator.connection.saveData` is true or reduced motion is on.
- Colour contrast AA minimum; brass accent is decorative only, never used for body text (see design.md).
- Visible focus rings, skip link, keyboard-operable drawers and tabs, captions on all videos with speech.
- Urdu: Noto Nastaliq Urdu needs ~2.0 line-height; test long Urdu headings for overflow.

---

## 11. Analytics events

`whatsapp_click {service, package}` · `call_click` · `form_submit {service}` · `portal_link_click {package}` · `compare_open` · `video_play {season}` · `lang_switch`

Weekly report to client: leads by service and source. A lead is not a booking — only the client marks bookings.

---

## 12. Roadmap

Today is 12 Oct 2026. Private Hajj 2027 booking closes 20 Nov 2026 — about 5½ weeks.

**Phase 0 — this week (1–2 days)**
- Fix directory listing on junaidigroup.com, holding page with phone/WhatsApp
- Fix Facebook website link
- Send client checklist

**Phase 1 — Hajj 2027 launch (target: within 2 weeks)**
- Home (lite: hero, services, credentials, packages, office, footer)
- /hajj/2027, package detail template, booking guide, credentials page, contact
- Route section can ship in a simpler static form first; animated version in Phase 2
- GA4 + WhatsApp tracking

**Phase 2 — full pilgrimage site (weeks 3–6)**
- Animated route section, Umrah hub + packages, past groups galleries, reviews, about, flights, FAQs
- Urdu versions of key pages
- Shoot real footage on the next Umrah group (shot list in design.md §11)

**Phase 3 — travel services (after client confirms)**
- Visas (verified countries), holidays, resources blog, optional Umrah payments

---

## 13. Launch checklist

- [ ] Every credential links to an official source; client approved wording in writing
- [ ] No Hajj payment path anywhere on the site
- [ ] Every package has season, price-checked date, inclusions, exclusions
- [ ] Every photo/video of people has consent on file; no AI faces
- [ ] Phone/WhatsApp/address identical in footer, contact page, Google profile, Facebook
- [ ] Reduced-motion and keyboard pass on every page
- [ ] Lighthouse mobile ≥ 90 performance on Home and /hajj/2027
- [ ] Urdu pages reviewed by a native writer
- [ ] Privacy policy covers form data and WhatsApp
- [ ] Old domain directory listing disabled; redirects in place

---

## Sources

- MoRA Hajj 2026 Munazzam shareholder list: https://www.mora.gov.pk/SiteImage/Misc/files/090925-List-Munazim_2026.pdf
- MoRA Hajj 2027 Provisional Recognition Letters: https://www.mora.gov.pk/SiteImage/Misc/files/030826_PRLissuedHaj27.pdf
- MoRA Private Hajj Scheme notices: https://www.mora.gov.pk/Detail/NmQzZjFmZWItMjI0Yy00ZjlmLWJhMTQtZTM4NDBlODZiMzZh
- MoRA Umrah attested companies 2021-22: https://www.mora.gov.pk/SiteImage/Misc/files/20220209_Umrah_Attested_Companies.pdf
- Private Hajj Policy 2027-30 (cabinet approval): https://www.thenews.pk/print/1421576-private-haj-policy-2027-30-approved
- Hajj 2027 packages, 25 organisers, portal-only payment: https://www.brecorder.com/news/40434275/hajj-2027-packages-set-at-rs12mn-and-rs13mn
- Booking deadline 20 Nov 2026: https://www.radio.gov.pk/12-09-2026/bookings-for-private-hajj-scheme-2027-continue-through-pak-hajj-app
- Junaidi Facebook page: https://www.facebook.com/Junaidigroup/
- Ibadat.pk directory profile: https://ibadat.pk/verified-hajj-group-organizers/junaidi-air-travel-tours-pvt-ltd/
- Reference sites: https://holidaysmaker.pk/pages/international-tour-packages · https://shaneharamtravels.com/hajj/ · https://al-khair.org/
