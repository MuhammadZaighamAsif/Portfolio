import { ArrowLeft, ExternalLink, Github, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <div style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2 text-sm font-semibold text-foreground-default transition hover:border-primary/40 hover:text-primary-color"
          >
            <ArrowLeft size={16} />
            Home
          </Link>

          <div className="text-right">
            <p className="section-tag mb-1">Portfolio</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground-default">All Projects</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="project-card-strip" />

              <div className="p-6">
                <div className="flex items-start gap-3 mb-2">
                  <div className="mc-slot">
                    <Github size={18} className="text-foreground-default" />
                  </div>
                  <div>
                    {project.featured && (
                      <span className="featured-badge mb-1 inline-block">Featured</span>
                    )}
                    <h3 className="text-lg font-semibold text-foreground-default group-hover:text-primary-color transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-foreground-subtle leading-relaxed mb-4">
                  {project.description}
                </p>

                {project.highlights.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {project.highlights.slice(0, 3).map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2 text-xs text-foreground-subtle">
                        <ChevronRight size={12} className="text-accent-color mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-outline-default pt-4 flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      <Github size={14} />
                      Source Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
