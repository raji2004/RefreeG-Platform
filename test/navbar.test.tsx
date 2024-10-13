// __tests__/Navbar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Navbar from '../src/components/ui/navbar';

describe('Navbar Component', () => {
  it('renders the logo', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    const links = ['Search', 'Explore causes', 'About us', 'How it works', 'List a cause'];
    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders the login button', () => {
    render(<Navbar />);
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });

  it('renders the custom Button component', () => {
    render(<Navbar />);
    const loginButton = screen.getByLabelText(/login/i);
    expect(loginButton).toBeInTheDocument();
  });
});
