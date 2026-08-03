/**
 * next/image does not prefix `src` with basePath when images are unoptimized
 * (which a static export forces), while JS/CSS/font URLs are prefixed. Left
 * alone, every image 404s once the site is served from /my-portfolio.
 *
 * NEXT_PUBLIC_* is inlined at build time, so this resolves in the export.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix a path in /public with the deployment's basePath. */
export function asset(path: string): string {
  return `${basePath}${path}`;
}
