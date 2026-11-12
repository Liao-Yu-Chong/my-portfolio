import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono, Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import { Backdrop } from '@/components/ui/Backdrop';

/* Archivo is variable on both weight and width — the width axis is what
   gives the headline its poster proportions. */
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  // 700 is what .label now sets — without it the Latin half of every label
  // would be synthesised bold while the Chinese half used a real 700.
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

/* Self-hosted at build time instead of a <link> to fonts.googleapis.com:
   that stylesheet was render-blocking and on another origin, so first
   paint waited on two extra connections. next/font keeps Google's
   unicode-range slicing (~100 slices), so a visitor still only downloads
   the glyph ranges they read. The variable font covers all four weights
   used (400 body, 500 highlighted terms, 700 labels, 900 display) with one
   file per slice. The Han slices aren't a named subset, so nothing is
   preloaded — the browser fetches slices as text needs them. */
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
  themeColor: '#08090b',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className={`${archivo.variable} ${jetbrains.variable} ${notoTc.variable}`}>
      <head>
        {/* Entrance animations render their "before" state into the static HTML
            (opacity:0, translateY). Without JS nothing would ever clear it and
            the page would read as blank, so undo it up front. */}
        <noscript>
          <style>{`
            [style*="opacity:0"], [style*="opacity: 0"] { opacity: 1 !important; }
            [style*="translateY"] { transform: none !important; }
          `}</style>
        </noscript>
      </head>
      <body className="grain">
        <a href="#main" className="skip-link">
          跳到主要內容
        </a>
        <Backdrop />
        {children}
      </body>
    </html>
  );
}
