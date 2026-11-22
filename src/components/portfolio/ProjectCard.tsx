import { Lock } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import ProjectCover from "./ProjectCover";
import ProjectLinks from "./ProjectLinks";
import { getProjectHue, getProjectLabel, getProjectStatus } from "./projectMeta";
import "@/styles/projects.css";

interface ProjectCardProps {
  project: Project;
  /** Zero-based position in the full project list (drives the cover numeral + hue). */
  index: number;
  hidden?: boolean;
}

const MAX_TAGS = 4;

export default function ProjectCard({ project, index, hidden }: ProjectCardProps) {
  const titleId = `project-${project.id}-title`;
  const status = getProjectStatus(project);
  const extraTags = Math.max(0, project.tags.length - MAX_TAGS);
  const hasLinks = Boolean(project.live || project.github);

  return (
    <article
      className="pcard card card-interactive spotlight"
      aria-labelledby={titleId}
      hidden={hidden}
      data-project-id={project.id}
      style={{ "--h": getProjectHue(project) } as CSSProperties}
    >
      <div className="pcard-media">
        <ProjectCover project={project} index={index} />
        <span className="pcard-label">{getProjectLabel(project)}</span>
        <span className="pcard-status" data-tone={status.tone}>
          <span className="pcard-status-dot" aria-hidden="true" />
          {status.label}
        </span>
      </div>

      <div className="pcard-body">
        <h3 id={titleId} className="pcard-title">
          {project.title}
        </h3>
        <p className="pcard-desc">{project.description}</p>

        <ul className="ptags" aria-label="Technologies">
          {project.tags.slice(0, MAX_TAGS).map((tag) => (
            <li key={tag} className="ptag">
              {tag}
            </li>
          ))}
          {extraTags > 0 && <li className="ptag ptag-more">+{extraTags}</li>}
        </ul>

        <div className="pcard-foot">
          {hasLinks ? (
            <ProjectLinks project={project} />
          ) : (
            <span className="pcard-private">
              <Lock size={14} aria-hidden="true" />
              Source not public
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
