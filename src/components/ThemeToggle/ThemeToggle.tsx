import { useEffect, useState } from 'react';
import css from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  // 1) якщо є збережений вибір — беремо його
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;

  // 2) інакше — системна перевага
  const prefersDark = window.matchMedia?.(
    '(prefers-color-scheme: dark)'
  ).matches;
  return prefersDark ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    // виставляємо атрибут на <html>
    document.documentElement.dataset.theme = theme;
    // зберігаємо вибір
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <div className={css.wrap}>
      <button
        type="button"
        className={css.toggle}
        aria-pressed={isDark}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        title={label}
      >
        <span className={css.icon} aria-hidden>
          {isDark ? '🌙' : '☀️'}
        </span>
        <span className={css.text}>{isDark ? 'Dark' : 'Light'}</span>
      </button>
    </div>
  );
}
