import type { Transition, Variants } from 'framer-motion';

/** One easing curve for the whole site — a soft, confident deceleration. */
export const ease = [0.16, 1, 0.3, 1] as const;

export const spring: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
  mass: 0.6,
};

/** Fade + lift. The default entrance for anything that scrolls into view. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

/** Parent that staggers its children's `rise`. */
export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
});

/** Headline lines wipe up from behind a mask. */
export const wipeUp: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.9, ease },
  },
};

/** Shared viewport config so every section triggers at the same point. */
export const inView = { once: true, amount: 0.2 } as const;
