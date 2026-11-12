'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
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

/**
 * Opens Gmail's compose view with the address already in the To field,
 * rather than a mailto: that hands off to whatever client Windows has
 * registered (usually Outlook).
 */
export function useEmailLinks() {
  const address = useEmailAddress();
  // Until the address is assembled (server HTML, or a click before
  // hydration) the link points at the contact section instead of '#', which
  // with target=_blank opened a second copy of the page.
  const composeUrl = address
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}`
    : '#contact';
  return { address, composeUrl };
}

// The primary skin carries a transparent border: invisible normally, but in
// Forced Colors (Windows High Contrast) the ember fill is replaced and the
// border is repainted in a system colour, so the button keeps its outline.
const PRIMARY_SKIN = 'border border-transparent bg-ember text-void hover:bg-ember-soft';
const GHOST_SKIN = 'border border-edge-2 text-ink hover:border-ember hover:text-ember';

/** New-tab attributes, but only for links that actually leave the page. */
function externalAttrs(href: string, external?: boolean) {
  return external && /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
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

  // pointer-coarse:min-h-11 — 44px on touch screens. The header instance
  // overrides the padding down to py-2, which left it at 42px.
  const base =
    'group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-normal transition-colors duration-200 pointer-coarse:min-h-11';
  const skin = variant === 'primary' ? PRIMARY_SKIN : GHOST_SKIN;

  return (
    <motion.a
      href={href}
      className={`${base} ${skin} ${className}`}
      {...externalAttrs(href, external)}
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.98 }}
      transition={spring}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="font-mono transition-transform duration-300 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </motion.a>
  );
}

type IconCtaProps = {
  href: string;
  /** the accessible name — there is no visible text to fall back on */
  label: string;
  icon: ReactNode;
  variant?: 'primary' | 'ghost';
  external?: boolean;
  className?: string;
};

/** Circular icon-only action. 48px keeps it above the minimum touch target. */
export function IconCta({
  href,
  label,
  icon,
  variant = 'primary',
  external,
  className = '',
}: IconCtaProps) {
  const reduced = useReducedMotion();

  const skin = variant === 'primary' ? PRIMARY_SKIN : GHOST_SKIN;

  // The highlight has to contrast with what it sweeps across: pale on the
  // ember fill, ember on the dark outlined button.
  const glint = variant === 'primary' ? 'var(--color-ink)' : 'var(--color-ember)';

  return (
    <motion.a
      href={href}
      // aria-label only — no `title`: it duplicated the name and a title
      // tooltip can't be reached from the keyboard.
      aria-label={label}
      style={{ '--glint': glint } as CSSProperties}
      className={`glint inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 ${skin} ${className}`}
      {...externalAttrs(href, external)}
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.96 }}
      transition={spring}
    >
      {icon}
    </motion.a>
  );
}
