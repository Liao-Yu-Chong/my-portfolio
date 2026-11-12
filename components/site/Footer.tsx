import { profile } from '@/lib/site-data';
import { MarbleRail } from '@/components/ui/MarbleRail';
import { NowListening } from '@/components/site/NowListening';

/**
 * The page footer. It used to sit inside the contact <section>, where it was
 * just a footer of that section; at the top level, after <main>, it is the
 * page's contentinfo landmark.
 */
export function Footer() {
  return (
    <footer className="shell mt-24 pb-24 md:mt-32 md:pb-32">
      {/* The stream ends here — the horizon closes the page the same way
          each section opened with one. */}
      <div className="horizon mb-8" />
      <MarbleRail count={4} active={3} className="mb-8" />
      <NowListening />
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-5 font-mono text-[0.6875rem] text-ink-3">
        <span>
          © {new Date().getFullYear()} {profile.name} {profile.nameEn}
        </span>
        <span>Next.js · TypeScript · Tailwind CSS · Framer Motion</span>
      </div>
    </footer>
  );
}
