// src/components/Navbar.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LinksList } from './ui/LinksList';
import { useActiveSection } from '../hooks/useActiveSection';

let DevThemeToggle: React.ComponentType | null = null;
if (import.meta.env.DEV) {
  DevThemeToggle = React.lazy(() => import('./ThemeToggle'));
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  // sections you want to spy (ensure your sections have these ids)
  const sectionIds = useMemo(
    () =>
      ['hero', 'people', 'mission', 'vision', 'projects', 'ongoings'] as const,
    []
  );
  const activeId = useActiveSection(sectionIds);

  return (
    <nav className="navbar-glass fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo / Name */}
        <a href="#hero" className="text-ink text-2xl font-bold">
          _onath__
        </a>

        {/* Dev-only theme toggle */}
        {DevThemeToggle && (
          <React.Suspense fallback={null}>
            <DevThemeToggle />
          </React.Suspense>
        )}

        {/* Desktop Links */}
        <LinksList
          activeId={activeId}
          className="hidden items-center gap-8 font-medium md:flex"
        />

        {/* Hamburger toggle (below md) */}
        <button
          className="text-muted hover:text-ink focus-ring md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="relative inset-x-0 top-full p-6 md:hidden"
        >
          <LinksList
            activeId={activeId}
            className="flex flex-col space-y-4 font-medium"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
