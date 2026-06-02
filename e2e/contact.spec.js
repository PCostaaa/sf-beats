import { test, expect, STORAGE_KEY } from "./fixtures";

test.describe("Contact gate — signed out", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("public cards are clickable links", async ({ page }) => {
    const yt = page
      .locator("#contact a")
      .filter({ hasText: "YouTube" })
      .first();
    await expect(yt).toBeVisible();
    expect(await yt.getAttribute("href")).toBe(
      "https://www.youtube.com/@sfbeats236",
    );
  });

  test("gated cards show 'Sign in to reveal'", async ({ page }) => {
    await expect(
      page.locator("#contact").getByText(/sign in to reveal/i),
    ).toHaveCount(2);
  });

  test("Send a Message CTA is replaced by a locked notice", async ({
    page,
  }) => {
    await expect(
      page.getByText(/sign in above to send a message/i),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /send a message/i }),
    ).toHaveCount(0);
  });

  test("the sign-in panel copy is visible", async ({ page }) => {
    await expect(
      page.locator("#contact").getByText(
        /sign in with google to reveal/i,
      ),
    ).toBeVisible();
  });
});

test.describe("Contact gate — signed in (session injected)", () => {
  test.beforeEach(async ({ page, signIn }) => {
    await signIn();
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("status bar shows the signed-in identity", async ({ page }) => {
    await expect(page.getByText("E2E Tester")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /sign out/i }),
    ).toBeVisible();
  });

  test("gated cards reveal real values", async ({ page }) => {
    await expect(page.getByText("sfbeatsss@gmail.com")).toBeVisible();
    // exact match avoids matching "@sfbeats236" (YouTube handle)
    await expect(page.getByText("@sfbeats", { exact: true })).toBeVisible();
    await expect(
      page.locator("#contact").getByText(/sign in to reveal/i),
    ).toHaveCount(0);
  });

  test("Send a Message CTA is a real mailto link", async ({ page }) => {
    const cta = page.getByRole("link", { name: /send a message/i });
    expect(await cta.getAttribute("href")).toBe("mailto:sfbeatsss@gmail.com");
  });

  test("Sign out re-gates and clears storage", async ({ page }) => {
    await page.getByRole("button", { name: /sign out/i }).click();

    await expect(
      page.locator("#contact").getByText(/sign in to reveal/i).first(),
    ).toBeVisible();
    const stored = await page.evaluate(
      (key) => localStorage.getItem(key),
      STORAGE_KEY,
    );
    expect(stored).toBeNull();
  });
});

test.describe("Footer socials", () => {
  test("all five platform links resolve to the right URLs", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const expected = [
      ["YouTube", "https://www.youtube.com/@sfbeats236"],
      ["SoundCloud", "https://soundcloud.com/sf236"],
      ["BeatStars", "https://www.beatstars.com/sfbeatss"],
      ["Instagram", "https://www.instagram.com/sfbeatss/"],
      ["Email", "mailto:sfbeatsss@gmail.com"],
    ];
    for (const [label, href] of expected) {
      const link = page.locator("footer").getByLabel(label);
      expect(await link.getAttribute("href")).toBe(href);
    }
  });
});
