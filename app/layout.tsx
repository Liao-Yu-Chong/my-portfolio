import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
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
    <html lang="zh-Hant" className={`${archivo.variable} ${jetbrains.variable}`}>
      <head>
        {/* Noto Sans TC ships as ~100 unicode-range subsets. Loading it from
            Google keeps that splitting intact so browsers only fetch the
            glyph ranges a visitor actually reads — which is why the 900,
            used by a single headline, costs almost nothing. Four weights:
            400 body, 500 highlighted terms, 700 labels, 900 display. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
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
        <Backdrop />
        {children}
      </body>
    </html>
  );
}
