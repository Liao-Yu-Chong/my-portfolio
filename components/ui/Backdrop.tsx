'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * The page's single background layer: a column ruling plus two distant
 * blooms, all fixed and drifting against the scroll.
 *
 * Everything in here is decorative and inert — the content scrolling over
 * it owns all of the contrast. The deltas are deliberately small: enough
 * that flat black gains depth, not enough to read as movement.
 */
export function Backdrop() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 1, 1, 0.3]);

  // The warm bloom starts behind the hero headline and sinks as you read.
  const emberY = useTransform(scrollYProgress, [0, 1], ['-6vh', '42vh']);
  const emberOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.85, 0.45, 0.25]);

  // The cold one is the opposite: absent at the top, rising into the work
  // and contact sections so the lower half is not just a darker copy.
  const signalY = useTransform(scrollYProgress, [0, 1], ['92vh', '22vh']);
  const signalOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0.16, 0.3]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reduced ? { opacity: 0.6 } : { y: gridY, opacity: gridOpacity }}
      >
        <div className="rule-grid" />
      </motion.div>

      <motion.div
        className="absolute left-1/2 h-[46rem] w-[64rem] max-w-[160vw] -translate-x-1/2"
        style={
          reduced
            ? { top: '6vh', opacity: 0.5 }
            : { top: 0, y: emberY, opacity: emberOpacity }
        }
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--color-ember) 15%, transparent), transparent 70%)',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute left-[62%] h-[38rem] w-[46rem] max-w-[140vw] -translate-x-1/2"
        style={
          reduced ? { top: '60vh', opacity: 0.2 } : { top: 0, y: signalY, opacity: signalOpacity }
        }
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--color-signal) 13%, transparent), transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
}
