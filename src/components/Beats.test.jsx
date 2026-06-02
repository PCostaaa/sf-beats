import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Beats from "./Beats";
import { beats, BEATSTARS_ROOT } from "../data/beats";

describe("<Beats />", () => {
  it("renders all beats when 'All' filter is active", () => {
    render(<Beats />);
    // each beat title appears as a heading inside its card
    for (const beat of beats) {
      expect(
        screen.getByRole("heading", { name: beat.title }),
      ).toBeInTheDocument();
    }
  });

  it("renders every genre filter button", () => {
    render(<Beats />);
    const expectedGenres = ["All", "Boom Bap", "Lo-Fi", "Old School", "Chill", "Freestyle"];
    for (const g of expectedGenres) {
      expect(screen.getByRole("button", { name: g })).toBeInTheDocument();
    }
  });

  it("opens the modal when a beat card is clicked", async () => {
    const user = userEvent.setup();
    render(<Beats />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const firstBeat = beats[0];
    await user.click(
      screen.getByRole("button", {
        name: new RegExp(`play preview of ${firstBeat.title}`, "i"),
      }),
    );

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    // dialog title matches the clicked beat
    expect(
      within(dialog).getByRole("heading", { name: firstBeat.title }),
    ).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Beats />);

    const firstBeat = beats[0];
    await user.click(
      screen.getByRole("button", {
        name: new RegExp(`play preview of ${firstBeat.title}`, "i"),
      }),
    );
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: /close preview/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters beats by selected genre via array .includes()", async () => {
    const user = userEvent.setup();
    render(<Beats />);

    await user.click(screen.getByRole("button", { name: "Lo-Fi" }));

    const lofiBeats = beats.filter((b) => b.genre.includes("Lo-Fi"));
    const nonLofi = beats.filter((b) => !b.genre.includes("Lo-Fi"));

    for (const b of lofiBeats) {
      expect(
        screen.getByRole("heading", { name: b.title }),
      ).toBeInTheDocument();
    }
    for (const b of nonLofi) {
      expect(
        screen.queryByRole("heading", { name: b.title }),
      ).not.toBeInTheDocument();
    }
  });

  it("highlights the active genre button", async () => {
    const user = userEvent.setup();
    render(<Beats />);
    const allBtn = screen.getByRole("button", { name: "All" });
    const lofiBtn = screen.getByRole("button", { name: "Lo-Fi" });

    // "All" starts active → text-black; Lo-Fi inactive → text-gray-500
    expect(allBtn.className).toMatch(/text-black/);
    expect(lofiBtn.className).toMatch(/text-gray-500/);

    await user.click(lofiBtn);

    // After click, active flips.
    expect(lofiBtn.className).toMatch(/text-black/);
    expect(allBtn.className).toMatch(/text-gray-500/);
  });

  it("renders the storefront CTA linking to BeatStars", () => {
    render(<Beats />);
    const cta = screen.getByRole("link", {
      name: /check the full repertoire/i,
    });
    expect(cta).toHaveAttribute("href", BEATSTARS_ROOT);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the YouTube 'Full Channel' link in the header", () => {
    render(<Beats />);
    const channel = screen.getByRole("link", { name: /full channel/i });
    expect(channel).toHaveAttribute(
      "href",
      "https://www.youtube.com/@sfbeats236",
    );
  });

  it("renders one card per beat in the grid (live grid count)", () => {
    const { container } = render(<Beats />);
    const grid = container.querySelector(".grid.grid-cols-1");
    expect(grid).not.toBeNull();
    const cards = within(grid).getAllByRole("heading", { level: 3 });
    expect(cards.length).toBe(beats.length);
  });
});
