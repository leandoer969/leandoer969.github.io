import * as React from 'react';

type SvgLike =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ReactElement<React.SVGProps<SVGSVGElement>>;

export interface ArtSectionProps {
  svg: SvgLike;
  className?: string;
  wrapperClassName?: string;
  preserveAspectRatio?: string | null;
  unsetWidthHeight?: boolean; // default true
  mobileRotateAndStretch?: boolean; // default true
  decorative?: boolean; // default true
}

export const ArtSection: React.FC<ArtSectionProps> = React.memo(
  ({
    svg,
    className,
    wrapperClassName,
    preserveAspectRatio = 'xMidYMid meet',
    unsetWidthHeight = true,
    mobileRotateAndStretch = true,
    decorative = true,
  }) => {
    const wrapper = (child: React.ReactNode) => (
      <div
        className={[
          'flex h-full w-full items-center justify-center',
          'overflow-hidden md:overflow-visible',
          'pointer-events-none select-none',
          wrapperClassName,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={decorative || undefined}
      >
        {child}
      </div>
    );

    const mobileArtClasses = mobileRotateAndStretch
      ? 'origin-center rotate-90 md:rotate-0 w-[160%] max-w-none h-auto md:w-auto md:h-full'
      : 'w-full h-auto md:h-full md:w-auto';

    const mergedClass = [mobileArtClasses, className].filter(Boolean).join(' ');

    // SVGR component
    if (
      typeof svg === 'function' ||
      (typeof svg === 'object' && !React.isValidElement(svg))
    ) {
      const SvgComp = svg as React.ComponentType<React.SVGProps<SVGSVGElement>>;
      return wrapper(
        <SvgComp
          className={mergedClass}
          preserveAspectRatio={preserveAspectRatio ?? undefined}
          focusable={false}
          aria-hidden={decorative || undefined}
        />
      );
    }

    // React element
    if (React.isValidElement<React.SVGProps<SVGSVGElement>>(svg)) {
      const incoming = svg.props;
      return wrapper(
        React.cloneElement(svg, {
          ...incoming,
          className: [incoming.className, mergedClass]
            .filter(Boolean)
            .join(' '),
          preserveAspectRatio:
            preserveAspectRatio === null
              ? incoming.preserveAspectRatio
              : preserveAspectRatio,
          width: unsetWidthHeight ? undefined : incoming.width,
          height: unsetWidthHeight ? undefined : incoming.height,
          focusable: false,
          'aria-hidden': decorative || undefined,
        })
      );
    }

    return wrapper(svg as React.ReactNode);
  }
);
