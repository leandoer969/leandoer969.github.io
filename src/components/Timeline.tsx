// src/components/Timeline.tsx
import React from 'react';

export interface TimelineEntry {
  date: string;
  role: string;
  company: string;
  description: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

const Timeline: React.FC<TimelineProps> = ({ entries }) => (
  <div className="relative before:absolute before:bottom-0 before:left-4 before:top-0 before:w-px before:bg-gray-300">
    <ul className="space-y-8">
      {entries.map((e, idx) => (
        <li key={idx} className="relative pl-12">
          <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            {idx + 1}
          </span>
          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold text-indigo-600">{e.date}</span>
              <span className="font-medium text-gray-800">
                {e.role} @ {e.company}
              </span>
            </div>
            <p className="mt-1 text-gray-600">{e.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Timeline;
