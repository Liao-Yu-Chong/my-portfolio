'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { skillGroups } from '@/lib/site-data';
import { Compound } from '@/components/ui/Compound';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { ease, inView } from '@/lib/motion';

export function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="stack" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        eyebrow="stack$"
        title={['The', 'Stack']}
        caption="分成三欄：每天在寫的、負責串接的、拿來組介面的。"
        railActive={2}
      />

      {/* three across only from lg — at md each cell is 165px wide and
          "FrontendTools" does not fit */}
      <div className="grid gap-px border border-edge bg-edge lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.head.join('')} delay={gi * 0.1} className="bg-void">
            <div className="flex h-full flex-col p-7 md:p-8">
              <h3 className="display-tight text-[clamp(1.5rem,2.6vw,2.1rem)]">
                <Compound words={group.head} />
              </h3>
              <p className="label mt-3 mb-7 text-ink-3">{group.caption}</p>

              <motion.ul
                className="flex flex-wrap gap-2"
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
                    className="rounded-full border border-edge px-3 py-1.5 font-mono text-xs text-ink-2 transition-colors duration-200 hover:border-ember/60 hover:text-ink"
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
