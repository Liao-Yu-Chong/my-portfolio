import { Nav } from '@/components/site/Nav';
import { Hero } from '@/components/site/Hero';
import { Intro } from '@/components/site/Intro';
import { Skills } from '@/components/site/Skills';
import { Playlist } from '@/components/site/Playlist';
import { Projects } from '@/components/site/Projects';
import { Testimonials } from '@/components/site/Testimonials';
import { Contact } from '@/components/site/Contact';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Skills />
        <Playlist />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
