'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '@/lib/site-data';
import { projects } from '@/lib/site-data';
import { asset } from '@/lib/asset';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ease, inView } from '@/lib/motion';

export function Projects() {
  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        eyebrow="work$"
        title={['Selected', 'Work']}
        caption="一個開源的元件庫，三套上線中的企業系統。"
        railActive={4}
      />

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="group flex flex-col overflow-hidden border border-edge bg-panel"
      initial={reduced ? undefined : { opacity: 0, y: 26 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.65, ease, delay: (index % 2) * 0.09 }}
      whileHover={reduced ? undefined : 'hover'}
      animate="rest"
    >
      {/* cover */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-edge bg-void">
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.035 } }}
          transition={{ duration: 0.7, ease }}
        >
          <Image
            src={asset(project.cover)}
            alt={`${project.name} 封面`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
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

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <span className="label text-ember">{project.kind}</span>
          <span className="font-mono text-xs text-ink-3">{project.year}</span>
        </div>

        <h3 className="display-tight mb-1 text-[clamp(1.5rem,2.8vw,2.15rem)] text-ink">
          {project.name}
        </h3>
        <p className="mb-5 font-mono text-xs text-ink-3">{project.context}</p>

        <p className="mb-7 text-sm leading-[1.85] text-ink-2">{project.description}</p>

        <ul className="mb-7 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-edge bg-panel-2 px-3 py-1 font-mono text-[11px] text-ink-2"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* links pinned to the bottom so cards align */}
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-edge pt-5">
          {project.live ? <ProjectLink href={project.live} label="Live Demo" /> : null}
          {project.github ? <ProjectLink href={project.github} label="GitHub" /> : null}
          {!project.live && !project.github && project.privateNote ? (
            <span className="font-mono text-xs text-ink-3">🔒 {project.privateNote}</span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-2 font-mono text-xs text-ink transition-colors duration-200 hover:text-ember"
    >
      {label}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      >
        ↗
      </span>
    </a>
  );
}
