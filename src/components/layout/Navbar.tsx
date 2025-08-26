// src/components/Navbar.tsx
import IconThemeSwitch from '@/components/ui/IconThemeSwitch';
import { LinksList } from '@/components/ui/LinksList';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Menu, X } from 'lucide-react';
import * as React from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // prevent body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  // close on Escape (a11y)
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // sections you want to spy (ensure your sections have these ids)
  const sectionIds = React.useMemo(
    () => ['hero', 'about', 'data', 'product', 'people'] as const,
    []
  );
  const activeId = useActiveSection(sectionIds);

  return (
    <nav
      className="navbar-glass fixed inset-x-0 top-0 z-50"
      role="navigation"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-5xl px-6 py-4">
        {/* Single row: Logo (left) | menu (right) */}
        <div className="flex h-10 items-center justify-between">
          {/* Logo / Name */}
          <a href="#hero" className="text-ink text-2xl font-bold leading-none">
            _onath__
          </a>

          {/* Right cluster: desktop links + theme switch + burger (mobile) */}
          <div className="flex items-center gap-4">
            {/* Desktop Links */}
            <LinksList
              activeId={activeId}
              className="hidden items-center gap-8 whitespace-nowrap font-medium md:flex"
            />

            {/* high-contrast divider + spacing */}
            <div className="menu-divider">
              <IconThemeSwitch />
            </div>

            {/* Burger toggle (mobile only) */}
            <button
              className="text-muted hover:text-ink rounded-lg p-2 transition-colors md:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((prev) => !prev)}
              title="Navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu (stacked links, switch last) */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="relative inset-x-0 top-full p-6 md:hidden"
        >
          <div className="mx-auto max-w-5xl">
            <LinksList
              activeId={activeId}
              className="flex flex-col space-y-4 font-medium"
              onClick={() => setIsOpen(false)}
            />

            {/* Switch last, with spacing above it */}
            <div className="mt-4">
              <IconThemeSwitch />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
