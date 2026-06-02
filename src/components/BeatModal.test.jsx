import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BeatModal from "./BeatModal";
import { BEATSTARS_ROOT } from "../data/beats";

const freeBeat = {
  id: 1,
  title: "Free Test",
  genre: ["Boom Bap"],
  bpm: 88,
  youtubeId: "FREEvideoid",
  price: 0,
};

const paidBeat = {
  id: 2,
  title: "Paid Test",
  genre: ["Trap"],
  bpm: 140,
  youtubeId: "PAIDvideoid",
  price: 30,
};

const paidBeatWithUrl = {
  ...paidBeat,
  id: 3,
  purchaseUrl: "https://www.beatstars.com/sfbeatss/track/paid-test",
};

describe("<BeatModal /> dialog semantics", () => {
  it("renders a dialog with aria-modal and a label", () => {
    render(<BeatModal beat={freeBeat} onClose={() => {}} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "beat-modal-title");
    expect(document.getElementById("beat-modal-title")).toHaveTextContent(
      freeBeat.title,
    );
  });

  it("locks body scroll while open and restores it after unmount", () => {
    const { unmount } = render(
      <BeatModal beat={freeBeat} onClose={() => {}} />,
    );
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});

describe("<BeatModal /> YouTube embed", () => {
  it("renders an iframe pointing at the embedded autoplay URL", () => {
    const { container } = render(
      <BeatModal beat={freeBeat} onClose={() => {}} />,
    );
    const iframe = container.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/FREEvideoid?autoplay=1&rel=0",
    );
    expect(iframe).toHaveAttribute("allowFullScreen");
  });
});

describe("<BeatModal /> CTA — free", () => {
  it("renders a YouTube watch link", () => {
    render(<BeatModal beat={freeBeat} onClose={() => {}} />);
    const cta = screen.getByRole("link", { name: /watch on youtube/i });
    expect(cta).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=FREEvideoid",
    );
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("<BeatModal /> CTA — paid", () => {
  it("renders a 'Buy on BeatStars — $N' link defaulting to the channel root", () => {
    render(<BeatModal beat={paidBeat} onClose={() => {}} />);
    const cta = screen.getByRole("link", { name: /buy on beatstars — \$30/i });
    expect(cta).toHaveAttribute("href", BEATSTARS_ROOT);
  });

  it("honors per-track purchaseUrl when supplied", () => {
    render(<BeatModal beat={paidBeatWithUrl} onClose={() => {}} />);
    const cta = screen.getByRole("link", { name: /buy on beatstars/i });
    expect(cta).toHaveAttribute("href", paidBeatWithUrl.purchaseUrl);
  });
});

describe("<BeatModal /> close behavior", () => {
  it("invokes onClose when the X button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<BeatModal beat={freeBeat} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: /close preview/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("invokes onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<BeatModal beat={freeBeat} onClose={onClose} />);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("invokes onClose when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<BeatModal beat={freeBeat} onClose={onClose} />);

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT invoke onClose when the modal body itself is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<BeatModal beat={freeBeat} onClose={onClose} />);

    // Click the heading (inside the inner panel, not the backdrop)
    await user.click(screen.getByRole("heading", { name: freeBeat.title }));
    expect(onClose).not.toHaveBeenCalled();
  });
});
