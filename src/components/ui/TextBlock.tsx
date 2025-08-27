import { Badge } from '@/components/ui/Badge';
import * as React from 'react';

export interface TextBlockProps {
  title: string;
  subtitle?: string;
  paragraph?: string | React.ReactNode | Array<string | React.ReactNode>;
  bullets?: string[];
  badges?: string[];
  align?: 'left' | 'center';
  /** 'soft' = frosted card (default), 'plain' = no card, 'solid' = stronger card */
  variant?: 'soft' | 'plain' | 'solid';
  /** e.g., 'max-w-prose' | 'measure' */
  maxWidthClassName?: string;
}

export const TextBlock: React.FC<TextBlockProps> = React.memo(
  ({
    title,
    subtitle,
    paragraph,
    bullets,
    badges,
    align = 'left',
    variant = 'soft',
    maxWidthClassName = 'max-w-prose',
  }) => {
    const alignCls = align === 'center' ? 'text-center' : 'text-left';

    const cardCls =
      variant === 'plain'
        ? ''
        : variant === 'solid'
          ? 'rounded-2xl bg-surface-1 p-6 shadow-sm'
          : 'card-glass p-4 sm:p-6';

    const renderParagraph = (p: TextBlockProps['paragraph']) => {
      if (!p) return null;
      if (Array.isArray(p)) {
        return p.map((node, i) => (
          <p
            key={i}
            className="text-body text-muted hyphens-auto text-pretty break-words"
          >
            {node}
          </p>
        ));
      }
      return (
        <p className="text-body text-muted hyphens-auto text-pretty break-words">
          {p}
        </p>
      );
    };

    return (
      <div className={['mx-auto', maxWidthClassName, alignCls].join(' ')}>
        <div className={['stack-m', cardCls].filter(Boolean).join(' ')}>
          <h2 className="font-display text-h2 text-ink text-balance font-semibold tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <h3 className="font-display text-h3 text-ink text-balance font-semibold tracking-tight">
              {subtitle}
            </h3>
          ) : null}

          {renderParagraph(paragraph)}

          {bullets?.length ? (
            <ul className="text-body text-ink list-disc space-y-1.5 pl-5">
              {bullets.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : null}

          {badges?.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {badges.map((label, i) => (
                <Badge key={i} label={label} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

export default TextBlock;
