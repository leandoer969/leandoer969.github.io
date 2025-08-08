// src/components/ui/ArtSection.tsx
import * as React from 'react';

type SvgLike =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ReactElement<React.SVGProps<SVGSVGElement>>;

export interface ArtSectionProps {
  svg: SvgLike;
  className?: string;
  wrapperClassName?: string;
  preserveAspectRatio?: string | null;
  unsetWidthHeight?: boolean;
  /** Rotate and stretch on mobile so the path spans side-to-side */
  mobileRotateAndStretch?: boolean;
}

export const ArtSection: React.FC<ArtSectionProps> = ({
  svg,
  className,
  wrapperClassName,
  preserveAspectRatio = 'xMidYMid meet',
  unsetWidthHeight = true,
  mobileRotateAndStretch = true,
}) => {
  const wrapper = (child: React.ReactNode) => (
    <div
      className={[
        'flex h-full w-full items-center justify-center',
        // Clip on mobile so long paths don’t bleed into other sections
        'overflow-hidden md:overflow-visible',
        'pointer-events-none', // decorative art, no accidental taps
        wrapperClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      {child}
    </div>
  );

  const mobileArtClasses = mobileRotateAndStretch
    ? 'rotate-90 md:rotate-0 w-[140%] max-w-none h-auto md:w-auto md:h-full'
    : 'w-full h-auto md:h-full md:w-auto';

  const mergedClass = [mobileArtClasses, className].filter(Boolean).join(' ');

  if (
    typeof svg === 'function' ||
    (typeof svg === 'object' && !React.isValidElement(svg))
  ) {
    const SvgComp = svg as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    return wrapper(
      <SvgComp
        className={mergedClass}
        preserveAspectRatio={preserveAspectRatio ?? undefined}
        width={unsetWidthHeight ? undefined : undefined}
        height={unsetWidthHeight ? undefined : undefined}
      />
    );
  }

  if (React.isValidElement<React.SVGProps<SVGSVGElement>>(svg)) {
    const incoming = svg.props;
    return wrapper(
      React.cloneElement(svg, {
        ...incoming,
        className: [incoming.className, mergedClass].filter(Boolean).join(' '),
        preserveAspectRatio:
          preserveAspectRatio === null
            ? incoming.preserveAspectRatio
            : preserveAspectRatio,
        width: unsetWidthHeight ? undefined : incoming.width,
        height: unsetWidthHeight ? undefined : incoming.height,
      })
    );
  }

  return wrapper(svg as React.ReactNode);
};
