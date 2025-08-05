// src/components/Navbar.tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo / Name */}
        <a href="#hero" className="text-2xl font-bold text-gray-900">
          _onath__
        </a>

        {/* Desktop Links */}
        <ul className="hidden space-x-8 font-medium text-gray-700 md:flex">
          <li>
            <a href="#hero" className="transition-colors hover:text-gray-900">
              Home
            </a>
          </li>
          <li>
            <a href="#cv" className="transition-colors hover:text-gray-900">
              CV
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="transition-colors hover:text-gray-900"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#ongoings"
              className="transition-colors hover:text-gray-900"
            >
              Ongoings
            </a>
          </li>
          <li>
            <a
              href="#cool-stuff"
              className="transition-colors hover:text-gray-900"
            >
              Cool Stuff
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
