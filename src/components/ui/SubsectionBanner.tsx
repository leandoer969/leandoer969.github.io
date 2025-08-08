import * as React from 'react';

type Tone = 'neutral' | 'data' | 'health' | 'people' | 'primary';

function toneToClasses(tone: Tone) {
  switch (tone) {
    case 'data':
      return { bg: 'bg-surface-data', artText: 'text-data' };
    case 'health':
      return { bg: 'bg-surface-health', artText: 'text-health' };
    case 'people':
      return { bg: 'bg-surface-people', artText: 'text-people' };
    case 'primary':
      return { bg: 'bg-surface-1', artText: 'text-primary' };
    default:
      return { bg: 'bg-surface-1', artText: 'text-muted' };
  }
}

export interface SubsectionBannerProps {
  textSide: 'left' | 'right';
  /** If provided, overrides the tone surface */
  bgColor?: string;
  /** Picks default surface + default art color */
  tone?: Tone;
  /** Height class, e.g. 'h-[90svh]' */
  height?: string;
  art: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  ariaLabel?: string;
}

export const SubsectionBanner: React.FC<SubsectionBannerProps> = React.memo(
  ({
    textSide,
    bgColor,
    tone = 'neutral',
    height = 'h-[90svh] scroll-mt-nav',
    art,
    children,
    id,
    ariaLabel,
  }) => {
    const { bg, artText } = toneToClasses(tone);
    const textDesktopOrder = textSide === 'left' ? 'md:order-1' : 'md:order-2';
    const artDesktopOrder = textSide === 'left' ? 'md:order-2' : 'md:order-1';

    return (
      <section
        id={id}
        role="region"
        aria-label={ariaLabel}
        className={[
          'grid',
          height,
          bgColor ?? bg, // bgColor wins, else tone surface
          'grid-rows-[auto,1fr] md:grid-cols-2 md:grid-rows-1',
        ].join(' ')}
        data-section={id || undefined}
      >
        {/* Text */}
        <div
          className={[
            'order-1',
            textDesktopOrder,
            'flex min-h-0 items-center',
          ].join(' ')}
        >
          <div className="w-full px-6 py-10 md:px-12 md:py-16">{children}</div>
        </div>

        {/* Art: default color from tone; child color (text-*) overrides if provided */}
        <div
          className={['order-2', artDesktopOrder, 'min-h-0', artText].join(' ')}
        >
          {art}
        </div>
      </section>
    );
  }
);
