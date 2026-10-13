import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// code.md §16: "Zero serious/critical violations on every route."
const routes = [
  "/",
  "/hajj/2027",
  "/hajj/how-private-hajj-booking-works",
  "/about/credentials",
  "/contact",
  "/privacy",
  "/terms",
  "/cancellation-policy",
  "/complaints",
];

for (const route of routes) {
  test(`${route} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(route);
    // Two independent entrance animations can transiently fail contrast
    // mid-transition: fix.md §8's hero load-in (home only, settles by
    // ~1.7s) and FloatingWhatsApp's 2000ms-delayed scale-in (every page,
    // settles ~2.3s after its own mount — which starts counting from
    // navigation, not from this wait). axe should assess the settled page,
    // not a mid-transition frame — same reasoning as scripts/screenshot.mjs
    // already waiting for motion to settle before capturing. 2800ms clears
    // both with margin for navigation overhead variance; a shorter wait
    // (1200ms) was flaky here because it could land right on
    // FloatingWhatsApp's 2000ms boundary depending on how long `goto`
    // itself took.
    await page.waitForTimeout(2800);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
