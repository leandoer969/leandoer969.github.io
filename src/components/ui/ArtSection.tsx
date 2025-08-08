import * as React from 'react';

type SvgLike =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ReactElement<React.SVGProps<SVGSVGElement>>
  | string; // allow string so we can gracefully fallback

export interface ArtSectionProps {
  svg: SvgLike;
  className?: string;
  wrapperClassName?: string;
  preserveAspectRatio?: string | null;
  unsetWidthHeight?: boolean; // default true
  mobileRotateAndStretch?: boolean; // default true
  decorative?: boolean; // default true
  strokeWidth?: number | string;
  ariaLabel?: string;
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
    strokeWidth,
    ariaLabel,
  }) => {
    const wrapper = (child: React.ReactNode) => (
      <div
        className={[
          'flex h-full w-full items-center justify-center',
          // Clip on mobile; allow bleed on desktop so long paths can breathe
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

    // Common props for <svg> (component or element)
    const commonProps = {
      className: mergedClass,
      preserveAspectRatio: preserveAspectRatio ?? undefined,
      focusable: false as const,
      'aria-hidden': decorative || undefined,
      'aria-label': !decorative ? ariaLabel : undefined,
      vectorEffect:
        'non-scaling-stroke' as React.SVGAttributes<SVGSVGElement>['vectorEffect'],
      // inline style cascades into children strokes
      style: strokeWidth ? ({ strokeWidth } as React.CSSProperties) : undefined,
    };

    // 1) SVGR component (function)
    if (
      typeof svg === 'function' ||
      (typeof svg === 'object' && svg !== null && !React.isValidElement(svg))
    ) {
      const SvgComp = svg as React.ComponentType<React.SVGProps<SVGSVGElement>>;
      return wrapper(<SvgComp {...commonProps} />);
    }

    // 2) React element (<svg .../>)
    if (React.isValidElement<React.SVGProps<SVGSVGElement>>(svg)) {
      return wrapper(
        React.cloneElement(svg, {
          ...svg.props,
          ...commonProps,
          // If caller wants to keep explicit width/height from incoming, allow it
          width: unsetWidthHeight ? undefined : svg.props.width,
          height: unsetWidthHeight ? undefined : svg.props.height,
        })
      );
    }

    // 3) Fallback: string URL (someone forgot ?react) → render <img> so it doesn't print the data URL
    if (typeof svg === 'string') {
      if (import.meta.env.DEV) {
        console.warn(
          '[ArtSection] Received a string instead of an SVG component. Did you forget to import with ?react or configure vite-plugin-svgr?',
          svg.slice(0, 64) + (svg.length > 64 ? '…' : '')
        );
      }
      return wrapper(
        <img
          src={svg}
          alt=""
          aria-hidden="true"
          className={['max-w-none', className].filter(Boolean).join(' ')}
          draggable={false}
        />
      );
    }

    // Last resort
    return wrapper(svg as React.ReactNode);
  }
);
