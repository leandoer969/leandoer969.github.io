// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { LinksList } from './ui/LinksList.tsx';

let DevThemeToggle: React.ComponentType | null = null;

if (import.meta.env.DEV) {
  // only imported in dev builds
  DevThemeToggle = React.lazy(() => import('./ThemeToggle.tsx'));
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <nav className="navbar-glass fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo / Name */}
        <a href="#hero" className="text-2xl font-bold text-gray-900">
          _onath__
        </a>
        {DevThemeToggle && (
          <React.Suspense fallback={null}>
            <DevThemeToggle />
          </React.Suspense>
        )}{' '}
        {/* Desktop Links */}
        <LinksList className="hidden space-x-8 font-medium text-gray-700 md:flex" />
        {/* Hamburger toggle (below md) */}
        <button
          className="text-gray-700 hover:text-gray-900 focus:outline-none md:hidden"
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
            className="flex flex-col space-y-4 font-medium text-gray-700"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
