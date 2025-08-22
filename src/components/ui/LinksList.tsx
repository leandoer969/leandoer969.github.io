type Item = { id: string; label: string };

type LinksListProps = {
  className?: string;
  activeId?: string | null;
  onClick?: () => void;
  items?: Item[];
};

export function LinksList({
  className,
  activeId,
  onClick,
  items = [
    { id: 'hero', label: 'Home' },
    { id: 'data', label: 'Data & Analytics' },
    { id: 'products', label: 'Products' },
    { id: 'people', label: 'People' },

    // { id: 'mission', label: 'Mission' },
    // { id: 'vision', label: 'Vision' },
    // { id: 'projects', label: 'Projects' },
    // { id: 'ongoings', label: 'Ongoings' },
  ],
}: LinksListProps) {
  return (
    <ul className={className}>
      {items.map((it) => {
        const active = activeId === it.id;
        return (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={onClick}
              aria-current={active ? 'true' : undefined}
              className={[
                'focus-ring rounded-sm px-1 py-0.5 transition-colors',
                active
                  ? 'text-primary underline decoration-2 underline-offset-4'
                  : 'text-muted hover:text-ink',
              ].join(' ')}
            >
              {it.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
