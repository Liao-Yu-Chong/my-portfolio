/**
 * Inline marks so the page pulls in no icon library. Both are solid fills
 * rather than one solid and one stroked, so they carry the same weight
 * sitting next to each other.
 *
 * Sizes differ on purpose: the GitHub mark fills its viewBox edge to edge
 * while the envelope has margins, so matching the numbers would make
 * GitHub read as the larger of the two.
 */

export function MailIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M2.4 6.5A1.5 1.5 0 0 1 3.9 5h16.2a1.5 1.5 0 0 1 1.5 1.5v.36l-9.05 5.3a1.1 1.1 0 0 1-1.1 0L2.4 6.86V6.5Z" />
      <path d="M21.6 8.6v8.9a1.5 1.5 0 0 1-1.5 1.5H3.9a1.5 1.5 0 0 1-1.5-1.5V8.6l8.54 5a2.1 2.1 0 0 0 2.12 0l8.54-5Z" />
    </svg>
  );
}

export function GitHubIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
