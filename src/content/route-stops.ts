// design.md §7.3: the Manasik route's fixed sequence of stops. This is
// structural/ritual content tied to the design, not a CMS-swappable
// business entity like a Package or Season, so it doesn't go through the
// content repository — but every "what you do" line is still flagged for
// scholar review before publication (design.md §7.3, guide.md §6). "What
// our team does" is deliberately NOT written per-stop here: it has to come
// from a confirmed package (guide.md §5.1 row 5), and none exists yet
// (DECISIONS.md #5). Rendered as a compact stepper on /hajj/[season] —
// route/hajj-stepper.tsx (fix.md §11 step 7) — not the original pinned
// home-page layout these stops were first written for.
export type RouteStop = {
  id: string;
  dateLabel: string;
  place: string;
  youDo: string;
  assetDescription: string;
};

export const routeStops: RouteStop[] = [
  {
    id: "makkah-arrival",
    dateLabel: "On arrival",
    place: "Makkah",
    youDo:
      "Enter the state of Ihram before the Miqat, perform Umrah (Tamattu' pilgrims), then wait for the days of Hajj.",
    assetDescription: "Haram exterior at dawn",
  },
  {
    id: "mina",
    dateLabel: "8 Dhul Hijjah",
    place: "Mina",
    youDo:
      "Travel to Mina and stay through the day and night, performing the five daily prayers there.",
    assetDescription: "Junaidi Mina camp, Hajj 2025",
  },
  {
    id: "arafat",
    dateLabel: "9 Dhul Hijjah",
    place: "Arafat",
    youDo:
      "Spend the day at Arafat from noon until sunset in prayer and remembrance — the central rite of Hajj.",
    assetDescription: "Junaidi Arafat hall, Hajj 2025 (or licensed Jabal al-Rahmah)",
  },
  {
    id: "muzdalifah",
    dateLabel: "Night of the 9th",
    place: "Muzdalifah",
    youDo:
      "Travel to Muzdalifah after sunset, pray Maghrib and Isha together, and stay overnight under the open sky.",
    assetDescription: "Muzdalifah night ambience (AI atmosphere only — design.md §9 category C)",
  },
  {
    id: "jamarat",
    dateLabel: "10 Dhul Hijjah",
    place: "Jamarat, sacrifice, Tawaf al-Ifadah",
    youDo:
      "Stone Jamarat al-Aqabah, perform the sacrifice, shave or trim the hair, then travel to Makkah for Tawaf al-Ifadah.",
    assetDescription: "Jamarat (licensed)",
  },
  {
    id: "mina-jamarat",
    dateLabel: "11–12 (13) Dhul Hijjah",
    place: "Mina, Jamarat",
    youDo:
      "Return to Mina and stone all three Jamarat each afternoon, for two or three days depending on the package.",
    assetDescription: "Junaidi Mina camp, Hajj 2025",
  },
  {
    id: "farewell-tawaf",
    dateLabel: "Before departure",
    place: "Farewell Tawaf",
    youDo: "Perform a final Tawaf of the Kaaba before leaving Makkah.",
    assetDescription: "Long-exposure of the mataf (licensed)",
  },
  {
    id: "madinah",
    dateLabel: "Before or after Hajj",
    place: "Madinah",
    youDo:
      "Visit Masjid an-Nabawi and pray there, timed before or after Hajj depending on the package.",
    assetDescription: "Masjid an-Nabawi courtyard umbrellas (licensed)",
  },
];
