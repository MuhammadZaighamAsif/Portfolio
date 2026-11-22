import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import BrowserFrame from "./BrowserFrame";
import { getProjectHue, getProjectIcon, hostOf, pad } from "./projectMeta";

/**
 * Designed "cover" for a project card. Uses the real screenshot (in a browser frame) when there is
 * one; otherwise a per-project gradient + grid pattern + category icon made purely in CSS.
 */
export default function ProjectCover({ project, index }: { project: Project; index: number }) {
  const Icon = getProjectIcon(project);
  const style = { "--h": getProjectHue(project) } as CSSProperties;

  return (
    <div className="pcover" style={style}>
      <div className="pcover-art" aria-hidden="true">
        <span className="pcover-grid" />
        <span className="pcover-orb pcover-orb-a" />
        <span className="pcover-orb pcover-orb-b" />
        <span className="pcover-glyph">{pad(index + 1)}</span>
        {!project.thumbnail && (
          <>
            <span className="pcover-ring pcover-ring-a" />
            <span className="pcover-ring pcover-ring-b" />
            <span className="pcover-icon">
              <Icon size={30} strokeWidth={1.75} />
            </span>
          </>
        )}
      </div>
      {project.thumbnail && (
        <div className="pcover-shot">
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
  );
}
