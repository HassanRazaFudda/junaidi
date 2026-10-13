import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("renders the hero, services, and navigates to Hajj 2027", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Hajj and Umrah from Karachi",
    );

    await page.getByRole("link", { name: "See Hajj 2027 packages" }).click();
    await expect(page).toHaveURL(/\/hajj\/2027$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Hajj 2027");
  });

  test("header WhatsApp link has a correctly prefilled wa.me URL", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Message us on WhatsApp" }).first();
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(href!)).toContain("I'd like to ask about your services.");
  });

  test("in live mode, sections with nothing confirmed are simply absent — never a placeholder fact", async ({
    page,
  }) => {
    // fix.md §9.3: no "pending"/"being finalised" messaging on public
    // pages — the section hides entirely instead. In live mode (what this
    // suite always runs against — playwright.config.ts forces it) there
    // are no real packages or confirmed credentials yet, so neither
    // section renders at all.
    await page.goto("/");
    await expect(page.getByText(/being finalised/i)).toHaveCount(0);
    await expect(page.getByText(/verification in progress/i)).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Checked credentials" })).toHaveCount(0);
  });

  test("footer shows the real confirmed office address and landline", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText("Mona Square")).toBeVisible();
    await expect(footer.getByText("021-34130184-88")).toBeVisible();
  });
});
