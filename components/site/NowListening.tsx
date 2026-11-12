import { playlist } from '@/lib/site-data';

/**
 * The playlist as one line of the letter's postscript, not a section of its
 * own: it shouldn't weigh as much as the work.
 */
export function NowListening() {
  if (playlist.tracks.length === 0) return null;

  return (
    <p>
      {playlist.label}：
      {playlist.tracks.map((track, i) => (
        <span key={`${track.artist}-${track.title}`}>
          {i > 0 ? '、' : null}
          {track.title}（{track.artist}）
        </span>
      ))}
      {playlist.playlistUrl ? (
        <>
          {'　'}
          <a className="link" href={playlist.playlistUrl} target="_blank" rel="noopener noreferrer">
            整張歌單
          </a>
        </>
      ) : null}
    </p>
  );
}
