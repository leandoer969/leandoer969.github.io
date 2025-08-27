import * as React from 'react';

type Tone = 'neutral' | 'data' | 'product' | 'people';

function toneToClasses(tone: Tone) {
  switch (tone) {
    case 'data':
      return { bg: 'bg-surface-data', artText: 'text-data' };
    case 'product':
      return { bg: 'bg-surface-1', artText: 'text-primary' }; // adjust if you have a product surface
    case 'people':
      return { bg: 'bg-surface-people', artText: 'text-people' };
    default:
      return { bg: 'bg-surface-1', artText: 'text-muted' };
  }
}

export interface SectionPanelProps {
  tone?: Tone;
  textSide: 'left' | 'right';
  id?: string;
  ariaLabel?: string;
  /** e.g., 'min-h-[90svh] md:scroll-mt-nav' (default) */
  minHeightClassName?: string;
  /** override surface bg if needed */
  bgClassName?: string;
  /** pass default art color to right column */
  artColorClassName?: string;
  /** slots */
  text: React.ReactNode;
  art: React.ReactNode;
}

export const SectionPanel: React.FC<SectionPanelProps> = React.memo(
  ({
    tone = 'neutral',
    textSide,
    id,
    ariaLabel,
    minHeightClassName = 'min-h-[90svh] md:scroll-mt-nav',
    bgClassName,
    artColorClassName,
    text,
    art,
  }) => {
    const { bg, artText } = toneToClasses(tone);
    const textOrder = textSide === 'left' ? 'md:order-1' : 'md:order-2';
    const artOrder = textSide === 'left' ? 'md:order-2' : 'md:order-1';

    return (
      <section
        id={id}
        role="region"
        aria-label={ariaLabel}
        className={[
          'w-full',
          // min-height floor; section can grow with text
          minHeightClassName,
          // tone surface
          bgClassName ?? bg,
        ].join(' ')}
        data-section={id || undefined}
      >
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
          {/* Two columns on md+, stacked on mobile; columns must stretch equally */}
          <div className="ls-compact:grid-cols-1 grid items-stretch gap-8 md:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)]">
            {/* TEXT column: vertically centered when spare height; text can grow section */}
            <div className={['order-1 grid min-h-0', textOrder].join(' ')}>
              <div className="my-auto w-full">{text}</div>
            </div>

            {/* ART column: never drives height; fills whatever height the section ends up with */}
            <div
              className={[
                'order-2',
                artOrder,
                'flex min-h-0 items-center justify-center overflow-hidden',
                artColorClassName ?? artText,
              ].join(' ')}
            >
              {/* consumer must pass art with h-full (e.g., <ArtFigure className="h-full w-auto" />) */}
              <div className="h-full w-full">{art}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default SectionPanel;
