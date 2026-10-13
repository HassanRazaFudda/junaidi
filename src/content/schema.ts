import "server-only";
import { z } from "zod";

export const LocalizedText = z.object({ en: z.string().min(1), ur: z.string().optional() });

export const ImageRef = z.object({
  src: z.string(), // local path now, CMS URL later
  alt: LocalizedText,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  source: z.enum(["client", "licensed", "ai", "official-doc"]), // design.md §9 enforcement
  credit: z.string().optional(),
  seasonLabel: z.string().optional(),
});

export const Hotel = z.object({
  city: z.string(),
  name: z.string(),
  orSimilar: z.boolean(),
  distanceMeters: z.number().int().positive().optional(),
  distanceNote: LocalizedText.optional(), // how it was measured
  roomSharing: LocalizedText,
  stars: z.number().int().min(1).max(5).optional(), // fix.md §4.1 package card
  photos: z.array(ImageRef).default([]),
});

export const Package = z
  .object({
    id: z.string(),
    type: z.enum(["hajj", "umrah", "holiday"]),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    seasonSlug: z.string(),
    seasonLabel: LocalizedText, // "Hajj 2027"
    title: LocalizedText,
    status: z.enum(["draft", "live", "soldOut", "archived"]),
    validUntil: z.iso.date(),
    priceFromPKR: z.number().int().positive().optional(),
    priceCheckedOn: z.iso.date().optional(),
    durationDays: z.number().int().positive(),
    departureCities: z.array(z.string()).min(1),
    hotels: z.array(Hotel),
    mina: LocalizedText.optional(),
    arafat: LocalizedText.optional(),
    flights: z
      .object({
        included: z.boolean(),
        airline: z.string().optional(),
        baggage: z.string().optional(),
      })
      .optional(),
    included: z.array(LocalizedText),
    notIncluded: z.array(LocalizedText),
    itinerary: z.array(z.object({ day: z.string(), title: LocalizedText, detail: LocalizedText })),
    operatorLine: LocalizedText.optional(),
    officialBookingUrl: z.url().optional(),
    faqs: z.array(z.object({ q: LocalizedText, a: LocalizedText })).default([]),
    videos: z
      .array(z.object({ youtubeId: z.string(), title: LocalizedText, seasonLabel: z.string() }))
      .default([]),
    // fix.md §4.1/§5: package-card fields. tierLabel is a free-form badge
    // ("Economy"/"Standard"/"Premium" for Umrah, "Short"/"Long"/"Premium"
    // for Hajj) rather than an enum, since the two product types use
    // different tier vocabularies. month is Umrah-specific, used for the
    // home page's month tabs (fix.md §7).
    tierLabel: LocalizedText.optional(),
    month: LocalizedText.optional(),
    priceBasis: LocalizedText.optional(), // e.g. "per person, quad sharing"
    photo: ImageRef.optional(), // card hero image, 16:10
    // fix.md §5.1: demo-only entries, gated by NEXT_PUBLIC_CONTENT_MODE —
    // never shown in live mode, never real facts (DECISIONS.md).
    sample: z.boolean().default(false),
  })
  .superRefine((p, ctx) => {
    // guide.md §2: a live package must show a price-checked date if it shows a price
    if (p.status === "live" && p.priceFromPKR && !p.priceCheckedOn) {
      ctx.addIssue({
        code: "custom",
        message: "priceCheckedOn required when priceFromPKR is set",
        path: ["priceCheckedOn"],
      });
    }
    // guide.md §2.1: Hajj packages never link to anything but the official portal
    if (
      p.type === "hajj" &&
      p.officialBookingUrl &&
      !/^https:\/\/(hajj\.mora\.gov\.pk|.*hajjinfo\.org)/.test(p.officialBookingUrl)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Hajj booking URL must be the official portal",
        path: ["officialBookingUrl"],
      });
    }
  });

export const Season = z.object({
  slug: z.string(),
  type: z.enum(["hajj", "umrah"]),
  name: LocalizedText,
  bookingDeadline: z.iso.datetime({ offset: true }),
  officialPortalUrl: z.url(),
  stripMessage: LocalizedText,
  credentialLine: LocalizedText,
  sourceDocUrl: z.url(),
  isCurrent: z.boolean(),
});

export const Credential = z.object({
  id: z.string(),
  label: LocalizedText,
  number: z.string().optional(),
  issuer: z.string(),
  validity: z.string(),
  sourceUrl: z.url(),
  checkedOn: z.iso.date(),
  verifiedByClient: z.boolean(), // false = never rendered
});

export const Review = z
  .object({
    id: z.string(),
    author: z.string(),
    season: z.string(),
    text: LocalizedText,
    source: z.enum(["google", "facebook", "direct"]),
    date: z.iso.date(),
    consent: z.boolean(),
    // fix.md §5.2: demo-only testimonials ("3, sample: true, generic first
    // names, no photos") — these aren't real people, so "consent" doesn't
    // apply the way it does to a real reviewer; superRefine below only
    // requires consent:true for non-sample (real) reviews.
    sample: z.boolean().default(false),
  })
  .superRefine((r, ctx) => {
    if (!r.sample && r.consent !== true) {
      ctx.addIssue({
        code: "custom",
        message: "A real (non-sample) review must have consent on file",
        path: ["consent"],
      });
    }
  });

export const Video = z.object({
  youtubeId: z.string(),
  title: LocalizedText,
  seasonLabel: z.string(),
  season: z.string(), // slug used to filter, e.g. "hajj-2025"
  category: z.enum(["hajj", "umrah", "brand"]),
  openedAndReviewed: z.boolean(), // guide.md §1.6: "open each one before using it"
});

export const SiteSettings = z.object({
  legalName: z.string(),
  brandName: z.string(),
  office: z.object({
    addressLines: z.array(z.string()).min(1),
    mapQuery: z.string().optional(),
  }),
  landline: z.string(),
  whatsappNumber: z.string().regex(/^92\d{10}$/),
  email: z.string().optional(), // TODO(client): confirm one canonical address, guide.md §1.5
  facebookUrl: z.url().optional(),
  instagramUrl: z.url().optional(),
});
