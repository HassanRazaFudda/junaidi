import type { z } from "zod";
import type { Package } from "@/content/schema";

/**
 * A structurally valid Package used ONLY by tests, to prove the package
 * detail template renders correctly against the real schema. Every fact
 * below is a clearly fictional placeholder (see the names/numbers) — this
 * file must never be imported from `src/app/` or any seed data file. See
 * DECISIONS.md #5.
 */
export const examplePackage: z.input<typeof Package> = {
  id: "test-fixture-package",
  type: "hajj",
  slug: "test-fixture-package",
  seasonSlug: "2027",
  seasonLabel: { en: "Hajj 2027 (test fixture)" },
  title: { en: "Example Hajj Package — Test Fixture Only" },
  status: "live",
  validUntil: "2027-12-31",
  priceFromPKR: 1200000,
  priceCheckedOn: "2026-10-12",
  durationDays: 21,
  departureCities: ["Karachi"],
  hotels: [
    {
      city: "Makkah",
      name: "Example Hotel (test fixture)",
      orSimilar: true,
      distanceMeters: 450,
      distanceNote: { en: "Walking distance, test fixture value" },
      roomSharing: { en: "Quad sharing" },
      photos: [],
    },
    {
      city: "Madinah",
      name: "Example Hotel Madinah (test fixture)",
      orSimilar: true,
      distanceMeters: 300,
      roomSharing: { en: "Quad sharing" },
      photos: [],
    },
  ],
  mina: { en: "Category A camp (test fixture)" },
  arafat: { en: "Shaded tents (test fixture)" },
  flights: { included: true, airline: "Example Air (test fixture)", baggage: "30kg" },
  included: [{ en: "Flights" }, { en: "Hotels" }, { en: "Ground transport" }],
  notIncluded: [{ en: "Qurbani" }, { en: "Personal expenses" }],
  itinerary: [
    { day: "Day 1", title: { en: "Departure" }, detail: { en: "Depart Karachi for Jeddah." } },
  ],
  operatorLine: { en: "Operated through Al Wakeel Munazzam (Pvt) Ltd (test fixture)" },
  officialBookingUrl: "https://hajj.mora.gov.pk",
  faqs: [{ q: { en: "Is this real?" }, a: { en: "No — test fixture only." } }],
  videos: [],
};
