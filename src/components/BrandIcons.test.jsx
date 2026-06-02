import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  SoundCloudIcon,
  BeatStarsIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./BrandIcons";

describe("<BrandIcons />", () => {
  it.each([
    ["SoundCloud", SoundCloudIcon],
    ["BeatStars", BeatStarsIcon],
    ["YouTube", YoutubeIcon],
    ["Instagram", InstagramIcon],
  ])("%s renders an svg with aria-hidden", (_label, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("applies custom className", () => {
    const { container } = render(<SoundCloudIcon className="custom-x" />);
    expect(container.querySelector("svg")).toHaveClass("custom-x");
  });

  it("falls back to a sensible default className when none is passed", () => {
    const { container } = render(<SoundCloudIcon />);
    const svg = container.querySelector("svg");
    expect(svg.getAttribute("class")).toMatch(/w-\d/);
  });
});
