'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { contact, profile } from '@/lib/site-data';
import { asset } from '@/lib/asset';
import { ease } from '@/lib/motion';
import { IconCta, useEmailLinks } from '@/components/ui/Cta';
import { GitHubIcon, MailIcon } from '@/components/ui/Icons';
import { MarbleRail } from '@/components/ui/MarbleRail';

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { address, composeUrl } = useEmailLinks();
  const github = contact.socials.find((s) => s.label === 'GitHub');

  // The hero leaves rather than simply scrolling away — it lifts and fades
  // as the next section arrives, so the two never share the screen equally.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lift = useTransform(scrollYProgress, [0, 1], ['0px', '72px']);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const exit = reduced ? undefined : { y: lift, opacity: fade };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-between pt-24 pb-10"
    >
      {/* status line */}
      <motion.div className="shell relative" style={exit}>
        <motion.div
          className="flex items-start justify-between gap-6 border-b border-edge pb-5 font-mono text-[11px] tracking-wider text-ink-3 md:text-xs"
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
      </motion.div>

      {/* the thesis */}
      <motion.div className="shell relative py-[6vh]" style={exit}>
        <motion.div
          className="mb-8 flex items-center gap-5"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          <p className="label shrink-0 text-ember">
            {profile.nameEn} · {profile.name}
          </p>
          {/* the rule runs out to the gutter — an editorial mark, not a divider */}
          <motion.span
            className="h-px flex-1 origin-left bg-edge"
            initial={reduced ? undefined : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.4 }}
          />
        </motion.div>

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
      </motion.div>

      {/* actions + rail */}
      <motion.div className="shell relative" style={exit}>
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
          className="label mt-6 flex items-center gap-3 text-ink-3"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          往下滑 · scroll
          <motion.span
            aria-hidden="true"
            className="block h-3 w-px bg-ink-3"
            animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.p>
      </motion.div>
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
