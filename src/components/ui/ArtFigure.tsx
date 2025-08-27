import * as React from 'react';

type SvgLike =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ReactElement<React.SVGProps<SVGSVGElement>>
  | string;

export interface ArtFigureProps {
  svg: SvgLike;
  className?: string;
  wrapperClassName?: string;
  /** contain = fit whole viewBox (no crop), cover = fill & crop edges */
  fit?: 'contain' | 'cover';
  /** small flourish: rotate on mobile */
  rotateMobile?: boolean;
  /** decorative by default */
  decorative?: boolean;
  strokeWidth?: number | string;
  ariaLabel?: string;
}

export const ArtFigure: React.FC<ArtFigureProps> = React.memo(
  ({
    svg,
    className,
    wrapperClassName,
    fit = 'contain',
    rotateMobile = false,
    decorative = true,
    strokeWidth,
    ariaLabel,
  }) => {
    const wrapper = (child: React.ReactNode) => (
      <div
        className={[
          // fill column
          'relative h-full w-full',
          // center art, do not let it alter layout height
          'flex min-h-0 items-center justify-center overflow-hidden',
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

    const fitAttr = fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet';
    const base = ['h-full w-auto', className].filter(Boolean).join(' ');
    const rotate = rotateMobile ? 'rotate-90 md:rotate-0 origin-center' : '';

    const commonProps = {
      className: [base, rotate].filter(Boolean).join(' '),
      preserveAspectRatio: fitAttr,
      focusable: false as const,
      'aria-hidden': decorative || undefined,
      'aria-label': !decorative ? ariaLabel : undefined,
      vectorEffect:
        'non-scaling-stroke' as React.SVGAttributes<SVGSVGElement>['vectorEffect'],
      style: strokeWidth ? ({ strokeWidth } as React.CSSProperties) : undefined,
    };

    if (
      typeof svg === 'function' ||
      (typeof svg === 'object' && svg !== null && !React.isValidElement(svg))
    ) {
      const SvgComp = svg as React.ComponentType<React.SVGProps<SVGSVGElement>>;
      return wrapper(<SvgComp {...commonProps} />);
    }

    if (React.isValidElement<React.SVGProps<SVGSVGElement>>(svg)) {
      return wrapper(React.cloneElement(svg, { ...svg.props, ...commonProps }));
    }

    if (typeof svg === 'string') {
      if (import.meta.env.DEV) {
        console.warn(
          '[ArtFigure] received a string; did you forget ?react / svgr?',
          svg
        );
      }
      return wrapper(
        <img
          src={svg}
          alt=""
          aria-hidden="true"
          className={['h-full w-auto max-w-none', className]
            .filter(Boolean)
            .join(' ')}
          draggable={false}
        />
      );
    }

    return wrapper(svg as React.ReactNode);
  }
);

export default ArtFigure;
