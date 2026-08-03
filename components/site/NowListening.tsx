import { playlist } from '@/lib/site-data';

/**
 * The playlist as a footer one-liner rather than a section of its own.
 * A full section with its own heading gave it the same weight as the
 * project work, which is not the weight it deserves.
 */
export function NowListening() {
  if (playlist.tracks.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-edge py-5">
      <span className="flex shrink-0 items-center gap-2.5">
        <Equalizer />
        <span className="label text-ink-3">{playlist.label}</span>
      </span>

      <span className="text-sm text-ink-2">
        {playlist.tracks.map((track, i) => (
          <span key={`${track.artist}-${track.title}`}>
            {i > 0 ? <span className="text-ink-3"> · </span> : null}
            {track.title}
            <span className="text-ink-3"> — {track.artist}</span>
          </span>
        ))}
      </span>

      {playlist.playlistUrl ? (
        <a
          href={playlist.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto font-mono text-xs text-ink-3 transition-colors duration-200 hover:text-ember"
        >
          整張歌單 ↗
        </a>
      ) : null}
    </div>
  );
}

function Equalizer() {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      {[0, 0.18, 0.36].map((delay, i) => (
        <span
          key={i}
          className="eq-bar block w-[2px] bg-ember/70"
          style={{ height: '100%', animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}
