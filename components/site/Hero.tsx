'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import { contact, profile } from '@/lib/site-data';
import { asset } from '@/lib/asset';
import { IconCta, useEmailLinks } from '@/components/ui/Cta';
import { GitHubIcon, MailIcon } from '@/components/ui/Icons';
import { MarbleRail } from '@/components/ui/MarbleRail';

export function Hero() {
  const { address, composeUrl } = useEmailLinks();
  const github = contact.socials.find((s) => s.label === 'GitHub');

  return (
    // `hero` declares the view timeline the exit runs on: the hero lifts and
    // fades as the next section arrives, so the two never share the screen
    // equally. All of it is CSS (hero-* in globals.css), entrance included ??
    // a framer-motion `initial` prop is written into the static HTML and
    // only cleared after hydration, which hid the headline (the LCP
    // element) until the JS bundle ran.
    <section id="top" className="hero relative flex min-h-svh flex-col justify-between pt-24 pb-10">
      {/* status line */}
      <div className="hero-exit shell relative">
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
      </div>

      {/* the thesis */}
      <div className="hero-exit shell relative py-[6vh]">
        <div
          className="hero-rise mb-8 flex items-center gap-5"
          style={delay(0.15, { '--rise': '10px' })}
        >
          <p className="label shrink-0 text-ember">
            {profile.nameEn} 繚 {profile.name}
          </p>
          {/* the rule runs out to the gutter ??an editorial mark, not a divider */}
          <span className="hero-rule h-px flex-1 origin-left bg-edge" style={delay(0.4)} />
        </div>

        {/* Sized so the longest line (19 chars) clears the gutter at every
            width ??see the note on profile.headline before editing the copy. */}
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
      </div>

      {/* actions + rail */}
      <div className="hero-exit shell relative">
        <div
          className="hero-rise mb-8 flex flex-wrap items-center gap-3"
          style={delay(0.7, { '--rise': '16px' })}
        >
          <IconCta
            href={composeUrl}
            label={address ? `撖縑蝯行? 繚 ${address}` : '撖縑蝯行?'}
            icon={<MailIcon />}
            external
          />
          {github ? (
            <IconCta
              href={github.href}
              label={`GitHub 繚 ${github.handle}`}
              icon={<GitHubIcon />}
              variant="ghost"
              external
            />
          ) : null}
        </div>

        <MarbleRail count={7} active={0} />

        <p className="hero-fade label mt-6 flex items-center gap-3 text-ink-3" style={delay(1)}>
          敺銝? 繚 scroll
          <span aria-hidden="true" className="scroll-cue block h-3 w-px origin-top bg-ink-3" />
        </p>
      </div>
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
          becomes part of the heading ("?吐EFACTOR LEGACY, 撱恭撽?Evan Liao SHIP??).
          The name is already read out by the label right above. */}
      <Image
        src={asset(profile.avatar)}
        alt=""
        fill
        sizes="120px"
        className="object-cover"
        // Eager (it's above the fold, and next/image defaults to lazy) but
        // not `priority`: the LCP element is the headline text, so a tiny
        // avatar shouldn't take the high-priority fetch slot.
        loading="eager"
      />
    </span>
  );
}
