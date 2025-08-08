// src/components/ThemeToggle.tsx
import * as React from 'react';

type Theme = 'system' | 'light' | 'dark';
const STORAGE_KEY = 'theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  if (theme === 'dark') root.classList.add('dark');
  if (theme === 'light') root.classList.add('light');
  // 'system' => no class; media query decides
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
}

export default function ThemeToggle({
  className = '',
}: {
  className?: string;
}) {
  const [theme, setTheme] = React.useState<Theme>(getInitialTheme);

  // Apply on mount and whenever it changes
  React.useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // If following system, update on system changes too (live preview)
  React.useEffect(() => {
    if (theme !== 'system') return;
    const m = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    m.addEventListener?.('change', handler);
    return () => m.removeEventListener?.('change', handler);
  }, [theme]);

  return (
    <div
      className={[
        'border-border/60 inline-flex items-center gap-1 rounded-xl border',
        'bg-white/60 px-1 py-1 backdrop-blur-md dark:bg-white/10',
        className,
      ].join(' ')}
      role="group"
      aria-label="Theme"
      title="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme('system')}
        className={[
          'rounded-lg px-2.5 py-1.5 text-sm',
          theme === 'system'
            ? 'bg-surface-1 text-ink'
            : 'text-muted hover:text-ink',
        ].join(' ')}
        aria-pressed={theme === 'system'}
      >
        System
      </button>
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={[
          'rounded-lg px-2.5 py-1.5 text-sm',
          theme === 'light'
            ? 'bg-surface-1 text-ink'
            : 'text-muted hover:text-ink',
        ].join(' ')}
        aria-pressed={theme === 'light'}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={[
          'rounded-lg px-2.5 py-1.5 text-sm',
          theme === 'dark'
            ? 'bg-surface-1 text-ink'
            : 'text-muted hover:text-ink',
        ].join(' ')}
        aria-pressed={theme === 'dark'}
      >
        Dark
      </button>
    </div>
  );
}
