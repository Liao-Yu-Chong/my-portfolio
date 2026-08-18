'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { skillGroups } from '@/lib/site-data';
import { Compound } from '@/components/ui/Compound';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { ease, inView } from '@/lib/motion';

/**
 * Rows, not columns. Three equal boxes sat next to the project grid and read
 * as more cards; laid out as an index — heading left, the list running out to
 * the right margin — the section gets its own shape and the tags stop being
 * squeezed into a 165px measure.
 */
export function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="stack" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        eyebrow="stack$"
        title={['The', 'Stack']}
        caption="分成三欄：每天在寫的、負責串接的、拿來組介面的。"
        railActive={1}
      />

      <div className="border-t border-edge">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.head.join('')} delay={gi * 0.08}>
            <div className="group grid gap-5 border-b border-edge py-9 transition-colors duration-300 hover:border-edge-2 md:grid-cols-12 md:gap-8 md:py-11">
              <div className="md:col-span-4">
                <h3 className="display-tight text-[clamp(1.5rem,2.6vw,2.1rem)]">
                  <Compound words={group.head} />
                </h3>
                <p className="label mt-3 flex items-center gap-3 text-ink-3">
                  <span aria-hidden="true" className="block h-px w-5 bg-edge-2" />
                  {group.caption}
                </p>
              </div>

              <motion.ul
                className="flex flex-wrap content-start gap-2 md:col-span-8"
                initial="hidden"
                whileInView="show"
                viewport={inView}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: reduced ? {} : { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                    }}
                    className="rounded-full border border-edge px-3.5 py-1.5 font-mono text-xs text-ink-2 transition-colors duration-200 hover:border-ember/60 hover:text-ink"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
