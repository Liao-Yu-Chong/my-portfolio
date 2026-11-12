'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Guide = { key: string; label: string; units: number; y: number; labelY: number };

/** Minimum gap between two readouts, so close metrics (ascender and cap
    height sit ~8px apart at 84px) don't print over each other. */
const READOUT_GAP = 16;
type Measure = { left: number; width: number; char: string; units: number } | null;

/** Size the canvas measures at: 1000px, so every reading is in units of 1000. */
const EM = 1000;

/**
 * The signature: the headline, under construction. Orange guides sit at the
 * face's real ascender, cap height, x-height, baseline and descender on the
 * first line, each with its reading — measured from the loaded font in the
 * browser, so they are always true to it. Point at a letter and its advance
 * is measured too. The guides are decoration (aria-hidden); the heading is
 * plain text, and without script it is simply the heading.
 */
export function HeroHeadline({ text }: { text: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [measure, setMeasure] = useState<Measure>(null);

  const layout = useCallback(() => {
    const box = boxRef.current;
    const head = headRef.current;
    const probe = probeRef.current;
    if (!box || !head || !probe) return;

    const style = getComputedStyle(head);
    const size = parseFloat(style.fontSize);
    const ctx = ctxRef.current ?? document.createElement('canvas').getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;
    ctx.font = `${style.fontWeight} ${EM}px ${style.fontFamily}`;

    const up = (s: string) => Math.max(...[...s].map((c) => ctx.measureText(c).actualBoundingBoxAscent));
    const down = (s: string) => Math.max(...[...s].map((c) => ctx.measureText(c).actualBoundingBoxDescent));
    // Overshoot is real: round glyphs (o, x) sit a little past the flat
    // ones, so measure flat letters for the heights.
    const cap = Math.round(up('HEI'));
    const xh = Math.round(up('xvz'));
    const asc = Math.round(up('dhkl'));
    const desc = Math.round(down('pq'));

    const baseline = probe.getBoundingClientRect().bottom - box.getBoundingClientRect().top;
    const at = (units: number) => baseline - (units / EM) * size;

    const lines = [
      { key: 'asc', label: '上伸線', units: asc, y: at(asc) },
      { key: 'cap', label: '大寫高度', units: cap, y: at(cap) },
      { key: 'x', label: 'x 高度', units: xh, y: at(xh) },
      { key: 'base', label: '基線', units: 0, y: baseline },
      { key: 'desc', label: '下伸線', units: -desc, y: at(-desc) },
    ];
    // Readouts sit in the right margin at their line's height, pushed apart
    // downwards where two lines are too close to label separately.
    let floor = -Infinity;
    setGuides(
      lines.map((l) => {
        const labelY = Math.max(l.y, floor + READOUT_GAP);
        floor = labelY;
        return { ...l, labelY };
      }),
    );
  }, []);

  useEffect(() => {
    let alive = true;
    void document.fonts.ready.then(() => alive && layout());
    const ro = new ResizeObserver(() => layout());
    if (boxRef.current) ro.observe(boxRef.current);
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [layout]);

  const onPointerMove = (event: React.PointerEvent<HTMLHeadingElement>) => {
    if (event.pointerType !== 'mouse') return;
    const box = boxRef.current;
    const ctx = ctxRef.current;
    if (!box || !ctx) return;

    // The character under the pointer.
    let node: Node | null = null;
    let offset = 0;
    const doc = document as Document & {
      caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    };
    const pos = doc.caretPositionFromPoint?.(event.clientX, event.clientY);
    if (pos) {
      node = pos.offsetNode;
      offset = pos.offset;
    } else {
      const range = document.caretRangeFromPoint?.(event.clientX, event.clientY);
      if (range) {
        node = range.startContainer;
        offset = range.startOffset;
      }
    }
    if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent) return setMeasure(null);

    // The caret lands between letters; take whichever neighbour the pointer is over.
    const content = node.textContent;
    const pick = (i: number) => {
      if (i < 0 || i >= content.length) return null;
      const r = document.createRange();
      r.setStart(node, i);
      r.setEnd(node, i + 1);
      const rect = r.getBoundingClientRect();
      return event.clientX >= rect.left && event.clientX <= rect.right ? { i, rect } : null;
    };
    const hit = pick(offset) ?? pick(offset - 1);
    if (!hit || !content[hit.i].trim()) return setMeasure(null);

    const char = content[hit.i];
    const boxLeft = box.getBoundingClientRect().left;
    setMeasure({
      left: hit.rect.left - boxLeft,
      width: hit.rect.width,
      char,
      units: Math.round(ctx.measureText(char).width),
    });
  };

  return (
    <div ref={boxRef} className="hero__head">
      <h1 id="hero-title" ref={headRef} onPointerMove={onPointerMove} onPointerLeave={() => setMeasure(null)}>
        <span ref={probeRef} className="hero__probe" aria-hidden="true" />
        {text}
      </h1>

      <div className="guides" aria-hidden="true">
        {guides.map((g, i) => (
          <div key={g.key} className="guide" style={{ top: g.y, '--i': i } as React.CSSProperties} />
        ))}
        {guides.map((g, i) => (
          <span
            key={`${g.key}-readout`}
            className="guide__readout"
            style={{ top: g.labelY, '--i': i } as React.CSSProperties}
          >
            {g.label} {g.units}
          </span>
        ))}
        <div
          className={`measure${measure ? ' is-on' : ''}`}
          style={measure ? { left: measure.left, width: measure.width } : undefined}
        >
          {measure ? (
            <span className="measure__readout">
              {measure.char} 寬 {measure.units}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
