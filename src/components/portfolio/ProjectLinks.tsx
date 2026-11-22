import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";

/** Code / Live demo links. Empty `github`/`live` strings render nothing. */
export default function ProjectLinks({ project, variant = "card" }: { project: Project; variant?: "card" | "featured" }) {
  if (!project.github && !project.live) return null;
  const big = variant === "featured";
  return (
    <div className="plinks">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className={big ? "btn btn-primary" : "plink plink-primary"}
          aria-label={`${project.title} — live demo (opens in a new tab)`}
        >
          <ExternalLink size={16} aria-hidden="true" />
          Live demo
          <ArrowUpRight size={14} aria-hidden="true" className={big ? "btn-arrow" : "plink-arrow"} />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={big ? "btn btn-secondary" : "plink"}
          aria-label={`${project.title} — source code on GitHub (opens in a new tab)`}
        >
          <Github size={16} aria-hidden="true" />
          Code
          <ArrowUpRight size={14} aria-hidden="true" className={big ? "btn-arrow" : "plink-arrow"} />
        </a>
      )}
    </div>
  );
}
