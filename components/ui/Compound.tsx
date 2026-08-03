/**
 * Compound headings with no space between the words — "FrontendTools".
 * The brightness step is what keeps them readable: the first word carries
 * full ink, the second drops back, so the seam reads without a gap.
 */
export function Compound({ words, className = '' }: { words: [string, string]; className?: string }) {
  return (
    <span className={className}>
      <span className="text-ink">{words[0]}</span>
      <span className="text-ink-3">{words[1]}</span>
    </span>
  );
}
