import type { Metadata, Viewport } from 'next';
import { Geist, Hedvig_Letters_Serif, Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';
import './globals.css';

/* Studio's two faces, self-hosted at build time. Hedvig Letters Serif is the
   heads, the wordmark and figures; its optical-size axis keeps the hand
   right from the 200px headline down to an item title. Geist is the body. */
const hedvig = Hedvig_Letters_Serif({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-hedvig',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

/* The Han halves of the same two voices: Noto Serif TC under the serif heads,
   Noto Sans TC under the body. Both keep Google's ~100 unicode-range slices,
   so a visitor fetches only the glyph ranges they read; the Han slices are
   not a named subset, so nothing is preloaded. */
const notoSerifTc = Noto_Serif_TC({
  subsets: ['latin'],
  preload: false,
  variable: '--font-noto-serif-tc',
  display: 'swap',
});

const notoTc = Noto_Sans_TC({
  subsets: ['latin'],
  preload: false,
  variable: '--font-noto-tc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '廖宥驄 Evan Liao — Frontend Engineer',
  description:
    '廖宥驄 Evan Liao — 前端工程師。專注於模組化介面、效能優化與清晰的程式架構。Angular / React / Next.js / TypeScript。',
  keywords: ['前端工程師', 'Frontend Engineer', 'Angular', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Evan Liao' }],
  openGraph: {
    title: '廖宥驄 Evan Liao — Frontend Engineer',
    description: '前端工程師。用清晰的架構，做出讓人信任的介面。',
    locale: 'zh_TW',
    type: 'website',
  },
};

export const viewport: Viewport = {
  // Matches --color-paper in each mode.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f7f8' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1214' },
  ],
  colorScheme: 'light dark',
};

/* Runs before first paint, so a saved choice never flashes the other mode,
   and marks the page as scripted for the one reveal (visible without it). */
const bootScript = `try{var m=localStorage.getItem('mode');if(m==='light'||m==='dark')document.documentElement.dataset.mode=m}catch(e){}document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the boot script sets data-mode and .js on
    // <html> before React hydrates.
    <html
      lang="zh-Hant"
      className={`${hedvig.variable} ${geist.variable} ${notoSerifTc.variable} ${notoTc.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          跳到主要內容
        </a>
        {children}
      </body>
    </html>
  );
}
