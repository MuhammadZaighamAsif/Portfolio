import { useEffect, useRef } from "react";
import { Github, ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactBitsText from "@/components/ui/ReactBitsText";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const title = headerRef.current?.querySelector("h2");
      const description = headerRef.current?.querySelector("p:last-child");

      // Clipped editorial reveal
      gsap.from(title, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 28,
        clipPath: "inset(0 100% 0 0)",
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(description, { scrollTrigger: { trigger: headerRef.current, start: "top 80%" }, x: -18, duration: 0.7, delay: 0.15, ease: "power2.out" });

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
    <section ref={sectionRef} id="projects" className="section section-projects">
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
            Selected Work
          </p>
          <ReactBitsText text="Projects" variant="tracking" className="text-heading mb-6" />
          <p className="text-body-large">
            A collection of projects showcasing full-stack development, AI integration, and modern web technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid-minimal mb-12">
          {displayProjects.map((project, index) => (
            <article
              key={project.id}
              className="project-item project-card group"
            >
              <div className="project-card-accent" />
              <div className="project-card-body">
                <div className="project-card-header">
                  <span className="project-card-number">0{index + 1}</span>
                  {project.category && (
                    <span className="project-card-category">{project.category}</span>
                  )}
                </div>

                <h3 className="project-card-title">
                  {project.title}
                </h3>

                <p className="project-card-description">
                  {project.description}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="project-card-highlights">
                    {project.highlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx}>
                        <span className="project-card-bullet" aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

              <div className="project-card-tags">
                {project.tags.slice(0, 5).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="project-card-actions">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link"
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
                    className="project-card-link project-card-link-primary"
                  >
                    <ExternalLink size={16} />
                    Live demo
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        {projects.length > 6 && (
          <div className="projects-footer">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 hover-underline text-lg font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              <span>View all projects</span>
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
