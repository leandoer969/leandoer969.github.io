// components/Badge.tsx
import React from 'react';

export interface BadgeProps {
  /** Text to display inside the badge */
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ label }) => (
  <span className="rounded-full bg-blue-200 px-3 py-1 text-sm font-medium text-blue-800">
    {label}
  </span>
);
