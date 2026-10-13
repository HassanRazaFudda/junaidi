// Throwaway dev utility for visual review against design.md/fix.md, not
// part of the test suite. Takes 390px and 1440px full-page screenshots,
// waiting for the hero/motion load sequence to settle first.
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
  await page.screenshot({ path: `scripts/shots/${name}-${label}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log("done");
