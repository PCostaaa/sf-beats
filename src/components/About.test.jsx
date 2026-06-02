import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("<About />", () => {
  it("renders the section heading and bio", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { name: /the producer behind the sound/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/independent music producer/i)).toBeInTheDocument();
  });

  it("renders the brand logo with descriptive alt text", () => {
    render(<About />);
    const img = screen.getByAltText(/sf beats logo/i);
    expect(img).toHaveAttribute("src", "/LOGO_SF.jpg");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("renders all tag pills", () => {
    render(<About />);
    for (const tag of ["Trap", "Boom Bap", "Lo-Fi", "Drill", "Ableton Live"]) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("links 'Watch on YouTube' to the channel", () => {
    render(<About />);
    const link = screen.getByRole("link", { name: /watch on youtube/i });
    expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/@sfbeats236",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
