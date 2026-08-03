'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { contact, profile } from '@/lib/site-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Cta, useBookACall, useEmailAddress } from '@/components/ui/Cta';
import { MarbleRail } from '@/components/ui/MarbleRail';
import { NowListening } from '@/components/site/NowListening';

export function Contact() {
  const email = useEmailAddress();
  const book = useBookACall();

  const rows = [
    { label: 'Email', value: email || '載入中…', href: email ? `mailto:${email}` : undefined },
    { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/-/g, '')}` },
    ...contact.socials.map((s) => ({ label: s.label, value: s.handle, href: s.href })),
  ];

  return (
    <section id="contact" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        eyebrow="contact$"
        title={['Say', 'Hello']}
        caption="職缺、專案合作，或只是想聊聊前端 —— 都歡迎。"
        railActive={3}
      />

      <div className="grid gap-14 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-6">
          <p className="display-tight text-[clamp(1.9rem,4.6vw,3.4rem)] text-ink">
            一起做點
            <br />
            <span className="text-ember">好東西</span>吧。
          </p>
          <p className="mt-7 max-w-md text-base leading-[1.9] text-ink-2">
            如果你正在找一位重視介面細節與程式架構的前端工程師，寫信給我，或直接挑個時間聊 30 分鐘。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Cta href={book.href} external={book.external}>
              Book a Call
            </Cta>
            <Cta href={email ? `mailto:${email}` : '#'} variant="ghost">
              寄信給我
            </Cta>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="md:col-span-5 md:col-start-8">
          <ul className="border-t border-edge">
            {rows.map((row) => (
              <ContactRow key={row.label} {...row} />
            ))}
          </ul>
        </Reveal>
      </div>

      <footer className="mt-24 md:mt-32">
        <MarbleRail count={4} active={3} className="mb-8" />
        <NowListening />
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-5 font-mono text-[11px] text-ink-3">
          <span>
            © {new Date().getFullYear()} {profile.name} {profile.nameEn}
          </span>
          <span>Next.js · TypeScript · Tailwind CSS · Framer Motion</span>
        </div>
      </footer>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const reduced = useReducedMotion();

  const inner = (
    <motion.div
      className="flex items-center justify-between gap-6 border-b border-edge py-5"
      whileHover={reduced || !href ? undefined : { paddingLeft: 10 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    >
      <span className="label text-ink-3">{label}</span>
      <span className="truncate text-sm text-ink transition-colors duration-200 group-hover:text-ember">
        {value}
        {href ? <span className="ml-2 font-mono text-ink-3">↗</span> : null}
      </span>
    </motion.div>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="group block"
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}
