// src/components/Navbar.tsx
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-70 backdrop-blur-md z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Name */}
        <a href="#hero" className="text-2xl font-bold text-gray-900">
          Onath
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700">
          <li>
            <a href="#hero" className="hover:text-gray-900 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#cv" className="hover:text-gray-900 transition-colors">
              CV
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-gray-900 transition-colors"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#ongoings"
              className="hover:text-gray-900 transition-colors"
            >
              Ongoings
            </a>
          </li>
          <li>
            <a
              href="#cool-stuff"
              className="hover:text-gray-900 transition-colors"
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
