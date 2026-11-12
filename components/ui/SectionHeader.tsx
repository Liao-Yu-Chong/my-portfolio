import { Compound } from './Compound';
import { MarbleRail } from './MarbleRail';
import { Reveal } from './Reveal';

type Props = {
  /** observable-style label, e.g. "work$" */
  eyebrow: string;
  /** compound heading, rendered with no space between the two words */
  title: [string, string];
  caption?: string;
  /**
   * The section's 0-based position in navSections. One marble per section,
   * so the rail shows where in the stream you are — keep these in sync.
   * Also drives the printed index number.
   */
  railActive: number;
};

/**
 * Every section opens the same way: a horizon, an indexed eyebrow, the
 * compound heading, then the rail underneath it. The rail sits below the
 * heading rather than above it so it reads as the heading's baseline —
 * above, it was competing with the section that had just ended.
 */
export function SectionHeader({ eyebrow, title, caption, railActive }: Props) {
  // The heading drifts slowly sideways across the whole time this header is
  // on screen: two rem total, so it never leaves its column, it just refuses
  // to sit perfectly still. `section-head` carries the view timeline and
  // `section-drift` runs on it (globals.css) — no scroll JS.
  return (
    <div className="section-head mb-14 md:mb-20">
      <div className="horizon mb-12" />

      <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="label mb-5 flex items-center gap-3 text-ember">
            <span className="text-ink-3">{String(railActive + 1).padStart(2, '0')}</span>
            <span aria-hidden="true" className="block h-px w-7 bg-edge-2" />
            {eyebrow}
          </p>
          {/* Max is 2.5× the min so browser zoom can still take the text to
              200% (vw doesn't grow with zoom; rem does). Compound breaks at
              the seam, so the 2.1rem min only has to fit "Selected" — at 320px
              "SelectedWork" (≈9.55em) wraps; from 375px up it holds one line,
              since 0.75rem + 6vw stays under (100vw − gutters) / 9.55. */}
          <h2 className="section-drift display text-[clamp(2.1rem,0.75rem_+_6vw,5.25rem)]">
            <Compound words={title} />
          </h2>
        </div>
        {caption ? (
          // A one-to-two-line caption is headline-like, so it keeps balance —
          // spelled out rather than via .lede, which is now `pretty`.
          <p className="max-w-xs text-sm leading-[1.62] font-normal tracking-normal text-balance text-ink-2 md:text-right">
            {caption}
          </p>
        ) : null}
      </Reveal>

      <MarbleRail count={4} active={railActive} className="mt-9" />
    </div>
  );
}
