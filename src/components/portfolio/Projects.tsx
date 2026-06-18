import { useRef } from "react";
import { Github, ExternalLink, ChevronRight } from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="projects" className="section-container">
      <div
        ref={ref}
        className={`section-inner transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-header">
          <span className="section-tag">What I've built</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            A selection of projects that demonstrate my skills in full-stack development and AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Top gradient strip */}
              <div className="project-card-strip" />

              <div className="p-6">
                {/* Featured badge */}
                {project.featured && (
                  <span className="featured-badge mb-3 inline-block">Featured</span>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground-default mb-2 group-hover:text-primary-color transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground-subtle leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Highlights */}
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

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer links */}
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
    </section>
  );
}
