import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

// code.md §16: "Route section readable and complete; no hidden content."
test.describe("Reduced motion", () => {
  // fix.md §3.2/§9.1 removed the pinned route from home — fix.md §11 step 7
  // rebuilt it as a non-pinned stepper on /hajj/2027 (hajj-stepper.tsx).
  test("the Hajj stepper shows every stop, with no scroll-linked colour animation engaged", async ({
    page,
  }) => {
    await page.goto("/hajj/2027");
    const stepper = page.locator("[data-hajj-stepper]");
    await stepper.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // The GSAP enhancer must never engage under reduced motion — the fill
    // line stays at its SSR width (0), and no dot ever lights up.
    const fillWidth = await page
      .locator(".hajj-stepper-fill")
      .evaluate((el) => getComputedStyle(el).width);
    expect(fillWidth).toBe("0px");

    const stopPlaces = [
      "Mina",
      "Arafat",
      "Muzdalifah",
      "Jamarat, sacrifice, Tawaf al-Ifadah",
      "Farewell Tawaf",
    ];
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
