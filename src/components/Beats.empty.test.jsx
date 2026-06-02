import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Override the data module to return zero beats so the empty state JSX path
// is exercised. This file is separate from Beats.test.jsx so the main suite
// can use the real catalog.
vi.mock("../data/beats", () => ({
  beats: [],
  BEATSTARS_ROOT: "https://www.beatstars.com/sfbeatss",
}));

import Beats from "./Beats";

describe("<Beats /> empty state", () => {
  it("renders the empty-state message when no beats match", () => {
    render(<Beats />);
    expect(
      screen.getByText(/no beats in this genre yet/i),
    ).toBeInTheDocument();
  });

  it("still renders the storefront CTA so users can browse BeatStars", () => {
    render(<Beats />);
    expect(
      screen.getByRole("link", { name: /check the full repertoire/i }),
    ).toBeInTheDocument();
  });
});
