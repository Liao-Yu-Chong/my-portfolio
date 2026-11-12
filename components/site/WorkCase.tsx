'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/site-data';
import { asset } from '@/lib/asset';
import { ButtonLink } from '@/components/ui/Cta';

/**
 * One project opened as a case, as a sticky diptych: the project holds still
 * on the left while its captures scroll past on the right. The pane follows
 * along — the caption of the capture in view is marked with an orange rule —
 * and the links come forward when the last capture arrives. The scroll is
 * the motion; nothing fades in. Without script the links are simply there.
 */
export function WorkCase({ project }: { project: Project }) {
  const captures = project.captures ?? [];
  const [current, setCurrent] = useState(-1);
  const shotsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = shotsRef.current?.querySelectorAll<HTMLElement>('[data-capture]');
    if (!items?.length) return;
    // A capture counts as "in view" when it crosses the middle of the screen.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(Number((e.target as HTMLElement).dataset.capture));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const reachedEnd = current === captures.length - 1;

  return (
    <div className="grid-12 case">
      <div className="case__pane">
        <h3>{project.name}</h3>
        <p className="case__meta label">
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </p>
        <p className="case__desc">{project.description}</p>
        <ul className="tags" aria-label="使用技術">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {/* A visual mirror of the scroll position; the captions themselves
            are read once, from each figure. */}
        <ol className="case__steps" aria-hidden="true">
          {captures.map((c, i) => (
            <li key={c.src} className={i === current ? 'is-current' : undefined}>
              {c.caption}
            </li>
          ))}
        </ol>

        <div className={`case__actions${reachedEnd ? ' is-shown' : ''}`}>
          {/* The accessible names carry the project ("Live Demo UI Gallery"),
              so a list of links doesn't show the same name twice. */}
          {project.live ? (
            <ButtonLink href={project.live} external>
              Live Demo<span className="visually-hidden"> {project.name}</span>
            </ButtonLink>
          ) : null}
          {project.github ? (
            <ButtonLink href={project.github} external>
              GitHub<span className="visually-hidden"> {project.name}</span>
            </ButtonLink>
          ) : null}
        </div>
      </div>

      <ol ref={shotsRef} className="case__shots" aria-label={`${project.name} 截圖`}>
        {captures.map((c, i) => (
          <li key={c.src} data-capture={i}>
            <figure className="sheet">
              <div className="sheet__frame crop">
                {/* The figcaption describes the capture and names the figure,
                    so the alt stays empty rather than reading it twice. */}
                <img
                  src={asset(c.src)}
                  alt=""
                  width={c.width}
                  height={c.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span>{c.caption}</span>
                <span className="sheet__ratio">
                  {c.width} × {c.height}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  );
}
