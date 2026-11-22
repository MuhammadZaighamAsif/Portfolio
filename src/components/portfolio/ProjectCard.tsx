import { Check } from "lucide-react";
import type { Project } from "@/data/portfolio";
import ProjectCover from "./ProjectCover";
import ProjectLinks from "./ProjectLinks";
import { getProjectLabel } from "./projectMeta";
import "@/styles/projects.css";

interface ProjectCardProps {
  project: Project;
  /** Zero-based position in the full project list (drives the number + cover hue). */
  index: number;
  hidden?: boolean;
}

export default function ProjectCard({ project, index, hidden }: ProjectCardProps) {
  const titleId = `project-${project.id}-title`;
  return (
    <article
      className="pcard card card-interactive spotlight"
      aria-labelledby={titleId}
      hidden={hidden}
      data-project-id={project.id}
    >
      <div className="pcard-media">
        <ProjectCover project={project} index={index} />
        <span className="pcard-label chip chip-neutral">{getProjectLabel(project)}</span>
        {project.featured && <span className="pcard-label pcard-label-right chip">Featured</span>}
      </div>

      <div className="pcard-body">
        <h3 id={titleId} className="pcard-title">
          {project.title}
        </h3>
        <p className="pcard-desc">{project.description}</p>

        {project.highlights.length > 0 && (
          <ul className="pcard-highlights">
            {project.highlights.slice(0, 2).map((h) => (
              <li key={h}>
                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="ptags" aria-label="Technologies">
          {project.tags.slice(0, 5).map((tag) => (
            <li key={tag} className="chip chip-neutral">
              {tag}
            </li>
          ))}
        </ul>

        <div className="pcard-foot">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
