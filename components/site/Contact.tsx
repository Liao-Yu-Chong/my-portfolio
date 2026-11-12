'use client';

import type { CSSProperties } from 'react';
import { contact } from '@/lib/site-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonLink, externalAttrs, useEmailLinks } from '@/components/ui/Cta';
import { RevealObserver } from '@/components/ui/Reveal';

/** --i for the reveal's stagger. */
const at = (i: number) => ({ '--i': i }) as CSSProperties;

/**
 * Contact, set as a letter: the statement, why to write, then the ways to
 * reach me as a set of rows. Its lines are the page's one reveal.
 */
export function Contact() {
  const { address, composeUrl } = useEmailLinks();

  const rows = [
    { label: 'Email', value: address || '載入中…', href: address ? composeUrl : undefined },
    { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/-/g, '')}` },
    ...contact.socials.map((s) => ({ label: s.label, value: s.handle, href: s.href })),
  ];

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <RevealObserver />
      <div className="container">
        <SectionHeader id="contact-title" title="Say hello" lead="職缺、專案合作，或只是想聊聊前端，都歡迎。" />

        <div className="grid-12 letter">
          <div className="letter__body">
            <p className="letter__statement" data-reveal style={at(0)}>
              一起做點好東西吧。
            </p>
            <p data-reveal style={at(1)}>
              如果你正在找一位重視介面細節與程式架構的前端工程師，寫封信給我吧：職缺、專案合作，或只是想聊聊前端都可以。
            </p>
            <div data-reveal style={at(2)}>
              <ButtonLink href={composeUrl} external>
                寄信給我
              </ButtonLink>
            </div>
          </div>

          <ul className="contacts set">
            {rows.map((row, i) => (
              <li key={row.label} data-reveal style={at(i + 3)}>
                {row.href ? (
                  <a href={row.href} {...externalAttrs(row.href, true)}>
                    <span className="label">{row.label}</span>
                    <span className="contacts__value">{row.value}</span>
                  </a>
                ) : (
                  <div className="contacts__row">
                    <span className="label">{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
