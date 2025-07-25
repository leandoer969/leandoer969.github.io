// src/components/OngoingEntry.tsx
import React from 'react';

export interface Ongoing {
  date: string;
  title: string;
  description: string;
  link?: { href: string; label: string };
}

interface OngoingEntryProps {
  entry: Ongoing;
}

const OngoingEntry: React.FC<OngoingEntryProps> = ({ entry }) => (
  <div className="flex items-start space-x-4">
    {/* Dot + line marker */}
    <div className="flex flex-col items-center">
      <span className="mt-2 h-2 w-2 rounded-full bg-indigo-600" />
      <div className="w-px flex-1 bg-gray-300" />
    </div>

    {/* Content */}
    <div>
      <div className="flex items-baseline space-x-2">
        <time className="text-sm text-gray-500">{entry.date}</time>
        <h4 className="text-lg font-medium text-gray-800">{entry.title}</h4>
      </div>
      <p className="mt-1 text-gray-600">{entry.description}</p>
      {entry.link && (
        <a
          href={entry.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-sm text-indigo-600 hover:underline"
        >
          {entry.link.label}
        </a>
      )}
    </div>
  </div>
);

export default OngoingEntry;
