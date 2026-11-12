'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '@/lib/site-data';
import { projects } from '@/lib/site-data';
import { asset } from '@/lib/asset';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ease, inView } from '@/lib/motion';

/**
 * The grid is deliberately uneven. Four equal cards read as a list of things
 * that all matter the same amount, which is not true — the first entry is the
 * one with a live demo and public source, so it gets the full measure and a
 * horizontal layout. The rest fall into a 7/5 split and then an indented
 * block, so the column edge moves as you scroll instead of holding a rule.
 *
 * The uneven split waits for lg. At md a 5-span card is 262px wide, which
 * leaves the title under 200px of measure — the asymmetry is only worth
 * having once there is room for it, so tablets get an even 6/6.
 *
 * Layouts cycle if more projects are added.
 */
const LAYOUTS = [
  { span: 'md:col-span-12', feature: true },
  { span: 'md:col-span-6 lg:col-span-7', feature: false },
  { span: 'md:col-span-6 lg:col-span-5', feature: false },
  { span: 'md:col-span-12 lg:col-span-10 lg:col-start-3', feature: false },
] as const;

export function Projects() {
  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        eyebrow="work$"
        title={['Selected', 'Work']}
        caption="一個開源的元件庫，三套上線中的企業系統。"
        railActive={2}
      />

      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        {projects.map((project, i) => {
          const layout = LAYOUTS[i % LAYOUTS.length];
          return (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              feature={layout.feature}
              className={layout.span}
            />
          );
        })}
      </div>
    </section>
  );
}

type CardProps = {
  project: Project;
  index: number;
  feature: boolean;
  className: string;
};

function ProjectCard({ project, index, feature, className }: CardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={`group flex overflow-hidden border border-edge bg-panel transition-colors duration-300 hover:border-edge-2 ${
        feature ? 'flex-col lg:grid lg:grid-cols-12' : 'flex-col'
      } ${className}`}
      initial={reduced ? undefined : { opacity: 0, y: 26 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.65, ease, delay: (index % 2) * 0.09 }}
      whileHover={reduced ? undefined : 'hover'}
      animate="rest"
    >
      {/* cover */}
      <div
        className={`relative overflow-hidden bg-void ${
          feature
            ? 'aspect-[16/10] border-b border-edge lg:col-span-7 lg:aspect-auto lg:border-r lg:border-b-0'
            : 'aspect-[16/10] border-b border-edge'
        }`}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.035 } }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Decorative for now: the covers are illustrated placeholders, and
              "X 封面" told a screen reader nothing the heading doesn't. Give
              it a real description when a cover becomes an actual screenshot. */}
          <Image
            src={asset(project.cover)}
            alt=""
            fill
            sizes={feature ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 50vw'}
            className="object-cover"
          />
        </motion.div>

        {/* ember wash on hover */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(140deg, color-mix(in srgb, var(--color-ember) 22%, transparent), transparent 62%)',
          }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      <div
        className={`flex flex-1 flex-col p-6 md:p-8 ${feature ? 'lg:col-span-5 lg:justify-center lg:p-10' : ''}`}
      >
        {/* The index is outlined, not filled — a filled numeral this size
            would outrank the project name sitting under it. */}
        <div className="mb-5 flex items-start justify-between gap-5">
          <div className="min-w-0">
            <span className="label block text-ember">{project.kind}</span>
            <span className="mt-2 block font-mono text-xs text-ink-3">{project.year}</span>
          </div>
          <span
            aria-hidden="true"
            className={`numeral shrink-0 ${feature ? 'text-[clamp(2.5rem,5vw,4rem)]' : 'text-[clamp(2rem,4vw,3rem)]'}`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3
          className={`display-mixed mb-1 text-ink ${
            feature
              ? 'text-[clamp(1.8rem,3.6vw,2.9rem)]'
              : 'text-[clamp(1.5rem,2.8vw,2.15rem)]'
          }`}
        >
          {project.name}
        </h3>
        <p className="mb-5 font-mono text-xs text-ink-3">{project.context}</p>

        <p className="mb-7 text-sm leading-[1.85] text-ink-2">{project.description}</p>

        <ul className="mb-7 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-edge bg-panel-2 px-3 py-1 font-mono text-[0.6875rem] text-ink-2"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* The card's actions region — a <footer>, pinned to the bottom so
            cards align. */}
        <footer className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-edge pt-5">
          {project.live ? <ProjectLink href={project.live} label="Live Demo" project={project.name} /> : null}
          {project.github ? <ProjectLink href={project.github} label="GitHub" project={project.name} /> : null}
          {!project.live && !project.github && project.privateNote ? (
            <span className="font-mono text-xs text-ink-3">🔒 {project.privateNote}</span>
          ) : null}
        </footer>
      </div>
    </motion.article>
  );
}

/**
 * The visible label stays short ("GitHub"), but every card has the same
 * ones, so the accessible name carries the project too ("GitHub UI Gallery")
 * — otherwise a screen reader's link list shows several identical names
 * pointing at different URLs. The visible text still leads the name.
 *
 * min-h: the text alone is 16px — 24px everywhere, 44px on touch screens.
 */
function ProjectLink({ href, label, project }: { href: string; label: string; project: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex min-h-6 items-center gap-2 font-mono text-xs text-ink transition-colors duration-200 hover:text-ember pointer-coarse:min-h-11"
    >
      {label}
      <span className="sr-only"> {project}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5"
      >
        ↗
      </span>
    </a>
  );
}
