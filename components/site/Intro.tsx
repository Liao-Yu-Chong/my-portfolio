import type { ReactNode } from 'react';
import { intro, profile } from '@/lib/site-data';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Sets every highlight term found in the text in full ink, a step heavier. */
function highlight(text: string, terms: readonly string[]): ReactNode[] {
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');

  return text.split(pattern).map((chunk, i) =>
    terms.includes(chunk) ? <strong key={i}>{chunk}</strong> : <span key={i}>{chunk}</span>,
  );
}

const facts = [
  { k: 'Role', v: profile.role },
  { k: 'Company', v: profile.company },
  { k: 'Base', v: `${profile.location}，可遠端` },
  { k: 'Status', v: profile.availabilityLabel },
];

/**
 * Where it is: who, what now, where. The first paragraph is the section's
 * thesis and leads at the larger size; the facts sit beside it as a set.
 */
export function Intro() {
  return (
    <section id="intro" className="section" aria-labelledby="intro-title">
      <div className="container">
        <SectionHeader id="intro-title" title="Right now" lead="我是誰、現在在做什麼、什麼時候找得到我。" />

        <div className="grid-12">
          <div className="now__text">
            {intro.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'lead' : undefined}>
                {highlight(p, intro.highlights)}
              </p>
            ))}
          </div>

          <dl className="facts set">
            {facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
