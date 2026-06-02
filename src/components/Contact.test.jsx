import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";

const STORAGE_KEY = "sfbeats:user";

describe("<Contact /> signed-out state", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_GOOGLE_CLIENT_ID", "test-client-id");
  });

  it("renders the section heading", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: /work with sf beats/i }),
    ).toBeInTheDocument();
  });

  it("shows the Google sign-in button", () => {
    render(<Contact />);
    expect(screen.getByTestId("google-login")).toBeInTheDocument();
  });

  it("renders public cards as real anchors", () => {
    render(<Contact />);
    const yt = screen.getByRole("link", { name: /youtube/i });
    expect(yt).toHaveAttribute(
      "href",
      "https://www.youtube.com/@sfbeats236",
    );
    expect(
      screen.getByRole("link", { name: /soundcloud/i }),
    ).toHaveAttribute("href", "https://soundcloud.com/sf236");
    expect(
      screen.getByRole("link", { name: /beatstars/i }),
    ).toHaveAttribute("href", "https://www.beatstars.com/sfbeatss");
  });

  it("renders gated cards as non-links with 'Sign in to reveal'", () => {
    render(<Contact />);
    // Email & Instagram values should NOT appear; locked copy should.
    expect(screen.queryByText("sfbeatsss@gmail.com")).not.toBeInTheDocument();
    expect(screen.queryByText("@sfbeats")).not.toBeInTheDocument();
    expect(screen.getAllByText(/sign in to reveal/i).length).toBe(2);
  });

  it("disables the 'Send a Message' CTA in the signed-out state", () => {
    render(<Contact />);
    expect(
      screen.queryByRole("link", { name: /send a message/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/sign in above to send a message/i),
    ).toBeInTheDocument();
  });
});

describe("<Contact /> sign-in flow", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_GOOGLE_CLIENT_ID", "test-client-id");
  });

  it("reveals gated cards after Google sign-in", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByTestId("google-login"));

    await waitFor(() => {
      expect(screen.getByText("sfbeatsss@gmail.com")).toBeInTheDocument();
    });
    expect(screen.getByText("@sfbeats")).toBeInTheDocument();
    expect(screen.queryAllByText(/sign in to reveal/i)).toHaveLength(0);
  });

  it("enables the 'Send a Message' CTA after sign-in", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.click(screen.getByTestId("google-login"));

    const sendCta = await screen.findByRole("link", {
      name: /send a message/i,
    });
    expect(sendCta).toHaveAttribute("href", "mailto:sfbeatsss@gmail.com");
  });

  it("displays the signed-in user's name", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.click(screen.getByTestId("google-login"));

    expect(await screen.findByText(/signed in as/i)).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("persists the user in localStorage", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.click(screen.getByTestId("google-login"));

    await waitFor(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored);
      expect(parsed.email).toBe("test@example.com");
      expect(parsed.name).toBe("Test User");
    });
  });
});

describe("<Contact /> sign-out flow", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_GOOGLE_CLIENT_ID", "test-client-id");
  });

  it("re-gates the cards and clears storage on sign-out", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByTestId("google-login"));
    await screen.findByText("sfbeatsss@gmail.com");

    await user.click(screen.getByRole("button", { name: /sign out/i }));

    await waitFor(() => {
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
    expect(screen.queryByText("sfbeatsss@gmail.com")).not.toBeInTheDocument();
    expect(screen.getAllByText(/sign in to reveal/i).length).toBe(2);
  });
});

describe("<Contact /> session restore", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_GOOGLE_CLIENT_ID", "test-client-id");
  });

  it("restores a signed-in session from localStorage on mount", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name: "Stored User",
        email: "stored@example.com",
        picture: "https://example.com/x.png",
      }),
    );
    render(<Contact />);
    expect(await screen.findByText("Stored User")).toBeInTheDocument();
    expect(screen.getByText("sfbeatsss@gmail.com")).toBeInTheDocument();
  });

  it("recovers from corrupted localStorage gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "{not-json");
    expect(() => render(<Contact />)).not.toThrow();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});

describe("<Contact /> missing env var", () => {
  it("shows a warning when VITE_GOOGLE_CLIENT_ID is unset", () => {
    vi.stubEnv("VITE_GOOGLE_CLIENT_ID", "");
    render(<Contact />);
    expect(screen.getByText(/VITE_GOOGLE_CLIENT_ID/)).toBeInTheDocument();
    expect(screen.queryByTestId("google-login")).not.toBeInTheDocument();
  });
});
