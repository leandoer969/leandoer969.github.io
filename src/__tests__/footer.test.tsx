// src/__tests__/footer.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

// 👇 Mock SVGR icon components so we don't depend on Vite's transform in tests
vi.mock('../components/../assets/icons/github.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="gh-icon" {...props} />
  ),
}));
vi.mock('../components/../assets/icons/linkedin.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="li-icon" {...props} />
  ),
}));

import Footer from '../components/layout/Footer';

describe('Footer', () => {
  it('renders a contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has a GitHub link with correct target and rel', () => {
    render(<Footer />);
    const gh = screen.getByRole('link', { name: /github/i });
    expect(gh).toHaveAttribute('href', 'https://github.com/leandoer969');
    expect(gh).toHaveAttribute('target', '_blank');
    expect(gh.getAttribute('rel') || '').toContain('noopener');
    expect(gh.getAttribute('rel') || '').toContain('noreferrer');
  });

  it('has a LinkedIn link with correct target and rel', () => {
    render(<Footer />);
    const li = screen.getByRole('link', { name: /linkedin/i });
    expect(li).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/jonathanleathers'
    );
    expect(li).toHaveAttribute('target', '_blank');
    expect(li.getAttribute('rel') || '').toContain('noopener');
    expect(li.getAttribute('rel') || '').toContain('noreferrer');
  });

  it('renders icons that are hidden from accessibility tree', () => {
    const { container } = render(<Footer />);
    const hiddenSvgs = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(hiddenSvgs.length).toBeGreaterThanOrEqual(2);
  });

  it('shows the current year', () => {
    render(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText((t) => t.includes(year))).toBeInTheDocument();
  });
});
