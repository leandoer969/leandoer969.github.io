import * as React from 'react';

type Item = { id: string; label: string };

export function LinksList({
  className,
  activeId,
  onClick,
  items = [
    { id: 'hero', label: 'Home' },
    { id: 'people', label: 'People' },
    { id: 'mission', label: 'Mission' },
    { id: 'vision', label: 'Vision' },
    { id: 'projects', label: 'Projects' },
    { id: 'ongoings', label: 'Ongoings' },
  ],
}: {
  className?: string;
  activeId?: string | null;
  onClick?: () => void;
  items?: Item[];
}) {
  return (
    <div className={className}>
      {items.map((it) => {
        const active = activeId === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={onClick}
            className={[
              'focus-ring rounded-sm px-1 py-0.5 transition-colors',
              active
                ? 'text-primary underline decoration-2 underline-offset-4'
                : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            {it.label}
          </a>
        );
      })}
    </div>
  );
}
