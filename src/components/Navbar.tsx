// src/components/Navbar.tsx
import React from 'react';
import { LinksList } from './ui/LinksList.tsx';

const Navbar: React.FC = () => (
  <nav className="fixed inset-x-0 top-0 z-50 bg-white/60 backdrop-blur-md">
    <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      {/* Logo / Name */}
      <a href="#hero" className="text-2xl font-bold text-gray-900">
        _onath__
      </a>

      {/* Desktop Links */}
      <LinksList className="hidden space-x-8 font-medium text-gray-700 md:flex" />

      {/* Mobile Links (static for now) */}
      <LinksList className="flex flex-col space-y-4 font-medium text-gray-700 md:hidden" />
    </div>
  </nav>
);

export default Navbar;
