// components/Badge.tsx
import * as React from 'react';

export interface BadgeProps {
  label: string;
  tone?:
    | 'primary'
    | 'health'
    | 'people'
    | 'info'
    | 'success'
    | 'warning'
    | 'neutral';
}

const toneClass: Record<NonNullable<BadgeProps['tone']>, string> = {
  primary:
    'ring-[color-mix(in oklch,var(--color-primary)45%,transparent)] bg-[color-mix(in oklch,var(--color-primary)18%,transparent)]',
  health:
    'ring-[color-mix(in oklch,var(--color-health)45%,transparent)]  bg-[color-mix(in oklch,var(--color-health)18%,transparent)]',
  people:
    'ring-[color-mix(in oklch,var(--color-people)45%,transparent)]  bg-[color-mix(in oklch,var(--color-people)18%,transparent)]',
  info: 'ring-[color-mix(in oklch,var(--color-info)45%,transparent)]    bg-[color-mix(in oklch,var(--color-info)18%,transparent)]',
  success:
    'ring-[color-mix(in oklch,var(--color-success)45%,transparent)] bg-[color-mix(in oklch,var(--color-success)18%,transparent)]',
  warning:
    'ring-[color-mix(in oklch,var(--color-warning)45%,transparent)] bg-[color-mix(in oklch,var(--color-warning)18%,transparent)]',
  neutral:
    'ring-[color-mix(in oklch,var(--color-border)60%,transparent)]  bg-[color-mix(in oklch,var(--color-border)18%,transparent)]',
};

export const Badge: React.FC<BadgeProps> = React.memo(
  ({ label, tone = 'neutral' }) => (
    <span
      className={[
        'text-small text-ink/80 inline-flex items-center rounded-full px-2.5 py-1 font-medium ring-1 backdrop-blur-sm',
        toneClass[tone],
      ].join(' ')}
    >
      {label}
    </span>
  )
);
