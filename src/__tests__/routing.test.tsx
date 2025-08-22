import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

// 🧪 mock BEFORE importing the component under test
vi.mock('../components/BackgroundShapes', () => ({
  __esModule: true,
  default: () => <div data-testid="bg-shapes" />,
}));

import App from '../App';
import NotFound from '../pages/NotFound';
import UnderConstruction from '../pages/UnderConstruction';

describe('App routing', () => {
  it('renders UnderConstruction at /wip', () => {
    render(
      <MemoryRouter initialEntries={['/wip']}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/wip" element={<UnderConstruction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /site under construction/i })
    ).toBeInTheDocument();
  });

  it('renders NotFound for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/this-does-not-exist']}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/wip" element={<UnderConstruction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
