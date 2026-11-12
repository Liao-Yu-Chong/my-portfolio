import type { Project } from '@/lib/site-data';
import { projects } from '@/lib/site-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WorkCase } from '@/components/site/WorkCase';

/**
 * The work. The project with real captures (UI Gallery, the one with a live
 * demo and public source) opens as a case: a sticky pane with the project,
 * its captures scrolling past beside it. The internal systems, which have
 * nothing to show publicly, follow as an index of rows.
 */
export function Projects() {
  const cases = projects.filter((p) => p.captures?.length);
  const rest = projects.filter((p) => !p.captures?.length);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader id="work-title" title="Selected work" lead="一個開源的元件庫，三套上線中的企業系統。" />

        {cases.map((p) => (
          <WorkCase key={p.name} project={p} />
        ))}

        {rest.length ? (
          <ul className="index set">
            {rest.map((p) => (
              <IndexRow key={p.name} project={p} />
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function IndexRow({ project }: { project: Project }) {
  return (
    <li>
      <article className="grid-12 index__row">
        <header className="index__name">
          <h3>{project.name}</h3>
          <p className="label">{project.kind}</p>
        </header>
        <div className="index__body">
          <p>{project.description}</p>
          <ul className="tags" aria-label="使用技術">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {project.privateNote ? <p className="label">{project.privateNote}</p> : null}
        </div>
        <p className="index__year label">
          {project.context}
          <br />
          {project.year}
        </p>
      </article>
    </li>
  );
}
