'use client';

import { useEffect } from 'react';

/**
 * Starts the page's one reveal: every [data-reveal] element gets .is-in as
 * it scrolls into view (globals.css staggers them by --i). The elements are
 * visible without script — the hidden start state only applies under the
 * .js class the boot script sets — and under reduced motion they are simply
 * there. Render once, anywhere on the page.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
