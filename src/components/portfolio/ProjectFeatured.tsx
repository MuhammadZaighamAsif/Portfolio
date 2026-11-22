import { Check, Star } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import BrowserFrame from "./BrowserFrame";
import ProjectLinks from "./ProjectLinks";
import { getProjectHue, getProjectLabel, hostOf } from "./projectMeta";
import "@/styles/projects.css";

/** Large featured project: copy on one side, browser-framed screenshot on the other. */
export default function ProjectFeatured({ project }: { project: Project }) {
  const titleId = `project-${project.id}-title`;
  const style = { "--h": getProjectHue(project) } as CSSProperties;

  return (
    <article className="pfeatured card spotlight" aria-labelledby={titleId} style={style}>
      <div className="pfeatured-copy">
        <div className="pfeatured-meta" data-fx>
          <span className="chip">
            <Star size={13} aria-hidden="true" fill="currentColor" />
            Featured project
          </span>
          <span className="chip chip-neutral">{getProjectLabel(project)}</span>
        </div>
        <h3 id={titleId} className="pfeatured-title" data-fx>
          {project.title}
        </h3>
        <p className="pfeatured-desc" data-fx>
          {project.description}
        </p>
        {project.highlights.length > 0 && (
          <ul className="pcard-highlights pfeatured-highlights" data-fx>
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h}>
                <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <ul className="ptags" aria-label="Technologies">
          {project.tags.slice(0, 6).map((tag) => (
            <li key={tag} className="chip chip-neutral">
              {tag}
            </li>
          ))}
        </ul>
        <div className="pfeatured-actions" data-fx>
          <ProjectLinks project={project} variant="featured" />
        </div>
      </div>

      <div className="pfeatured-media">
        <div className="pfeatured-stage">
          <span className="pcover-grid" aria-hidden="true" />
          <span className="pcover-orb pcover-orb-a" aria-hidden="true" />
          <span className="pcover-orb pcover-orb-b" aria-hidden="true" />
          {project.thumbnail && (
            <div className="pfeatured-frame">
              <BrowserFrame
                src={project.thumbnail}
                alt={`${project.title} — homepage screenshot`}
                host={project.live ? hostOf(project.live) : undefined}
                width={1424}
                height={815}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
