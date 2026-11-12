import { Nav } from '@/components/site/Nav';
import { Hero } from '@/components/site/Hero';
import { Intro } from '@/components/site/Intro';
import { Projects } from '@/components/site/Projects';
import { Skills } from '@/components/site/Skills';
import { Contact } from '@/components/site/Contact';
import { Footer } from '@/components/site/Footer';

/**
 * Hallmark draw f9a281, Feature Stack: the hero, then where it is (Right
 * now), the work with one project opened as a case, what I use (the stack),
 * and the letter (contact) with its close.
 */
export default function Page() {
  return (
    <>
      <Nav />
      {/* tabIndex -1 so the skip link actually moves focus here (some screen
          magnifiers don't follow a fragment jump to a non-focusable target). */}
      <main id="main" tabIndex={-1}>
        <Hero />
        <Intro />
        <Projects />
        <Skills />
        <Contact />
      </main>
      {/* Outside <main> so it is exposed as the page's contentinfo landmark. */}
      <Footer />
    </>
  );
}
