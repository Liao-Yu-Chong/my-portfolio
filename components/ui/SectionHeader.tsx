'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // A slow horizontal drift across the whole time the header is on screen.
  // Two rem total — the heading never leaves its column, it just refuses to
  // sit perfectly still.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], ['-1rem', '1rem']);

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <div className="horizon mb-12" />

      <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="label mb-5 flex items-center gap-3 text-ember">
            <span className="text-ink-3">{String(railActive + 1).padStart(2, '0')}</span>
            <span aria-hidden="true" className="block h-px w-7 bg-edge-2" />
            {eyebrow}
          </p>
          {/* min is 1.75rem, not 2.5 — "SelectedWork" is a single unbreakable
              token at 9.55em and would run past the gutter on a 375px phone */}
          <motion.h2
            className="display text-[clamp(1.75rem,7vw,5.25rem)]"
            style={reduced ? undefined : { x: drift }}
          >
            <Compound words={title} />
          </motion.h2>
        </div>
        {caption ? (
          <p className="lede max-w-xs text-sm text-ink-2 md:text-right">{caption}</p>
        ) : null}
      </Reveal>

      <MarbleRail count={4} active={railActive} className="mt-9" />
    </div>
  );
}
