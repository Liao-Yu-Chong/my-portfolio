import type { ReactNode } from 'react';
import { intro, profile } from '@/lib/site-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

/** Wraps every highlight term found in the text with an ink-bright span. */
function highlight(text: string, terms: readonly string[]): ReactNode[] {
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');

  return text.split(pattern).map((chunk, i) =>
    terms.includes(chunk) ? (
      <strong key={i} className="font-medium text-ink">
        {chunk}
      </strong>
    ) : (
      <span key={i}>{chunk}</span>
    ),
  );
}

const facts = [
  { k: 'Role', v: profile.role },
  { k: 'Company', v: profile.company },
  { k: 'Base', v: `${profile.location} · 可遠端` },
  { k: 'Status', v: profile.availabilityLabel, hot: true },
];

export function Intro() {
  return (
    <section id="intro" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        eyebrow="intro$"
        title={['Right', 'Now']}
        caption="我是誰、現在在做什麼、什麼時候找得到我。"
        railActive={0}
      />

      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          {intro.paragraphs.map((p, i) =>
            /* The opening paragraph is the section's thesis, so it is set as a
               pull quote — brighter ink, larger measure, ember rule down the
               left. The rest fall back to body copy. */
            i === 0 ? (
              <Reveal key={i} className="mb-9 border-l-2 border-ember pl-6 md:pl-8">
                <p className="lede text-[clamp(1.25rem,2.5vw,1.8rem)] text-ink">
                  {highlight(p, intro.highlights)}
                </p>
              </Reveal>
            ) : (
              <Reveal
                key={i}
                delay={i * 0.08}
                className="mb-6 text-base leading-[1.9] text-ink-2 last:mb-0"
              >
                <p>{highlight(p, intro.highlights)}</p>
              </Reveal>
            ),
          )}
        </div>

        <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
          <dl className="border-t border-edge">
            {facts.map((f) => (
              <div
                key={f.k}
                className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-edge py-4 transition-colors duration-300 hover:border-edge-2"
              >
                <dt className="label text-ink-3">{f.k}</dt>
                <dd className={`text-sm ${f.hot ? 'text-signal' : 'text-ink'}`}>{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
