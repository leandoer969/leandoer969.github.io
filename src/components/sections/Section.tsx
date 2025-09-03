// src/components/sections/Section.tsx
import * as React from 'react';

type Align = 'left' | 'right';

export interface SectionProps {
  id?: string;
  ariaLabel?: string;
  /** visual on the right by default; 'left' swaps sides on wide containers */
  align?: Align;
  /** surface background, e.g., 'bg-surface-data' | 'bg-surface-people' | 'bg-surface-1' */
  bgClass?: string;
  /** content slots */
  text: React.ReactNode;
  /** pass your SVG element/component here; it must get className="visualMedia" */
  visual?: React.ReactNode;
}

export default function Section({
  id,
  ariaLabel,
  align = 'right',
  bgClass = 'bg-surface-1',
  text,
  visual,
}: SectionProps) {
  return (
    <section
      id={id}
      role="region"
      aria-label={ariaLabel}
      className={[
        'section', // required: hooks into container queries
        bgClass, // section background color spans edge-to-edge
        align === 'left' ? 'section--align-left' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-section={id || undefined}
    >
      <div className="section__inner">
        <div className="section__grid">
          {/* TEXT first in DOM for accessibility; padding handled in CSS */}
          <div className="section__text">
            <div>{text}</div>
          </div>

          {/* VISUAL column (optional) */}
          {visual ? (
            <div className="section__visual">
              {/* IMPORTANT: CSS rotates this box in stacked mode */}
              <div className="section__visualBox">{visual}</div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
