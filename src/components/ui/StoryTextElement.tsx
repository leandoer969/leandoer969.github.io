// components/StoryTextElement.tsx
import * as React from 'react';
import { Badge } from './Badge';

export interface StoryTextElementProps {
  title: string;
  paragraph?: string;
  bullets?: string[];
  badges?: string[];
}

export const StoryTextElement: React.FC<StoryTextElementProps> = ({
  title,
  paragraph,
  bullets,
  badges,
}) => (
  <div className="mx-auto max-w-prose space-y-5 text-left md:space-y-6">
    {/* +1 step on mobile */}
    <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
      {title}
    </h2>

    {paragraph && (
      <p className="text-base leading-7 text-gray-700 md:text-lg md:leading-8">
        {paragraph}
      </p>
    )}

    {bullets && bullets.length > 0 && (
      <ul className="list-disc space-y-2 pl-5 text-base md:text-lg">
        {bullets.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    )}

    {badges && badges.length > 0 && (
      <div className="flex flex-wrap gap-2 pt-1">
        {badges.map((label, idx) => (
          <Badge key={idx} label={label} />
        ))}
      </div>
    )}
  </div>
);
