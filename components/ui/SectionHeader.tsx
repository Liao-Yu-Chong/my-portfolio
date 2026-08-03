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
   */
  railActive: number;
};

export function SectionHeader({ eyebrow, title, caption, railActive }: Props) {
  return (
    <div className="mb-14 md:mb-20">
      <MarbleRail count={4} active={railActive} className="mb-10" />

      <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="label mb-4 text-ember">{eyebrow}</p>
          {/* min is 1.75rem, not 2.5 — "SelectedWork" is a single unbreakable
              token at 9.55em and would run past the gutter on a 375px phone */}
          <h2 className="display text-[clamp(1.75rem,7vw,5.25rem)]">
            <Compound words={title} />
          </h2>
        </div>
        {caption ? (
          <p className="max-w-xs text-sm leading-relaxed text-ink-2 md:text-right">{caption}</p>
        ) : null}
      </Reveal>
    </div>
  );
}
