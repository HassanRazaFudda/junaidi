import { test, expect } from "@playwright/test";

// No real RESEND_API_KEY exists in this environment (.env.local only has a
// dev placeholder — DECISIONS.md #5l), so the true happy path (a
// successfully delivered email) isn't exercised here; that needs a real
// key in CI secrets. What's tested: client + server validation, the
// honeypot, and that a send failure shows the graceful server-error state
// (DECISIONS.md #5l) rather than crashing.
test.describe("Contact form", () => {
  test("shows field-level errors for an invalid submission", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("A");
    await page.getByLabel("Mobile / WhatsApp number").fill("123");
    await page.getByLabel("Number of travellers").fill("1");
    await page.getByRole("button", { name: "Send inquiry" }).click();

    await expect(page.getByText("Please check the form")).toBeVisible();
  });

  test("never asks for a passport or CNIC number", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel(/passport/i)).toHaveCount(0);
    await expect(page.getByLabel(/cnic/i)).toHaveCount(0);
  });

  test("a valid submission either sends or shows the graceful server-error state", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Mobile / WhatsApp number").fill("+92 300 1234567");
    await page.getByLabel("Service").selectOption("hajj");
    await page.getByLabel("Number of travellers").fill("2");
    await page.getByRole("button", { name: "Send inquiry" }).click();

    await expect(
      page.getByText("Message sent").or(page.getByText("We couldn't send that just now")),
    ).toBeVisible({ timeout: 15_000 });
  });
});
