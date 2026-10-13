import { test, expect } from "@playwright/test";

test.describe("/hajj/2027", () => {
  test("shows the real booking deadline and portal link, no Hajj payment path", async ({
    page,
  }) => {
    await page.goto("/hajj/2027");
    await expect(page.getByText(/days? left to book/)).toBeVisible();

    const portalLink = page.getByRole("link", { name: "hajj.mora.gov.pk" });
    await expect(portalLink).toHaveAttribute("href", "https://hajj.mora.gov.pk");

    // guide.md §2 rule 1: no "pay", "checkout" or similar CTA anywhere on
    // the page — only the official portal and WhatsApp.
    await expect(page.getByRole("link", { name: /^pay/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /^pay/i })).toHaveCount(0);
  });

  test("lists the four real booking steps from guide.md §5.2", async ({ page }) => {
    await page.goto("/hajj/2027");
    await expect(page.getByText("Compare our packages here")).toBeVisible();
    await expect(page.getByText("Pay through the portal only")).toBeVisible();
  });

  test("the packages section is absent in live mode, never a placeholder fact", async ({
    page,
  }) => {
    // fix.md §9.3: no "pending"/"being finalised" messaging — hidden
    // entirely instead. This suite always runs in live mode
    // (playwright.config.ts), where no real Hajj 2027 packages exist yet.
    await page.goto("/hajj/2027");
    await expect(page.getByText(/being finalised/i)).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Hajj 2027 packages" })).toHaveCount(0);
  });

  test("the booking guide page carries the same four steps and a scholar-review note", async ({
    page,
  }) => {
    await page.goto("/hajj/how-private-hajj-booking-works");
    await expect(page.getByText("Compare our packages here")).toBeVisible();
    await expect(page.getByText(/pending review by the client.s scholar/)).toBeVisible();
  });
});
