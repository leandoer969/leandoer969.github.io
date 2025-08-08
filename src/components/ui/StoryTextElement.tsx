// components/StoryTextElement.tsx
import * as React from 'react';
import { Badge } from './Badge';

export interface StoryTextElementProps {
  title: string;
  paragraph?: string;
  bullets?: string[];
  badges?: string[];
}

export const StoryTextElement: React.FC<StoryTextElementProps> = React.memo(
  ({ title, paragraph, bullets, badges }) => (
    <div className="measure stack-m mx-auto text-left">
      <h2 className="font-display text-h2 text-ink font-semibold tracking-tight">
        {title}
      </h2>

      {paragraph && <p className="text-body text-muted">{paragraph}</p>}

      {bullets?.length ? (
        <ul className="text-body text-ink list-disc space-y-1.5 pl-5">
          {bullets.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : null}

      {badges?.length ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {badges.map((label, i) => (
            <Badge key={i} label={label} />
          ))}
        </div>
      ) : null}
    </div>
  )
);
