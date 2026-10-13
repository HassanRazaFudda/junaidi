// Throwaway dev utility for visual review against design.md/fix.md, not
// part of the test suite. Takes 390px and 1440px full-page screenshots,
// waiting for the hero/motion load sequence to settle first.
//
// Scrolls down incrementally before capturing: fix.md §8 added
// `whileInView`-gated section reveals (Reveal/StaggerGrid), and a plain
// `page.screenshot({ fullPage: true })` without ever having scrolled the
// page doesn't reliably fire the IntersectionObservers those rely on —
// sections below the first viewport can capture stuck in their initial
// hidden state even though a real user scrolling normally sees them
// animate in correctly. Found this the hard way: a full-page capture
// showed several sections as empty/blank, which a manual incremental-
// scroll capture then showed rendering correctly (DECISIONS.md).
import { chromium } from "@playwright/test";

const path = process.argv[2] ?? "/";
const name = process.argv[3] ?? "page";
const base = "http://localhost:3000";

const browser = await chromium.launch();
for (const [label, viewport] of [
  ["390", { width: 390, height: 844 }],
  ["1440", { width: 1440, height: 1024 }],
]) {
  const page = await browser.newPage({ viewport });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 350) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  await page.screenshot({ path: `scripts/shots/${name}-${label}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log("done");
