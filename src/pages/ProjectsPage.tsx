import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";

const tabs = ["All", "Featured", "Full Stack", "AI", "Client Work"] as const;
type Tab = (typeof tabs)[number];

const getProjectCategory = (project: (typeof projects)[number]) => {
  if (project.categories && project.categories.length > 0) {
    return project.categories[0];
  }

  const category = project.category;
  if (category) return category;

  const tagSet = project.tags.map((tag) => tag.toLowerCase());

  if (tagSet.some((tag) => ["python", "nlp", "bert", "faiss", "sentence-transformers"].includes(tag))) {
    return "AI";
  }

  if (tagSet.some((tag) => ["react.js", "node.js", "express.js", "mongodb", "postgresql", "vite"].includes(tag))) {
    return "Full Stack";
  }

  return "Client Work";
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const highlightedProject = projects.find((project) => project.categories?.includes("Client Work")) ?? projects[0];

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return projects;
    if (activeTab === "Featured") return projects.filter((project) => project.featured);
    if (activeTab === "Client Work") return projects.filter((project) => project.categories?.includes("Client Work"));
    if (activeTab === "Full Stack") return projects.filter((project) => project.categories?.includes("Full Stack") || project.category === "Full Stack");

    return projects.filter((project) => getProjectCategory(project) === activeTab);
  }, [activeTab]);

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

        <div className="project-spotlight-shell mb-8 overflow-hidden rounded-3xl border border-border bg-surface-raised">
          <div className="project-spotlight-glow" />
          <div className="bg-gradient-primary px-6 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/90">
              <Sparkles size={14} />
              Featured project
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div>
                <span className="featured-badge inline-block mb-3">Highlight</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground-default">{highlightedProject.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-subtle">{highlightedProject.description}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {highlightedProject.live && (
                    <a
                      href={highlightedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-product-cta inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                    >
                      Live demo
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {highlightedProject.github && (
                    <a
                      href={highlightedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground-default transition hover:border-primary/40 hover:text-primary-color"
                    >
                      GitHub
                      <Github size={14} />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-spotlight-thumb relative overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="project-spotlight-glow-secondary" />
                <img
                  src={highlightedProject.thumbnail || "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80"}
                  alt={highlightedProject.title}
                  className="h-52 w-full object-cover md:h-64"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-transparent bg-gradient-primary text-white shadow-glow-primary"
                  : "border-border bg-surface-raised text-foreground-subtle hover:border-primary/40 hover:text-foreground-default"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface-raised px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-white shadow-glow-primary">
              <Sparkles size={24} />
            </div>
            <h3 className="text-2xl font-bold text-foreground-default">No projects in this category yet</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-foreground-subtle">
              I’m adding more work and case studies here soon. For now, switch back to all projects or head home.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("All")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Show all
                <ArrowRight size={14} />
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground-default"
              >
                <ArrowLeft size={14} />
                Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, i) => (
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
        )}
      </div>
    </div>
  );
}
