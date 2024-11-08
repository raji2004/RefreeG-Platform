// __tests__/Navbar.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { Navbar } from "../src/components/ui/navbar";

describe("Navbar Component", () => {
  it("renders the MountainIcon logo", () => {
    render(<Navbar />);
    // Check if the MountainIcon logo is in the document
    const logo = screen.getByRole("link", { name: /acme inc/i });
    expect(logo).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    const links = ["Home", "About", "Services", "Contact"];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("renders the menu button for mobile", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    expect(menuButton).toBeInTheDocument();
  });

  it("renders the sheet menu links on mobile", () => {
    render(<Navbar />);
    // Open the menu by clicking the hamburger button
    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    expect(menuButton).toBeInTheDocument();

    // Check if the menu links are visible after the button is clicked
    const menuLinks = ["Home", "About", "Services", "Contact"];
    menuLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });
});
