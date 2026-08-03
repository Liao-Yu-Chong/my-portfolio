'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { profile } from '@/lib/site-data';
import { asset } from '@/lib/asset';
import { ease } from '@/lib/motion';
import { IconCta, useEmailLinks } from '@/components/ui/Cta';
import { GitHubIcon, MailIcon } from '@/components/ui/Icons';
import { contact } from '@/lib/site-data';
import { MarbleRail } from '@/components/ui/MarbleRail';

export function Hero() {
  const reduced = useReducedMotion();
  const { address, composeUrl } = useEmailLinks();
  const github = contact.socials.find((s) => s.label === 'GitHub');

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-between pt-24 pb-10">
      {/* one warm bloom behind the headline, nothing else */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] left-1/2 h-[38rem] w-[52rem] max-w-full -translate-x-1/2 opacity-70"
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in srgb, var(--color-ember) 16%, transparent), transparent 72%)',
        }}
      />

      {/* status line */}
      <div className="shell relative">
        <motion.div
          className="flex items-start justify-between gap-6 font-mono text-[11px] tracking-wider text-ink-3 md:text-xs"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="flex items-center gap-2.5">
            {profile.available ? (
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
            ) : null}
            {profile.availabilityLabel}
          </span>
          <span className="text-right leading-relaxed">
            {profile.location}
            <br />
            {profile.role}
          </span>
        </motion.div>
      </div>

      {/* the thesis */}
      <div className="shell relative py-[6vh]">
        <motion.p
          className="label mb-8 text-ember"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          {profile.nameEn} · {profile.name}
        </motion.p>

        {/* Sized so the longest line (19 chars) clears the gutter at every
            width — see the note on profile.headline before editing the copy. */}
        <h1 className="display text-[clamp(1.25rem,7vw,6rem)]">
          {profile.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.09em]">
              <motion.span
                className="flex items-center gap-[0.22em] whitespace-nowrap"
                initial={reduced ? undefined : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, ease, delay: 0.25 + i * 0.11 }}
              >
                {i === profile.avatarOnLine ? <AvatarChip /> : null}
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* actions + rail */}
      <div className="shell relative">
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-3"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
        >
          <IconCta
            href={composeUrl}
            label={address ? `寄信給我 · ${address}` : '寄信給我'}
            icon={<MailIcon />}
            external
          />
          {github ? (
            <IconCta
              href={github.href}
              label={`GitHub · ${github.handle}`}
              icon={<GitHubIcon />}
              variant="ghost"
              external
            />
          ) : null}
        </motion.div>

        <MarbleRail count={7} active={0} />

        <motion.p
          className="label mt-6 text-ink-3"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          往下滑 · scroll
        </motion.p>
      </div>
    </section>
  );
}

/** The photo sits inside the headline instead of beside it. */
function AvatarChip() {
  return (
    <span className="relative inline-block h-[0.95em] w-[0.95em] shrink-0 overflow-hidden rounded-full border border-ember/60 align-middle">
      <Image
        src={asset(profile.avatar)}
        alt={`${profile.name} ${profile.nameEn}`}
        fill
        sizes="120px"
        className="object-cover"
        priority
      />
    </span>
  );
}
