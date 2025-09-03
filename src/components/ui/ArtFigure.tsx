// src/components/ui/ArtFigure.tsx
import * as React from 'react';

type SvgLike =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ReactElement<React.SVGProps<SVGSVGElement>>
  | string;

export interface ArtFigureProps {
  svg: SvgLike;
  className?: string; // will be merged with "visualMedia"
  preserveAspectRatio?: string; // default 'xMidYMid meet'
  strokeWidth?: number | string;
  decorative?: boolean; // default true
  ariaLabel?: string;
}

export default function ArtFigure({
  svg,
  className,
  preserveAspectRatio = 'xMidYMid meet',
  strokeWidth,
  decorative = true,
  ariaLabel,
}: ArtFigureProps) {
  const cls = ['visualMedia', className].filter(Boolean).join(' ');
  const common = {
    className: cls,
    preserveAspectRatio,
    focusable: false as const,
    'aria-hidden': decorative || undefined,
    'aria-label': !decorative ? ariaLabel : undefined,
    vectorEffect:
      'non-scaling-stroke' as React.SVGAttributes<SVGSVGElement>['vectorEffect'],
    style: strokeWidth ? ({ strokeWidth } as React.CSSProperties) : undefined,
  };

  if (typeof svg === 'function') {
    const Cmp = svg as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    return <Cmp {...common} />;
  }
  if (React.isValidElement<React.SVGProps<SVGSVGElement>>(svg)) {
    return React.cloneElement(svg, { ...svg.props, ...common });
  }
  if (typeof svg === 'string') {
    return (
      <img
        src={svg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={cls}
      />
    );
  }
  return svg as React.ReactElement;
}
