import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

// code.md §16: "Route section readable and complete; no hidden content."
test.describe("Reduced motion", () => {
  // fix.md §3.2/§9.1 removed the pinned route from home — it's rebuilt as
  // a non-pinned stepper on /hajj/2027 in fix.md §11 step 7. Re-enable this
  // test, pointed at that page, once that step lands.
  test.skip("the route section shows every stop, not pinned or cross-faded", async ({ page }) => {
    await page.goto("/");
    const route = page.locator("[data-route]");
    await route.scrollIntoViewIfNeeded();

    // The GSAP enhancer must never engage under reduced motion — no
    // data-enhanced attribute, no stop hidden via the pinned cross-fade
    // layout.
    await expect(route).not.toHaveAttribute("data-enhanced", "true");

    const stopPlaces = ["Makkah", "Mina", "Arafat", "Muzdalifah", "Madinah"];
    for (const place of stopPlaces) {
      await expect(page.getByRole("heading", { name: place, exact: true })).toBeVisible();
    }
  });

  test("the hero is fully visible immediately, no hidden-then-revealed state", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const opacity = await page
      .locator(".hero-actions")
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0.9);
  });

  test("the header stays visible after scrolling down", async ({ page }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 2000);
    await page.waitForTimeout(300);
    await expect(page.locator("header")).toBeInViewport();
  });
});
