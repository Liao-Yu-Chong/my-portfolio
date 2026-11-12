import type { CSSProperties } from 'react';
import { contact, profile } from '@/lib/site-data';
import { asset } from '@/lib/asset';
import { GitHubIcon, MailIcon } from '@/components/ui/Icons';
import { HeroHeadline } from '@/components/site/HeroHeadline';
import { HeroMail } from '@/components/site/HeroMail';
import { ButtonLink } from '@/components/ui/Cta';

/**
 * Banner hero: the headline set large on the proof, under construction —
 * its orange guides drawn at the font's real metrics — then one line about
 * who this is and the two actions. The first section starts above the fold.
 */
export function Hero() {
  const github = contact.socials.find((s) => s.label === 'GitHub');

  return (
    <section id="top" className="hero proof proof--fade" aria-labelledby="hero-title">
      <div className="container">
        <HeroHeadline text={profile.headline} />

        <div className="grid-12 hero__foot">
          <div className="hero__intro">
            {/* A plain <picture>: a static export can't resize or re-encode,
                so the files are pre-built at 256px by `npm run avatar`. Its
                alt is empty — the name is the masthead right above. */}
            <picture className="avatar crop crop--sm" style={{ '--l': '6px', '--o': '6px' } as CSSProperties}>
              <source type="image/avif" srcSet={asset(`${profile.avatar}.avif`)} />
              <img src={asset(`${profile.avatar}.webp`)} alt="" width={256} height={256} decoding="async" />
            </picture>
            <div>
              <p className="lead">{profile.summary}</p>
              {profile.available ? <p className="hero__status label">{profile.availabilityLabel}</p> : null}
            </div>
          </div>

          <div className="hero__actions">
            <HeroMail icon={<MailIcon />} />
            {github ? (
              <ButtonLink href={github.href} external>
                <GitHubIcon />
                GitHub
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
