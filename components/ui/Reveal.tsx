'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease, inView } from '@/lib/motion';

type Props = {
  children: ReactNode;
  /** seconds */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'p';
};

/**
 * The site's one scroll entrance. Everything uses this so the page reads as a
 * single sequence rather than a pile of unrelated effects.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Tag>
  );
}
