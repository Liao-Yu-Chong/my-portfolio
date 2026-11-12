'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { navSections, profile } from '@/lib/site-data';
import { Cta, useEmailLinks } from '@/components/ui/Cta';

/** Matches Tailwind's `lg` — the point where the four links fit inline. */
const WIDE_QUERY = '(width >= 64rem)';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  // Collapsed is the default so the server HTML (and a no-JS visit) gets a
  // working popover menu; globals.css lays the same list out inline at lg
  // before hydration, so wide screens never see the button flash.
  const [wide, setWide] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const { composeUrl } = useEmailLinks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Popover is Baseline but still young — only pull the polyfill in for
  // browsers that lack it.
  useEffect(() => {
    if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
      void import('@oddbird/popover-polyfill');
    }
  }, []);

  // One list, two layouts: a popover when narrow, plain inline links when
  // wide. The popover attribute is dropped in the wide layout so the links
  // are not exposed as a hidden popover there.
  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
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

  // In-page anchors don't light-dismiss the popover on their own.
  const closeMenu = () => {
    const menu = menuRef.current;
    // :is() is forgiving, so browsers without :popover-open (polyfilled)
    // don't throw on the unknown pseudo-class.
    if (!wide && menu?.matches(':is(:popover-open, .\\:popover-open)')) menu.hidePopover();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-edge bg-void/75 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-3 md:h-20">
        {/* min-h: the label alone is 20px tall — 24px everywhere (WCAG
            2.5.8), 44px on touch screens. */}
        <a href="#top" className="flex min-h-6 items-center gap-2.5 pointer-coarse:min-h-11">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ember" />
          </span>
          <span className="label text-ink">{profile.nameEn}</span>
        </a>

        <nav className="ml-auto lg:ml-0" aria-label="主要">
          <button
            type="button"
            popoverTarget="site-menu"
            aria-controls="site-menu"
            className="label inline-flex items-center rounded-full border border-edge-2 px-4 py-2 text-ink-2 transition-colors duration-200 hover:border-ember hover:text-ember pointer-coarse:min-h-11 lg:hidden"
          >
            選單
          </button>

          <ul
            ref={menuRef}
            id="site-menu"
            className="site-menu"
            {...(wide ? {} : { popover: 'auto' as const })}
          >
            {navSections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={closeMenu}
                    className={`relative block py-3 pr-4 pl-7 font-mono text-sm transition-colors duration-200 lg:px-3 lg:py-2 lg:text-xs ${
                      isActive ? 'text-ink' : 'text-ink-3 hover:text-ink-2'
                    }`}
                  >
                    {section.label}
                    {/* The dot is the non-colour cue for the current section:
                        left of the label in the menu, under it inline. */}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-marble"
                        aria-hidden="true"
                        className="absolute top-1/2 left-3 block h-1 w-1 -translate-y-1/2 rounded-full bg-ember lg:top-auto lg:-bottom-0.5 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <Cta href={composeUrl} external variant="ghost" className="px-4 py-2 text-xs">
          寄信給我
        </Cta>
      </div>

      {/* Sits on the header's own bottom border, so it reads as that line
          filling in rather than as a second rule stacked under it. Its
          length is a CSS scroll timeline (scroll-progress in globals.css);
          only the fade-in once you've scrolled is driven from here. */}
      <div
        aria-hidden="true"
        className={`scroll-progress absolute inset-x-0 -bottom-px h-px origin-left bg-ember transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </header>
  );
}
