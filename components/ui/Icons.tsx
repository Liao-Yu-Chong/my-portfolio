/**
 * Inline marks so the page pulls in no icon library.
 *
 * Two changes from the exported source files:
 *
 * 1. stroke is currentColor, not #ffffff, so the same icon works on the
 *    ember-filled button (dark stroke) and the outlined one (light stroke).
 * 2. every path carries pathLength={1}, which normalises the draw animation.
 *    The originals hardcoded a stroke-dasharray per path (62.957, 7.894,
 *    72.000, 23.427), which needs one keyframe block per path. Normalised,
 *    all four share the single `icon-draw` keyframe in globals.css.
 *
 * The draw runs on hover rather than on an infinite loop — see globals.css.
 */

type IconProps = { className?: string };

export function MailIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-draw ${className}`}
      aria-hidden="true"
    >
      <path pathLength={1} d="M 2 4 h 20 v 16 h -20 Z" />
      <path pathLength={1} d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function GitHubIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-draw ${className}`}
      aria-hidden="true"
    >
      <path
        pathLength={1}
        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      />
      <path pathLength={1} d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
