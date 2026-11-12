'use client';

import { useEffect, useRef, useState } from 'react';
import { navSections, profile } from '@/lib/site-data';
import { ButtonLink, useEmailLinks } from '@/components/ui/Cta';
import { ModeToggle } from '@/components/ui/ModeToggle';

/** Matches the 60rem breakpoint in globals.css, where the four links fit inline. */
const WIDE_QUERY = '(width >= 60rem)';

/**
 * A masthead (the name set large and centred over a rule) that scrolls away,
 * then the bar under it that stays: the section links, the mode switch and
 * the one contact action.
 */
export function Nav() {
  const [active, setActive] = useState<string>('');
  // Collapsed is the default so the server HTML (and a no-JS visit) gets a
  // working popover menu; globals.css lays the same list out inline when
  // wide before hydration, so wide screens never see the button flash.
  const [wide, setWide] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const { composeUrl } = useEmailLinks();

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

  // Track which section the reader is in so the bar can point at it.
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
    <>
      <header className="masthead proof">
        <div className="container">
          <p className="masthead__name">
            <a href="#top">
              {profile.name} {profile.nameEn}
            </a>
          </p>
          <p className="masthead__role label">{profile.role}，{profile.location}</p>
        </div>
      </header>

      <nav className="bar" aria-label="主要">
        <div className="container bar__inner">
          <button
            type="button"
            popoverTarget="site-menu"
            aria-controls="site-menu"
            className="btn btn--sm bar__menu-button"
          >
            選單
          </button>

          <ul ref={menuRef} id="site-menu" className="site-menu" {...(wide ? {} : { popover: 'auto' as const })}>
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? 'true' : undefined}
                  onClick={closeMenu}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="bar__actions">
            <ModeToggle />
            <ButtonLink href={composeUrl} external small>
              寄信給我
            </ButtonLink>
          </div>
        </div>
      </nav>
    </>
  );
}
