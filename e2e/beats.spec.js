import { test, expect } from "./fixtures";

test.describe("Beats section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("renders the beats grid as clickable buttons (no direct YT redirect)", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: /the beats/i }),
    ).toBeVisible();
    const cards = page.locator("#beats button[aria-label^='Play preview of']");
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("genre filter narrows the visible cards", async ({ page }) => {
    const grid = page.locator("#beats");
    const initial = await grid.getByRole("heading", { level: 3 }).count();

    await page.getByRole("button", { name: "Lo-Fi" }).click();
    const filtered = await grid.getByRole("heading", { level: 3 }).count();

    expect(filtered).toBeGreaterThan(0);
    expect(filtered).toBeLessThanOrEqual(initial);
  });

  test("clicking 'All' restores the full catalogue", async ({ page }) => {
    const grid = page.locator("#beats");
    const total = await grid.getByRole("heading", { level: 3 }).count();

    await page.getByRole("button", { name: "Lo-Fi" }).click();
    await page.getByRole("button", { name: "All" }).click();

    await expect(grid.getByRole("heading", { level: 3 })).toHaveCount(total);
  });

  test("'Check the full repertoire' CTA links to BeatStars", async ({
    page,
  }) => {
    const cta = page.getByRole("link", {
      name: /check the full repertoire/i,
    });
    await expect(cta).toBeVisible();
    expect(await cta.getAttribute("href")).toContain("beatstars.com/sfbeatss");
  });

  test("'Full Channel' header link goes to the YouTube channel", async ({
    page,
  }) => {
    const link = page.getByRole("link", { name: /full channel/i });
    expect(await link.getAttribute("href")).toBe(
      "https://www.youtube.com/@sfbeats236",
    );
  });
});

test.describe("Preview modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("clicking a card opens the dialog with a YouTube embed iframe", async ({
    page,
  }) => {
    const firstCard = page
      .locator("#beats button[aria-label^='Play preview of']")
      .first();
    const cardLabel = await firstCard.getAttribute("aria-label");
    const trackTitle = cardLabel.replace(/^Play preview of /, "");

    await firstCard.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: trackTitle }),
    ).toBeVisible();

    const iframe = dialog.locator("iframe");
    const src = await iframe.getAttribute("src");
    expect(src).toMatch(/youtube\.com\/embed\/.+\?autoplay=1/);
  });

  test("free-beat modal shows 'Watch on YouTube' CTA", async ({ page }) => {
    // Find a card whose badge says FREE, then click it.
    const freeCard = page
      .locator("#beats button")
      .filter({ has: page.locator("span", { hasText: /^FREE$/ }) })
      .first();
    if ((await freeCard.count()) === 0) test.skip();

    await freeCard.click();
    const dialog = page.getByRole("dialog");
    const cta = dialog.getByRole("link", { name: /watch on youtube/i });
    expect(await cta.getAttribute("href")).toContain("youtube.com/watch");
  });

  test("paid-beat modal shows 'Buy on BeatStars' CTA with the price", async ({
    page,
  }) => {
    const paidCard = page
      .locator("#beats button")
      .filter({ has: page.locator("span").filter({ hasText: /^\$\d+$/ }) })
      .first();
    if ((await paidCard.count()) === 0) test.skip();

    await paidCard.click();
    const dialog = page.getByRole("dialog");
    const cta = dialog.getByRole("link", { name: /buy on beatstars — \$\d+/i });
    expect(await cta.getAttribute("href")).toContain("beatstars.com");
  });

  test("Escape closes the modal", async ({ page }) => {
    await page
      .locator("#beats button[aria-label^='Play preview of']")
      .first()
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("clicking the X button closes the modal", async ({ page }) => {
    await page
      .locator("#beats button[aria-label^='Play preview of']")
      .first()
      .click();
    await page.getByRole("button", { name: /close preview/i }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("clicking the backdrop closes the modal", async ({ page }) => {
    await page
      .locator("#beats button[aria-label^='Play preview of']")
      .first()
      .click();
    const dialog = page.getByRole("dialog");
    // Click the dialog element itself at its top-left corner (the backdrop area).
    await dialog.click({ position: { x: 5, y: 5 } });
    await expect(dialog).toHaveCount(0);
  });
});
