// Regenerates the hero avatar from assets/avatar.png.
//
// The site is a static export, so next/image can't resize or re-encode at
// request time — whatever sits in public/ is what visitors download. The chip
// is at most ~90 CSS px, so 256px covers it at 2.8x density.
//
//   npm run avatar
//
// sharp ships with Next.js (it's what next/image uses), so there is nothing
// extra to install.
import sharp from 'sharp';

const SRC = 'assets/avatar.png';
const SIZE = 256;

for (const [format, options] of [
  ['avif', { quality: 55 }],
  ['webp', { quality: 82 }],
]) {
  const info = await sharp(SRC).resize(SIZE, SIZE)[format](options).toFile(`public/avatar.${format}`);
  console.log(`public/avatar.${format}  ${info.width}x${info.height}  ${info.size} bytes`);
}
