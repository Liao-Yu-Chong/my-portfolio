'use client';

import { useEffect, useState, type MouseEvent } from 'react';

type Mode = 'light' | 'dark';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/** What the page is showing now: the saved choice, else the OS preference. */
function currentMode(): Mode {
  const set = document.documentElement.dataset.mode;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/**
 * Light is the default; the first visit follows the OS. A choice is saved
 * to localStorage, and layout.tsx's boot script applies it before first
 * paint. The label stays fixed ("深色模式") and aria-pressed carries the
 * state, so a screen reader hears "深色模式, toggle button, pressed".
 */
export function ModeToggle() {
  // null until mounted: the server can't know the visitor's mode.
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    setMode(currentMode());
    // Follow the OS while no explicit choice has been saved.
    const mq = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      if (!document.documentElement.dataset.mode) setMode(currentMode());
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Mode = currentMode() === 'dark' ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.dataset.mode = next;
      setMode(next);
      try {
        localStorage.setItem('mode', next);
      } catch {
        // Private mode or blocked storage: the switch still works for this visit.
      }
    };

    // The new mode spreads from the button in a circle (globals.css,
    // mode-spread). Skipped where View Transitions are missing or the
    // visitor asked for less motion: the switch is then instant.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('startViewTransition' in document) || reduced) {
      apply();
      return;
    }
    const r = event.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement.style;
    root.setProperty('--vt-x', `${x}px`);
    root.setProperty('--vt-y', `${y}px`);
    root.setProperty('--vt-r', `${radius}px`);
    document.startViewTransition(apply);
  };

  return (
    <button type="button" className="btn btn--sm crop" aria-pressed={mode === 'dark'} onClick={toggle}>
      深色模式
    </button>
  );
}
