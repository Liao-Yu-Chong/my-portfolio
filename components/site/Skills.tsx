'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { skillGroups } from '@/lib/site-data';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** How long each card stays current while the set turns on its own. */
const ROTATE_MS = 5000;

/**
 * The stack as Studio's specimen cards: three crop-marked cards, one per
 * group, that switch one board. While the section is on screen the set turns
 * every few seconds; it stops for good on any choice, holds while pointed at
 * or focused, never runs under reduced motion, and has a visible pause.
 * Without script every board shows, in order.
 */
export function Skills() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [seen, setSeen] = useState(false);
  const [held, setHeld] = useState(false); // paused by the visitor or by a choice
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      mq.removeEventListener('change', sync);
      io.disconnect();
    };
  }, []);

  const running = mounted && seen && !held && !hover && !focus && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % skillGroups.length), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  const choose = (i: number) => {
    setActive(i);
    setHeld(true);
  };

  // Arrow keys move between the cards, as a tab list should.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = skillGroups.length;
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + n) % n;
    choose(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeader id="stack-title" title="The stack" lead="分成三欄：每天在用的、負責串接的、拿來組介面的。" />

        <div
          ref={rootRef}
          className={`grid-12 stack${running ? ' is-running' : ''}`}
          style={{ '--rotate-ms': `${ROTATE_MS}ms` } as CSSProperties}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false);
          }}
        >
          <div className="board crop">
            {skillGroups.map((g, gi) => (
              <div
                key={g.head.join(' ')}
                role="tabpanel"
                id={`stack-panel-${gi}`}
                aria-labelledby={`stack-tab-${gi}`}
                // Every board shows until script runs; then only the current one.
                hidden={mounted && gi !== active}
              >
                <p className="board__caption label">
                  {g.head.join(' ')}，{g.caption}
                </p>
                <ul className="board__items">
                  {g.items.map((item, i) => (
                    <li key={item} style={{ '--i': i } as CSSProperties}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="specimens">
            <div role="tablist" aria-label="技術分類" aria-orientation="vertical" onKeyDown={onKeyDown} className="specimens__list">
              {skillGroups.map((g, gi) => (
                <button
                  key={g.head.join(' ')}
                  ref={(el) => {
                    tabsRef.current[gi] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`stack-tab-${gi}`}
                  aria-controls={`stack-panel-${gi}`}
                  aria-selected={gi === active}
                  tabIndex={gi === active ? 0 : -1}
                  className="specimen crop"
                  onClick={() => choose(gi)}
                >
                  <span className="specimen__face">{g.head.join(' ')}</span>
                  <span className="label">{g.caption}</span>
                  <span className="specimen__sample">
                    {g.items.slice(0, 3).join('、')} 等 {g.items.length} 項
                  </span>
                  <span className="specimen__timer" aria-hidden="true" />
                </button>
              ))}
            </div>
            <button type="button" className="btn btn--sm stack__pause" onClick={() => setHeld((h) => !h)}>
              {held ? '繼續輪播' : '暫停輪播'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
