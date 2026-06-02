import { test, expect } from "./fixtures";

test.describe("Landing page", () => {
  test("loads with the hero headline visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: /beats that hit different/i }),
    ).toBeVisible();
  });

  test("renders the SF BEATS wordmark in the nav and footer", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const marks = page.getByText(/^SF BEATS$/);
    await expect(marks).toHaveCount(2);
  });

  test("clicking a nav link scrolls the matching section into view", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // On mobile widths the desktop nav is hidden; open the hamburger first.
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      await page.getByRole("button", { name: /toggle menu/i }).click();
    }

    await page
      .locator("nav a:visible")
      .filter({ hasText: /^beats$/ })
      .first()
      .click();

    // Smooth scroll is duration: 500ms; wait long enough for it to settle.
    await page.waitForTimeout(1200);
    const box = await page.locator("#beats").boundingBox();
    expect(box.y).toBeLessThan(300);
  });

  test("renders the disc visual with the brand logo on desktop", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(
      page.locator('img[src="/LOGO_SF.jpg"]').first(),
    ).toBeAttached();
  });

  test("favicon is set to the brand logo", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const href = await page
      .locator('link[rel="icon"]')
      .getAttribute("href");
    expect(href).toBe("/LOGO_SF.jpg");
  });
});

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 375, height: 700 } });

  test("opens and closes from the hamburger", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const toggle = page.getByRole("button", { name: /toggle menu/i });
    // `:visible` filters out the desktop nav (display:none at mobile width)
    // and the unmounted mobile menu, so this counts only what the user sees.
    const visibleNavLinks = page.locator("nav a:visible");

    await expect(visibleNavLinks).toHaveCount(0);

    await toggle.click();
    await expect(
      visibleNavLinks.filter({ hasText: /^contact$/ }),
    ).toHaveCount(1);

    await toggle.click();
    await expect(visibleNavLinks).toHaveCount(0);
  });
});
