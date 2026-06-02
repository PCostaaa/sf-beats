import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("<Footer />", () => {
  it("renders the wordmark", () => {
    render(<Footer />);
    expect(screen.getByText(/^SF BEATS$/)).toBeInTheDocument();
  });

  it("renders the current year in the copyright string", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument();
  });

  const expectedSocials = [
    { label: "YouTube", href: "https://www.youtube.com/@sfbeats236" },
    { label: "SoundCloud", href: "https://soundcloud.com/sf236" },
    { label: "BeatStars", href: "https://www.beatstars.com/sfbeatss" },
    { label: "Instagram", href: "https://www.instagram.com/sfbeatss/" },
    { label: "Email", href: "mailto:sfbeatsss@gmail.com" },
  ];

  it.each(expectedSocials)(
    "renders a $label link to $href with aria-label",
    ({ label, href }) => {
      render(<Footer />);
      const link = screen.getByLabelText(label);
      expect(link).toHaveAttribute("href", href);
    },
  );

  it("opens external (non-mailto) socials in a new tab", () => {
    render(<Footer />);
    const ytLink = screen.getByLabelText("YouTube");
    expect(ytLink).toHaveAttribute("target", "_blank");
    expect(ytLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
