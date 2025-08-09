import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { LinksList } from '../components/ui/LinksList';

const ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'people', label: 'People' },
  { id: 'mission', label: 'Mission' },
  { id: 'vision', label: 'Vision' },
  { id: 'projects', label: 'Projects' },
  { id: 'ongoings', label: 'Ongoings' },
];

describe('Navbar LinksList', () => {
  it('renders all in-page nav items', () => {
    render(
      <MemoryRouter>
        <LinksList items={ITEMS} />
      </MemoryRouter>
    );

    // assert presence by label (stable and readable)
    for (const { label } of ITEMS) {
      expect(
        screen.getByRole('link', { name: new RegExp(label, 'i') })
      ).toBeInTheDocument();
    }

    // optional: assert the count
    expect(screen.getAllByRole('link')).toHaveLength(ITEMS.length);
  });

  it('calls onClick when a link is clicked (e.g., to close mobile menu)', () => {
    const onClick = vi.fn();
    render(
      <MemoryRouter>
        <LinksList items={ITEMS} onClick={onClick} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('link', { name: /people/i }));
    expect(onClick).toHaveBeenCalled();
  });
});
