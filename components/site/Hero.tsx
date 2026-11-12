'use client';

import { useRef, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { contact, profile } from '@/lib/site-data';
import { asset } from '@/lib/asset';
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
      {/* Entrances are CSS (hero-* in globals.css), not framer-motion: an
          `initial` prop is written into the static HTML and only cleared
          after hydration, which left the headline — the LCP element —
          invisible until the JS bundle ran. Keyframes start as soon as the
          HTML parses. Only the scroll-linked exit below still needs JS. */}

      {/* status line */}
      <motion.div className="shell relative" style={exit}>
        <div
          className="hero-fade flex items-start justify-between gap-6 border-b border-edge pb-5 font-mono text-[0.6875rem] tracking-wider text-ink-3 md:text-xs"
          style={delay(0.1)}
        >
          <span className="flex items-center gap-2.5">
            {profile.available ? (
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
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
        </div>
      </motion.div>

      {/* the thesis */}
      <motion.div className="shell relative py-[6vh]" style={exit}>
        <div
          className="hero-rise mb-8 flex items-center gap-5"
          style={delay(0.15, { '--rise': '10px' })}
        >
          <p className="label shrink-0 text-ember">
            {profile.nameEn} · {profile.name}
          </p>
          {/* the rule runs out to the gutter — an editorial mark, not a divider */}
          <span className="hero-rule h-px flex-1 origin-left bg-edge" style={delay(0.4)} />
        </div>

        {/* Sized so the longest line (19 chars) clears the gutter at every
            width — see the note on profile.headline before editing the copy. */}
        <h1 className="display text-[clamp(1.25rem,7vw,6rem)]">
          {profile.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.09em]">
              <span
                className="hero-wipe flex items-center gap-[0.22em] whitespace-nowrap"
                style={delay(0.25 + i * 0.11)}
              >
                {i === profile.avatarOnLine ? <AvatarChip /> : null}
                {line}
              </span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* actions + rail */}
      <motion.div className="shell relative" style={exit}>
        <div
          className="hero-rise mb-8 flex flex-wrap items-center gap-3"
          style={delay(0.7, { '--rise': '16px' })}
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
        </div>

        <MarbleRail count={7} active={0} />

        <p className="hero-fade label mt-6 flex items-center gap-3 text-ink-3" style={delay(1)}>
          往下滑 · scroll
          <span aria-hidden="true" className="scroll-cue block h-3 w-px origin-top bg-ink-3" />
        </p>
      </motion.div>
    </section>
  );
}

/** Per-element delay (and any extra custom properties) for the hero-* keyframes. */
function delay(seconds: number, extra: Record<string, string> = {}): CSSProperties {
  return { '--d': `${seconds}s`, ...extra } as CSSProperties;
}

/** The photo sits inside the headline instead of beside it. */
function AvatarChip() {
  return (
    <span className="relative inline-block h-[0.95em] w-[0.95em] shrink-0 overflow-hidden rounded-full border border-ember/60 align-middle">
      {/* alt is empty on purpose: this sits inside the h1, so any text here
          becomes part of the heading ("…REFACTOR LEGACY, 廖宥驄 Evan Liao SHIP…").
          The name is already read out by the label right above. */}
      <Image
        src={asset(profile.avatar)}
        alt=""
        fill
        sizes="120px"
        className="object-cover"
        priority
      />
    </span>
  );
}
