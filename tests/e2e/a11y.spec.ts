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
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
