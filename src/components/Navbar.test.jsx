import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("<Navbar />", () => {
  it("renders the SF BEATS wordmark", () => {
    render(<Navbar />);
    expect(screen.getByText(/^SF BEATS$/)).toBeInTheDocument();
  });

  it("renders all four section links (mocked react-scroll Link → <a>)", () => {
    render(<Navbar />);
    expect(screen.getByTestId("scroll-link-home")).toBeInTheDocument();
    expect(screen.getByTestId("scroll-link-about")).toBeInTheDocument();
    expect(screen.getByTestId("scroll-link-beats")).toBeInTheDocument();
    // "contact" appears twice: nav link + Hire Me CTA
    expect(screen.getAllByTestId("scroll-link-contact")).toHaveLength(2);
  });

  it("routes the 'Hire Me' CTA to the contact section (not a mailto)", () => {
    render(<Navbar />);
    const hire = screen.getByText(/hire me/i).closest("a");
    expect(hire).toHaveAttribute("href", "#contact");
    expect(hire.href).not.toMatch(/mailto:/);
  });

  it("toggles the mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Closed state: 4 desktop nav links + 1 Hire Me CTA = 5 scroll-links.
    expect(screen.getAllByTestId(/scroll-link-/)).toHaveLength(5);

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    // Open state adds 4 mobile nav links → 9.
    expect(screen.getAllByTestId(/scroll-link-/)).toHaveLength(9);

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(screen.getAllByTestId(/scroll-link-/)).toHaveLength(5);
  });
});
