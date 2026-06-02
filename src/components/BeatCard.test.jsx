import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BeatCard from "./BeatCard";

const freeBeat = {
  id: 99,
  title: "Free Vibes",
  genre: ["Hip-Hop", "Lo-Fi"],
  bpm: 92,
  youtubeId: "abc123XYZ",
  price: 0,
};

const paidBeat = {
  id: 100,
  title: "Premium Drip",
  genre: ["Trap"],
  bpm: 140,
  youtubeId: "def456UVW",
  price: 25,
};

describe("<BeatCard /> free beats", () => {
  it("shows FREE badge with green styling", () => {
    render(<BeatCard beat={freeBeat} />);
    const badge = screen.getByText("FREE");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/emerald/);
  });

  it("renders the 'Preview & watch' footer label", () => {
    render(<BeatCard beat={freeBeat} />);
    expect(screen.getByText(/preview & watch/i)).toBeInTheDocument();
  });
});

describe("<BeatCard /> paid beats", () => {
  it("shows formatted price badge ($N) with gold styling", () => {
    render(<BeatCard beat={paidBeat} />);
    const badge = screen.getByText("$25");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/c9a84c/);
  });

  it("renders the 'Preview & buy' footer label", () => {
    render(<BeatCard beat={paidBeat} />);
    expect(screen.getByText(/preview & buy/i)).toBeInTheDocument();
  });
});

describe("<BeatCard /> interaction", () => {
  it("renders as a button, not an anchor (no redirect)", () => {
    render(<BeatCard beat={freeBeat} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onPlay with the beat when clicked", async () => {
    const user = userEvent.setup();
    const onPlay = vi.fn();
    render(<BeatCard beat={freeBeat} onPlay={onPlay} />);

    await user.click(screen.getByRole("button"));
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledWith(freeBeat);
  });

  it("does not crash if onPlay is not supplied", async () => {
    const user = userEvent.setup();
    render(<BeatCard beat={freeBeat} />);
    await user.click(screen.getByRole("button"));
    // no assertion — just that it didn't throw
  });

  it("has an accessible label naming the track", () => {
    render(<BeatCard beat={freeBeat} />);
    expect(
      screen.getByRole("button", { name: /play preview of free vibes/i }),
    ).toBeInTheDocument();
  });
});

describe("<BeatCard /> shared rendering", () => {
  it("renders title, BPM, and joined genre list", () => {
    render(<BeatCard beat={freeBeat} />);
    expect(screen.getByText("Free Vibes")).toBeInTheDocument();
    expect(screen.getByText(/92 BPM/)).toBeInTheDocument();
    expect(screen.getByText("Hip-Hop · Lo-Fi")).toBeInTheDocument();
  });

  it("renders the YouTube thumbnail URL with the video ID", () => {
    render(<BeatCard beat={freeBeat} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://img.youtube.com/vi/abc123XYZ/mqdefault.jpg",
    );
    expect(img).toHaveAttribute("alt", freeBeat.title);
    expect(img).toHaveAttribute("loading", "lazy");
  });
});
