import { useEffect, useMemo, useRef, useState } from "react";
import { Github, ExternalLink, ChevronRight, ArrowRight, ChevronLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useIntersection } from "@/hooks/useIntersection";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4;
  const totalPages = Math.ceil(projects.length / pageSize);

  const featuredProject = useMemo(
    () => projects.find((project) => project.category === "Client Work") ?? projects[0],
    []
  );

  const visibleProjects = useMemo(() => {
    const start = currentPage * pageSize;
    return projects.slice(start, start + pageSize);
  }, [currentPage]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [totalPages]);

  const goToPrev = () => setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  const goToNext = () => setCurrentPage((prev) => (prev + 1) % totalPages);

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

        <div className="mb-6 overflow-hidden rounded-3xl border border-border bg-surface-raised shadow-glow-primary/30">
          <div className="bg-gradient-primary px-5 py-3">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/90">
              <Sparkles size={12} />
              Featured project
            </div>
          </div>

          <div className="p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="featured-badge mb-2 inline-block">Client Work</span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground-default">{featuredProject.title}</h3>
              </div>
              <a
                href={featuredProject.live || featuredProject.github || '#'}
                target={featuredProject.live ? "_blank" : undefined}
                rel={featuredProject.live ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow-primary transition hover:translate-y-[-2px]"
              >
                {featuredProject.live ? "Visit live project" : "View project"}
                <ArrowRight size={14} />
              </a>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground-subtle">{featuredProject.description}</p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="text-sm text-foreground-subtle">
            Showing {visibleProjects.length} of {projects.length} projects
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-raised text-foreground-default transition duration-200 hover:border-primary/40 hover:text-primary-color hover:scale-105"
              aria-label="Previous projects"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-raised text-foreground-default transition duration-200 hover:border-primary/40 hover:text-primary-color hover:scale-105"
              aria-label="Next projects"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="mb-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to project page ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentPage === index ? "w-10 bg-gradient-primary" : "w-2.5 bg-border hover:bg-primary/60"
              }`}
            />
          ))}
        </div>

        <div key={currentPage} className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ease-out">
          {visibleProjects.map((project, i) => (
            <div
              key={project.id}
              className="project-card group animate-fade-up"
              style={{ transitionDelay: `${i * 80}ms`, animationDelay: `${i * 90}ms` }}
            >
              <div className="project-card-strip" />

              <div className="p-6">
                <div className="flex items-start gap-3 mb-2">
                  <div className="mc-slot">
                    <Github size={18} className="text-foreground-default" />
                  </div>
                  <div>
                    {project.category === "Client Work" && (
                      <span className="featured-badge mb-1 inline-block">Client Work</span>
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

        <div className="mt-8 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-white shadow-glow-primary transition hover:translate-y-[-2px] hover:shadow-[0_0_24px_rgba(92,78,255,0.45)]"
          >
            View all projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
