import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders all major sections by ID", () => {
    const { container } = render(<App />);
    expect(container.querySelector("#home")).not.toBeNull();
    expect(container.querySelector("#about")).not.toBeNull();
    expect(container.querySelector("#beats")).not.toBeNull();
    expect(container.querySelector("#contact")).not.toBeNull();
  });

  it("renders a single <main> landmark", () => {
    render(<App />);
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
});
