import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("<Hero />", () => {
  it("renders the headline and producer subtitle", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: /beats that hit different/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Producer Portugal/i)).toBeInTheDocument();
  });

  it("routes 'Listen Now' to the beats section", () => {
    render(<Hero />);
    expect(screen.getByTestId("scroll-link-beats")).toHaveTextContent(
      /listen now/i,
    );
  });

  it("routes 'Get a Custom Beat' to the contact section", () => {
    render(<Hero />);
    expect(screen.getByTestId("scroll-link-contact")).toHaveTextContent(
      /get a custom beat/i,
    );
  });

  it("renders all three stat callouts", () => {
    render(<Hero />);
    expect(screen.getByText("50+")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("4+")).toBeInTheDocument();
  });

  it("renders the disc visual with the brand logo", () => {
    // The logo img has alt="" + aria-hidden, so RTL doesn't expose it via roles.
    // Query the DOM directly.
    const { container } = render(<Hero />);
    const logo = container.querySelector('img[src="/LOGO_SF.jpg"]');
    expect(logo).not.toBeNull();
  });
});
