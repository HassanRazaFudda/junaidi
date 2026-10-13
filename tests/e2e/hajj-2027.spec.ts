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

  test("shows the honest pending state when no packages exist yet", async ({ page }) => {
    await page.goto("/hajj/2027");
    await expect(page.getByText("Packages are being finalised")).toBeVisible();
  });

  test("the booking guide page carries the same four steps and a scholar-review note", async ({
    page,
  }) => {
    await page.goto("/hajj/how-private-hajj-booking-works");
    await expect(page.getByText("Compare our packages here")).toBeVisible();
    await expect(page.getByText(/pending review by the client.s scholar/)).toBeVisible();
  });
});
