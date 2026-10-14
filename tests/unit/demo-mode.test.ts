import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// fix.md §5.1: demo mode is read once at module load (src/content/local/
// adapter.ts), so each case resets modules and re-imports with the env var
// set before the import — flipping process.env after import wouldn't do
// anything, since the filtering already happened.
describe("demo content mode", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("live mode (the default) never returns sample packages, reviews, or unconfirmed credentials", async () => {
    process.env.NEXT_PUBLIC_CONTENT_MODE = "live";
    const { localAdapter } = await import("@/content/local/adapter");

    const hajj = await localAdapter.listPackages({ type: "hajj" });
    const umrah = await localAdapter.listPackages({ type: "umrah" });
    expect(hajj.every((p) => !p.id.startsWith("sample-"))).toBe(true);
    expect(umrah).toHaveLength(0); // no real Umrah packages exist either

    const reviews = await localAdapter.listReviews();
    expect(reviews.every((r) => !r.id.startsWith("sample-"))).toBe(true);

    const credentials = await localAdapter.listCredentials();
    expect(credentials.every((c) => c.verifiedByClient)).toBe(true);
  });

  it("demo mode returns the sample packages, reviews, and credentials, every one clearly flagged", async () => {
    process.env.NEXT_PUBLIC_CONTENT_MODE = "demo";
    const { localAdapter } = await import("@/content/local/adapter");

    const hajj = await localAdapter.listPackages({ type: "hajj" });
    const umrah = await localAdapter.listPackages({ type: "umrah" });
    expect(hajj.length).toBeGreaterThan(0);
    expect(umrah.length).toBeGreaterThan(0);
    expect(hajj.every((p) => p.sample)).toBe(true);
    expect(umrah.every((p) => p.sample)).toBe(true);

    const reviews = await localAdapter.listReviews(10);
    expect(reviews.length).toBeGreaterThan(0);
    expect(reviews.every((r) => r.sample)).toBe(true);

    // Real, sourced credentials, shown even though verifiedByClient is
    // still false — but every one of them is, since the client hasn't
    // confirmed any yet (DECISIONS.md #3).
    const credentials = await localAdapter.listCredentials();
    expect(credentials.length).toBeGreaterThan(0);
    expect(credentials.every((c) => !c.verifiedByClient)).toBe(true);
  });

  it("demo mode never fabricates a video — it shows the same real, human-reviewed ones as live mode", async () => {
    process.env.NEXT_PUBLIC_CONTENT_MODE = "demo";
    const { localAdapter } = await import("@/content/local/adapter");
    const { videos } = await import("@/content/local/data/videos");
    // Videos aren't gated by content mode at all, only by
    // openedAndReviewed (DECISIONS.md #5z+1) — demo mode doesn't add or
    // remove any relative to what's actually in the data layer.
    const listed = await localAdapter.listVideos();
    expect(listed).toHaveLength(videos.length);
    expect(listed.every((v) => v.openedAndReviewed === true)).toBe(true);
  });
});
