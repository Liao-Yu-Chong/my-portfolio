'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Testimonial } from '@/lib/site-data';
import { testimonials } from '@/lib/site-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ease, inView } from '@/lib/motion';

export function Testimonials() {
  if (testimonials.length === 0) return null;

  const allPlaceholder = testimonials.every((t) => t.placeholder);

  return (
    <section id="voices" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        eyebrow="voices$"
        title={['Kind', 'Words']}
        caption={
          allPlaceholder
            ? '這區還在等真人說話 —— 三張卡片是待填模板。'
            : '一起工作過的人怎麼說。'
        }
        railActive={3}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <QuoteCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function QuoteCard({ item, index }: { item: Testimonial; index: number }) {
  const reduced = useReducedMotion();
  const isPlaceholder = Boolean(item.placeholder);

  return (
    <motion.figure
      className={`flex h-full flex-col p-7 md:p-8 ${
        isPlaceholder
          ? 'border border-dashed border-edge-2 bg-transparent'
          : 'border border-edge bg-panel'
      }`}
      initial={reduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.6, ease, delay: index * 0.09 }}
      whileHover={reduced || isPlaceholder ? undefined : { y: -6, borderColor: 'var(--color-edge-2)' }}
    >
      <span
        aria-hidden="true"
        className="display mb-4 text-4xl leading-none text-ember/40"
      >
        &ldquo;
      </span>

      <blockquote
        className={`mb-8 flex-1 text-sm leading-[1.9] ${
          isPlaceholder ? 'text-ink-3 italic' : 'text-ink-2'
        }`}
      >
        {item.quote}
      </blockquote>

      <figcaption className="border-t border-edge pt-5">
        <p className={`text-sm ${isPlaceholder ? 'text-ink-3' : 'text-ink'}`}>{item.name}</p>
        <p className="mt-1 font-mono text-[11px] text-ink-3">{item.title}</p>
      </figcaption>
    </motion.figure>
  );
}
