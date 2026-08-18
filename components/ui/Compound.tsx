/**
 * Compound headings with no space between the words — "FrontendTools".
 * The brightness step is what keeps them readable: the first word carries
 * full ink, the second drops back, so the seam reads without a gap.
 *
 * The dropped half uses `seam` rather than `ink-3`. ink-3 has to clear AA
 * body contrast because captions use it; the seam only has to clear the 3:1
 * large-text threshold, and wants to stay dark so the two halves separate.
 * Only set this at display sizes — every caller is 24px or larger.
 */
export function Compound({ words, className = '' }: { words: [string, string]; className?: string }) {
  return (
    <span className={className}>
      <span className="text-ink">{words[0]}</span>
      <span className="text-seam">{words[1]}</span>
    </span>
  );
}
