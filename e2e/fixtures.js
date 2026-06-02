import { test as base, expect } from "@playwright/test";

const STORAGE_KEY = "sfbeats:user";

// Shared fixture: blocks the Google Identity Services script so it can't
// stall page load behind a firewall, and exposes a `signIn` helper that
// seeds the storage *before* React mounts (so the useEffect in Contact
// reads the value on first render).
export const test = base.extend({
  page: async ({ page }, use) => {
    // Block all third-party requests so tests don't hang behind the firewall.
    // The app's behavior we care about lives on localhost; we don't need real
    // Google Fonts, the GSI script, or YouTube thumbnails to load.
    await page.route("**/*", (route) => {
      const url = route.request().url();
      const isLocal =
        url.startsWith("http://localhost:") ||
        url.startsWith("http://127.0.0.1:");
      if (isLocal) return route.continue();
      return route.abort();
    });
    await use(page);
  },
  signIn: async ({ page }, use) => {
    const seed = async (user) => {
      await page.addInitScript(
        ([key, payload]) => {
          window.localStorage.setItem(key, payload);
        },
        [
          STORAGE_KEY,
          JSON.stringify(
            user ?? {
              name: "E2E Tester",
              email: "e2e@example.com",
              picture: "",
            },
          ),
        ],
      );
    };
    await use(seed);
  },
});

export { expect, STORAGE_KEY };
