import { defineConfig, devices } from "@playwright/test";

// code.md §16: E2E + axe accessibility, run against a production build
// (closer to what ships than dev mode) on a dedicated port so it never
// collides with a dev server someone has running locally.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3210",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Force "live" regardless of .env.local's own setting (DECISIONS.md:
    // local dev defaults NEXT_PUBLIC_CONTENT_MODE to "demo" for visual
    // review) — e2e/CI must validate real production behaviour, the
    // honest-pending-state assertions in tests/e2e/home.spec.ts and
    // hajj-2027.spec.ts included, not the review-only demo content.
    // Playwright merges `env` into the spawned process cross-platform, so
    // this needs no shell-specific syntax (no cross-env dependency).
    command: "pnpm build && pnpm exec next start -p 3210",
    env: { NEXT_PUBLIC_CONTENT_MODE: "live" },
    url: "http://localhost:3210",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
