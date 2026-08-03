'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { playlist } from '@/lib/site-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Cta } from '@/components/ui/Cta';

export function Playlist() {
  if (playlist.tracks.length === 0) return null;

  return (
    <section id="playlist" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        eyebrow="playlist$"
        title={['Now', 'Playing']}
        caption={playlist.note}
        railActive={3}
      />

      <Reveal className="border border-edge bg-panel">
        <ul>
          {playlist.tracks.map((track, i) => (
            <TrackRow key={track.title} index={i} track={track} playing={i === playlist.playingIndex} />
          ))}
        </ul>
      </Reveal>

      {playlist.playlistUrl ? (
        <Reveal delay={0.1} className="mt-8">
          <Cta href={playlist.playlistUrl} variant="ghost" external>
            聽完整歌單
          </Cta>
        </Reveal>
      ) : null}
    </section>
  );
}

type TrackRowProps = {
  index: number;
  track: { title: string; artist: string; length: string; url?: string };
  playing: boolean;
};

function TrackRow({ index, track, playing }: TrackRowProps) {
  const reduced = useReducedMotion();

  const body = (
    <motion.div
      className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-5 py-4 md:px-7"
      whileHover={reduced ? undefined : { x: 6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
    >
      <span className="flex h-4 items-end justify-start">
        {playing ? <Equalizer /> : <span className="font-mono text-xs text-ink-3">{String(index + 1).padStart(2, '0')}</span>}
      </span>

      <span className="min-w-0">
        <span className={`block truncate text-sm ${playing ? 'text-ember' : 'text-ink'}`}>
          {track.title}
        </span>
        <span className="block truncate text-xs text-ink-3">{track.artist}</span>
      </span>

      <span className="font-mono text-xs text-ink-3">{track.length}</span>
    </motion.div>
  );

  return (
    <li className="border-b border-edge last:border-b-0">
      {track.url ? (
        <a href={track.url} target="_blank" rel="noopener noreferrer" className="block">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}

function Equalizer() {
  return (
    <span className="flex h-3.5 items-end gap-[3px]" aria-label="playing">
      {[0, 0.18, 0.36, 0.12].map((delay, i) => (
        <span
          key={i}
          className="eq-bar block w-[2px] bg-ember"
          style={{ height: '100%', animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}
