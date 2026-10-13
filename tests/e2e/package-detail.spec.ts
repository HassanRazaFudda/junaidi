import { test, expect } from "@playwright/test";

// No live Hajj package exists in Phase 1 (DECISIONS.md #5) — there is no
// real URL to navigate to yet, so the template's full rendered output
// (stay/travel/inclusions/itinerary/booking-steps) isn't exercised here.
// That coverage activates automatically via home.spec.ts's navigation flow
// and a dedicated package-detail test the moment real package data lands,
// since the template is already wired to the same content layer every
// other page uses. What this file verifies today: the site never serves a
// fake or placeholder package as if it were real content.
test.describe("Package detail", () => {
  test("the build-time placeholder slug 404s, never renders as a real page", async ({ page }) => {
    const response = await page.goto("/hajj/2027/__placeholder__");
    expect(response?.status()).toBe(404);
  });

  test("an unknown package slug 404s honestly", async ({ page }) => {
    const response = await page.goto("/hajj/2027/some-package-that-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
