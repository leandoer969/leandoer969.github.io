// src/components/TimelineItem.tsx
import React from 'react';

export type Variant = 'minimal' | 'milestone' | 'progress';

export interface TimelineItemProps {
  index: number;
  date: string;
  role: string;
  company: string;
  description: string;
  variant: Variant;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  index,
  date,
  role,
  company,
  description,
  variant,
}) => {
  // Common badge content
  const Badge = () => {
    if (variant === 'progress') {
      return (
        <div className="border-primary absolute -left-6 top-0 rounded-full border bg-white p-1"></div>
      );
    }
    return (
      <span className="bg-primary absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full text-white">
        {index}
      </span>
    );
  };

  // Variant-specific wrappers
  if (variant === 'milestone') {
    return (
      <div className="group relative py-6 pl-8 sm:pl-32">
        <span className="text-secondary absolute -left-0 bg-white px-2 font-semibold sm:-left-0 sm:-translate-x-full">
          {date}
        </span>
        <div className="absolute left-3 top-8 h-px w-8 bg-gray-300 group-odd:hidden sm:block" />
        <div className="bg-secondary absolute left-0 top-8 h-6 w-6 rounded-full" />
        <h4 className="mt-2 font-semibold text-gray-800">
          {role} @ {company}
        </h4>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    );
  }

  return (
    <div
      className={`relative pl-12 ${variant === 'progress' ? 'border-primary ml-4 border-l-2 pl-8' : ''}`}
    >
      <Badge />
      <div>
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <time className="text-secondary whitespace-nowrap font-semibold">
            {date}
          </time>
          <span className="text-primary font-semibold">{company}</span>
        </div>
        <h4 className="font-semibold text-gray-800">{role}</h4>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
};
