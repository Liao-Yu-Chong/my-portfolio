'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { contact } from '@/lib/site-data';

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

/** New-tab attributes, but only for links that actually leave the page. */
export function externalAttrs(href: string, external?: boolean) {
  return external && /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  /** The page's one orange fill. Everything else is a printed outline. */
  primary?: boolean;
  small?: boolean;
  external?: boolean;
  className?: string;
};

/**
 * Studio's printed control: a 1px ink border with a second rule inset
 * inside it, and crop marks at the corners that open a little on hover.
 */
export function ButtonLink({ href, children, primary, small, external, className = '' }: ButtonLinkProps) {
  const classes = ['btn', 'crop', primary && 'btn--primary', small && 'btn--sm', className].filter(Boolean).join(' ');
  return (
    <a href={href} className={classes} {...externalAttrs(href, external)}>
      {children}
    </a>
  );
}
