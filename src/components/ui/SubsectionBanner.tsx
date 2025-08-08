// src/components/ui/SubsectionBanner.tsx
import * as React from 'react';

export interface SubsectionBannerProps {
  textSide: 'left' | 'right';
  bgColor?: string;
  height?: string; // e.g. 'h-[100svh]' | 'h-[75svh]'
  art: React.ReactNode;
  children: React.ReactNode;
}

export const SubsectionBanner: React.FC<SubsectionBannerProps> = ({
  textSide,
  bgColor = 'bg-gray-100',
  height = 'h-[100svh]',
  art,
  children,
}) => {
  // On mobile: text = order-1, art = order-2 (always)
  // On desktop: swap based on textSide
  const textDesktopOrder = textSide === 'left' ? 'md:order-1' : 'md:order-2';
  const artDesktopOrder = textSide === 'left' ? 'md:order-2' : 'md:order-1';

  return (
    <section
      className={[
        'grid',
        height,
        bgColor,
        'grid-rows-2 md:grid-cols-2 md:grid-rows-1',
      ].join(' ')}
    >
      {/* Text */}
      <div
        className={[
          'order-1',
          textDesktopOrder,
          'flex min-h-0 items-center',
        ].join(' ')}
      >
        <div className="w-full p-10 md:p-12">{children}</div>
      </div>

      {/* Art */}
      <div className={['order-2', artDesktopOrder, 'min-h-0'].join(' ')}>
        {art}
      </div>
    </section>
  );
};
