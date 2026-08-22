import { useEffect, useRef } from "react";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header fade in
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Cards stagger
      const cards = gridRef.current?.querySelectorAll(".project-item");
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Show top 6 projects
  const displayProjects = projects.slice(0, 6);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
            Selected Work
          </p>
          <h2 className="text-heading mb-6">
            Projects
          </h2>
          <p className="text-body-large">
            A collection of projects showcasing full-stack development, AI integration, and modern web technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid-minimal mb-12">
          {displayProjects.map((project) => (
            <article
              key={project.id}
              className="project-item card-minimal group"
            >
              {/* Category */}
              {project.category && (
                <div 
                  className="text-xs uppercase tracking-wider mb-4 font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {project.category}
                </div>
              )}

              {/* Title */}
              <h3 
                className="text-2xl font-semibold mb-3 group-hover:opacity-70 transition-opacity"
                style={{ color: "var(--text-primary)" }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p 
                className="mb-6 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="mb-6 space-y-2">
                  {project.highlights.slice(0, 3).map((highlight, idx) => (
                    <li 
                      key={idx}
                      className="text-sm flex items-start gap-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span style={{ color: "var(--accent)" }}>•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm hover-underline transition-opacity hover:opacity-70"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm hover-underline transition-opacity hover:opacity-70"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        {projects.length > 6 && (
          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 hover-underline text-lg font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              View All Projects
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="container-custom mt-24">
        <div className="line" />
      </div>
    </section>
  );
}
