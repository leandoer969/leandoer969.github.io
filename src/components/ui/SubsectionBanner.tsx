import * as React from 'react';

export interface SubsectionBannerProps {
  textSide: 'left' | 'right';
  bgColor?: string; // prefer token surfaces
  height?: string; // e.g. 'h-[90svh]'
  art: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  ariaLabel?: string;
}

export const SubsectionBanner: React.FC<SubsectionBannerProps> = React.memo(
  ({
    textSide,
    bgColor = 'bg-surface-1',
    height = 'h-[90svh]',
    art,
    children,
    id,
    ariaLabel,
  }) => {
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
          bgColor,
          'grid-rows-[auto,1fr] md:grid-cols-2 md:grid-rows-1',
        ].join(' ')}
      >
        <div
          className={[
            'order-1',
            textDesktopOrder,
            'flex min-h-0 items-center',
          ].join(' ')}
        >
          <div className="w-full px-6 py-10 md:px-12 md:py-16">{children}</div>
        </div>
        <div className={['order-2', artDesktopOrder, 'min-h-0'].join(' ')}>
          {art}
        </div>
      </section>
    );
  }
);
