import "server-only";
import type { z } from "zod";
import type { Package } from "@/content/schema";

// Two real Umrah packages sourced from the client's own public Facebook
// posts (facebook.com/Junaidigroup/photos, confirmed by the user as the
// place to find real package specifics). Both posts advertised a single
// 20 Aug departure that has since passed — the hotel pairing, nights
// breakdown and 4-tier pricing are real, but the exact departure date is
// not current, so `validUntil` is set to that already-passed date rather
// than a guessed future one (never invent a validity window the client
// hasn't confirmed). `priceCheckedOn` is the post's own date (13 Jul) so
// the "Price checked on" line on every card/header honestly shows this is
// several months stale rather than implying it's today's price — see
// DECISIONS.md #5z+7. `notIncluded` is left empty rather than assuming the
// usual "Qurbani, personal expenses" exclusions the sample data uses,
// since neither post actually said so.
//
// Hajj 2027 is still empty: the only real data found the same way (a C
// Category price from PKR 1,795,000, and an "11–25 days" range across two
// separate posts) is too thin to satisfy the required schema fields
// (specific durationDays, hotels, inclusions) without guessing within that
// range — guide.md §3's blocking Hajj 2027 specifics still haven't
// arrived. See CLIENT-TODO.md.
export const packages: z.input<typeof Package>[] = [
  {
    id: "umrah-economy-fundaq-bilal",
    type: "umrah",
    slug: "umrah-economy-fundaq-bilal",
    seasonSlug: "umrah-1448",
    seasonLabel: { en: "Umrah 1448" },
    title: { en: "Umrah Package · Economy" },
    status: "live",
    validUntil: "2026-08-20",
    priceFromPKR: 267000,
    priceCheckedOn: "2026-07-13",
    priceBasis: { en: "per person, sharing" },
    tierLabel: { en: "Economy" },
    durationDays: 20,
    departureCities: ["Karachi"],
    hotels: [
      {
        city: "Makkah",
        name: "Fundaq Bilal",
        orSimilar: true,
        distanceNote: { en: "shuttle service to Haram" },
        roomSharing: { en: "Sharing" },
        photos: [],
      },
      {
        city: "Madinah",
        name: "Shaza Munawara",
        orSimilar: true,
        distanceMeters: 900,
        roomSharing: { en: "Sharing" },
        photos: [],
      },
    ],
    flights: { included: true, airline: "Saudia" },
    included: [
      { en: "Return ticket" },
      { en: "Umrah visa" },
      { en: "Transport" },
      { en: "Ziyarat by bus" },
      { en: "Badar Ziarat" },
    ],
    notIncluded: [],
    itinerary: [],
    faqs: [],
    videos: [],
  },
  {
    id: "umrah-star-badar-al-masa",
    type: "umrah",
    slug: "umrah-star-badar-al-masa",
    seasonSlug: "umrah-1448",
    seasonLabel: { en: "Umrah 1448" },
    title: { en: "Umrah Package · Star" },
    status: "live",
    validUntil: "2026-08-20",
    priceFromPKR: 319000,
    priceCheckedOn: "2026-07-13",
    priceBasis: { en: "per person, sharing" },
    tierLabel: { en: "Star" },
    durationDays: 20,
    departureCities: ["Karachi"],
    hotels: [
      {
        city: "Makkah",
        name: "Badar Al Masa",
        orSimilar: true,
        distanceMeters: 700,
        roomSharing: { en: "Sharing" },
        photos: [],
      },
      {
        city: "Madinah",
        name: "Rua Al Masi Hotel",
        orSimilar: true,
        distanceMeters: 250,
        roomSharing: { en: "Sharing" },
        photos: [],
      },
    ],
    flights: { included: true, airline: "Saudia" },
    included: [
      { en: "Return ticket" },
      { en: "Umrah visa" },
      { en: "Transport" },
      { en: "Ziyarat by bus" },
      { en: "Badar Ziarat" },
    ],
    notIncluded: [],
    itinerary: [],
    faqs: [],
    videos: [],
  },
];
