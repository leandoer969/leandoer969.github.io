import { Moon, Sun } from 'lucide-react';
import * as React from 'react';

type Theme = 'system' | 'light' | 'dark';
const STORAGE_KEY = 'theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  if (theme === 'light') root.classList.add('light');
  else if (theme === 'dark') root.classList.add('dark');
  // 'system' => no class; CSS media query decides
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return v === 'light' || v === 'dark' || v === 'system' ? v : null;
}

export default function IconThemeSwitch({
  className = '',
}: {
  className?: string;
}) {
  const [theme, setTheme] = React.useState<Theme>(getStoredTheme() ?? 'system');
  const [systemDark, setSystemDark] = React.useState<boolean>(() =>
    typeof window !== 'undefined'
      ? (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false)
      : false
  );

  // Apply on mount + whenever theme changes
  React.useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* empty */
    }
  }, [theme]);

  // Track system changes when following system
  React.useEffect(() => {
    const m = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!m) return;
    const handler = (e: MediaQueryListEvent) => {
      setSystemDark(e.matches);
      if (theme === 'system') applyTheme('system');
    };
    // initialize
    setSystemDark(m.matches);
    m.addEventListener?.('change', handler);
    return () => m.removeEventListener?.('change', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effective mode drives the icon
  const effectiveDark = theme === 'system' ? systemDark : theme === 'dark';

  const toggle = () => {
    setTheme(effectiveDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={effectiveDark ? 'Switch to light' : 'Switch to dark'}
      aria-label={
        effectiveDark ? 'Switch to light theme' : 'Switch to dark theme'
      }
      className={[
        'rounded-lg p-2',
        'text-muted hover:text-ink',
        'transition:rotate-360 transition-colors',
        className,
      ].join(' ')}
    >
      {effectiveDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
