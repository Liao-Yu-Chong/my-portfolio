'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ease } from '@/lib/motion';

type Props = {
  /** how many emissions sit on the rail */
  count?: number;
  /** which one is "hot" — gets the ember fill and a halo */
  active?: number;
  className?: string;
};

/**
 * A marble diagram — the RxJs notation for values emitted over time.
 * It runs under the hero and between every section, so scrolling the page
 * reads as consuming a stream. This is the site's signature device.
 */
export function MarbleRail({ count = 6, active = 1, className = '' }: Props) {
  const reduced = useReducedMotion();
  const marbles = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`relative h-3 w-full ${className}`} aria-hidden="true">
      {/* the timeline */}
      <motion.span
        className="absolute top-1/2 left-0 block h-px w-full origin-left bg-edge"
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
      />

      {/* the emissions */}
      {marbles.map((i) => {
        const isActive = i === active;
        const left = count === 1 ? 0 : (i / (count - 1)) * 100;

        return (
          <motion.span
            key={i}
            className="absolute top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${left}%`,
              width: isActive ? 9 : 5,
              height: isActive ? 9 : 5,
              background: isActive ? 'var(--color-ember)' : 'var(--color-edge-2)',
              boxShadow: isActive ? '0 0 14px color-mix(in srgb, var(--color-ember) 55%, transparent)' : undefined,
            }}
            initial={reduced ? undefined : { scale: 0, opacity: 0 }}
            whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease, delay: 0.25 + i * 0.075 }}
          />
        );
      })}
    </div>
  );
}
