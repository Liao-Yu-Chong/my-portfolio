'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navSections, profile } from '@/lib/site-data';
import { Cta, useBookACall } from '@/components/ui/Cta';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const book = useBookACall();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section the reader is in so the nav rail can point at it.
  useEffect(() => {
    const targets = navSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-edge bg-void/75 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ember" />
          </span>
          <span className="label text-ink">{profile.nameEn}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navSections.map((section) => {
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`relative px-3 py-2 font-mono text-xs transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-ink-3 hover:text-ink-2'
                }`}
              >
                {section.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-marble"
                    className="absolute -bottom-0.5 left-1/2 block h-1 w-1 -translate-x-1/2 rounded-full bg-ember"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                ) : null}
              </a>
            );
          })}
        </div>

        <Cta
          href={book.href}
          external={book.external}
          variant="ghost"
          className="px-4 py-2 text-xs"
        >
          Book a Call
        </Cta>
      </nav>
    </header>
  );
}
