import { profile } from '@/lib/site-data';
import { NowListening } from '@/components/site/NowListening';

/** The build date, in the letter's own voice. A static export is built once
    per deploy, so this is the date the page was last published. */
const builtOn = new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());

/**
 * The page footer, closing the letter the contact section began: a sign-off
 * on the proof, the date it was written, then the postscript. Outside <main>,
 * so it is the page's contentinfo landmark.
 */
export function Footer() {
  return (
    <footer className="close proof">
      <div className="container">
        <p className="close__sign">
          {profile.name} {profile.nameEn}
        </p>
        <p className="close__date label">寫於高雄，{builtOn}</p>

        <div className="close__notes">
          <NowListening />
          <p>以 Next.js、TypeScript、Tailwind CSS 製作。</p>
          <p>
            © {new Date().getFullYear()} {profile.name} {profile.nameEn}
          </p>
        </div>
      </div>
    </footer>
  );
}
