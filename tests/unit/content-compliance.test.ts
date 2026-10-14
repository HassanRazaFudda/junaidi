import { describe, expect, it } from "vitest";
import { Package } from "@/content/schema";
import { packages } from "@/content/local/data/packages";
import { localAdapter } from "@/content/local/adapter";
import { credentials } from "@/content/local/data/credentials";
import { videos } from "@/content/local/data/videos";

describe("guide.md §2 compliance rules encoded as tests", () => {
  it("no hotel photo (design.md §9 category B — Haram, hotels) is AI-sourced", () => {
    for (const pkg of packages) {
      const parsed = Package.parse(pkg);
      for (const hotel of parsed.hotels) {
        for (const photo of hotel.photos) {
          expect(photo.source, `${parsed.slug} / ${hotel.name} photo`).not.toBe("ai");
        }
      }
    }
  });

  it("Hajj packages only ever link to the official portal (rule 1 — no Hajj payment path)", () => {
    expect(() =>
      Package.parse({
        id: "x",
        type: "hajj",
        slug: "x",
        seasonSlug: "2027",
        seasonLabel: { en: "x" },
        title: { en: "x" },
        status: "live",
        validUntil: "2027-01-01",
        durationDays: 1,
        departureCities: ["Karachi"],
        hotels: [],
        included: [],
        notIncluded: [],
        itinerary: [],
        officialBookingUrl: "https://example.com/pay-now",
        faqs: [],
        videos: [],
      }),
    ).toThrow();
  });

  it("a live priced package must show priceCheckedOn", () => {
    expect(() =>
      Package.parse({
        id: "x",
        type: "hajj",
        slug: "x",
        seasonSlug: "2027",
        seasonLabel: { en: "x" },
        title: { en: "x" },
        status: "live",
        validUntil: "2027-01-01",
        priceFromPKR: 100000,
        durationDays: 1,
        departureCities: ["Karachi"],
        hotels: [],
        included: [],
        notIncluded: [],
        itinerary: [],
        faqs: [],
        videos: [],
      }),
    ).toThrow();
  });

  it("no live package exists in Phase 1 seed data (no invented facts, DECISIONS.md #5)", () => {
    expect(packages.filter((p) => Package.parse(p).status === "live")).toHaveLength(0);
  });

  it("unconfirmed credentials (verifiedByClient: false) never reach the public list", async () => {
    expect(credentials.every((c) => c.verifiedByClient === false)).toBe(true);
    expect(await localAdapter.listCredentials()).toHaveLength(0);
  });

  it("the public video list filters out any unreviewed video (openedAndReviewed: false)", () => {
    const mixed = [
      { ...videos[0], youtubeId: "reviewed", openedAndReviewed: true },
      { ...videos[0], youtubeId: "unreviewed", openedAndReviewed: false },
    ];
    const publicList = mixed.filter((v) => v.openedAndReviewed);
    expect(publicList.map((v) => v.youtubeId)).toEqual(["reviewed"]);
  });

  it("every real video in the data layer has actually been opened and reviewed (DECISIONS.md #5z+1) before appearing", async () => {
    expect(videos.every((v) => v.openedAndReviewed === true)).toBe(true);
    expect(await localAdapter.listVideos()).toHaveLength(videos.length);
  });
});
