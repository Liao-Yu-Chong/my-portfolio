type Props = {
  /** The heading, six words or fewer. */
  title: string;
  /** One line beside it, its baseline on the heading's. */
  lead?: string;
  /** id for the heading, so the section can be labelled by it. */
  id: string;
};

/**
 * A section's head block: the heading on columns 1 to 6, its one line on 8
 * to 12, baselines aligned. No eyebrow, no number over it.
 */
export function SectionHeader({ title, lead, id }: Props) {
  return (
    <div className="grid-12 head">
      <h2 id={id}>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}
