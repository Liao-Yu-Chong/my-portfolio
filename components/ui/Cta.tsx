'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { contact } from '@/lib/site-data';
import { spring } from '@/lib/motion';

/**
 * The address is assembled after mount so it never sits as plain text in the
 * exported HTML. Returns '' on the server pass.
 */
export function useEmailAddress() {
  const [address, setAddress] = useState('');
  useEffect(() => {
    setAddress(`${contact.emailUser}@${contact.emailDomain}`);
  }, []);
  return address;
}

/** Book a Call, falling back to a pre-filled email when no scheduler is set. */
export function useBookACall() {
  const email = useEmailAddress();
  if (contact.bookACallUrl) {
    return { href: contact.bookACallUrl, external: true };
  }
  return {
    href: email ? `mailto:${email}?subject=${encodeURIComponent('想跟你約個時間聊聊')}` : '#',
    external: false,
  };
}

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  external?: boolean;
  className?: string;
};

export function Cta({ href, children, variant = 'primary', external, className = '' }: CtaProps) {
  const reduced = useReducedMotion();

  const base =
    'group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-normal transition-colors duration-200';
  const skin =
    variant === 'primary'
      ? 'bg-ember text-void hover:bg-ember-soft'
      : 'border border-edge-2 text-ink hover:border-ember hover:text-ember';

  return (
    <motion.a
      href={href}
      className={`${base} ${skin} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.98 }}
      transition={spring}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="font-mono transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </motion.a>
  );
}
