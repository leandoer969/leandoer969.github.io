// src/components/LinksList.tsx
import React from 'react';
import { NAV_LINKS } from '../../constants/NavLinks';

interface LinksListProps {
  className?: string;
  onClick?: () => void;
}

export const LinksList: React.FC<LinksListProps> = ({
  className = '',
  onClick,
}) => (
  <ul className={className}>
    {NAV_LINKS.map(({ href, label }) => (
      <li key={href}>
        <a
          href={href}
          className="block transition-colors hover:text-gray-900"
          onClick={onClick}
        >
          {label}
        </a>
      </li>
    ))}
  </ul>
);
