import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Moon, Sparkles, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Flip } from "gsap/Flip";
import { projects, meta, type Project } from "@/data/portfolio";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useTheme } from "@/hooks/useTheme";
import { gsap, useGsap } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/motion";
import { useSpotlight } from "@/lib/pointerFx";
import ProjectCard from "@/components/portfolio/ProjectCard";
import "@/styles/projects.css";
import "@/styles/projects-page.css";

gsap.registerPlugin(Flip);

const tabs = ["All", "Featured", "Full Stack", "AI", "Client Work"] as const;
type Tab = (typeof tabs)[number];

const getProjectCategory = (project: Project) => {
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

function filterProjects(tab: Tab): Project[] {
  if (tab === "All") return projects;
  if (tab === "Featured") return projects.filter((project) => project.featured);
  if (tab === "Client Work") return projects.filter((project) => project.categories?.includes("Client Work"));
  if (tab === "Full Stack") {
    return projects.filter((project) => project.categories?.includes("Full Stack") || project.category === "Full Stack");
  }
  return projects.filter((project) => getProjectCategory(project) === tab);
}

const PAGE_DESCRIPTION =
  "Browse every project by Muhammad Zaigham Asif: client websites, full-stack MERN apps and AI tools, with live demos and source code on GitHub.";

const liveCount = projects.filter((p) => p.live).length;
const repoCount = projects.filter((p) => p.github).length;

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { theme, toggle } = useTheme();
  usePageMeta({ title: "All Projects — Muhammad Zaigham Asif", description: PAGE_DESCRIPTION, path: "/projects" });

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const revealRef = useRef<gsap.core.Tween | undefined>(undefined);

  const visible = useMemo(() => new Set(filterProjects(activeTab).map((p) => p.id)), [activeTab]);
  const counts = useMemo(() => Object.fromEntries(tabs.map((t) => [t, filterProjects(t).length])) as Record<Tab, number>, []);

  useSpotlight(gridRef);

  /* ── Entrance animations ── */
  useGsap(pageRef, (helpers, root) => {
    const { reveal, countUp } = helpers;
    reveal(root.querySelectorAll("[data-hero]"), { y: 28, stagger: 0.09, immediate: true });
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      countUp(el, Number(el.dataset.count), { duration: 1.3, trigger: el, start: "top 98%" });
    });
    const toolbar = root.querySelector(".ppage-toolbar");
    if (toolbar) reveal(toolbar, { y: 20, duration: 0.8, trigger: toolbar, start: "top 94%" });
    const grid = gridRef.current;
    if (grid) revealRef.current = reveal(Array.from(grid.children), { y: 48, stagger: 0.08, trigger: grid, start: "top 90%" });
  });

  /* ── Header shadow once the page has scrolled ── */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const header = headerRef.current;
    if (!sentinel || !header || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      header.dataset.stuck = entry.isIntersecting ? "false" : "true";
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  /* ── Sliding tab indicator (measured straight onto the DOM: no re-render needed) ── */
  const moveIndicator = useCallback(() => {
    const list = tabsRef.current;
    const indicator = indicatorRef.current;
    const active = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !indicator || !active) return;
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.translate = `${active.offsetLeft}px 0`;
  }, []);

  useLayoutEffect(() => {
    moveIndicator();
    const active = tabsRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    active?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [activeTab, moveIndicator]);

  useEffect(() => {
    const list = tabsRef.current;
    if (!list) return;
    // Enable the slide transition only after the first placement so it doesn't fly in from 0.
    const raf = requestAnimationFrame(() => list.setAttribute("data-ready", "true"));
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(moveIndicator) : undefined;
    ro?.observe(list);
    void document.fonts?.ready.then(moveIndicator).catch(() => undefined);
    window.addEventListener("resize", moveIndicator);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", moveIndicator);
    };
  }, [moveIndicator]);

  /* ── Flip: capture layout before the filter changes, animate to the new one after render ── */
  const selectTab = (tab: Tab) => {
    if (tab === activeTab) return;
    const grid = gridRef.current;
    if (grid && !prefersReducedMotion()) {
      const cards = grid.querySelectorAll(".pcard");
      revealRef.current?.progress(1);
      Flip.killFlipsOf(cards, true);
      // Leaving cards go absolute during the flip; hold the grid height so the page doesn't jump.
      grid.style.minHeight = `${grid.offsetHeight}px`;
      flipStateRef.current = Flip.getState(cards);
    }
    setActiveTab(tab);
  };

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    const grid = gridRef.current;
    if (!state || !grid) return;
    flipStateRef.current = null;
    const release = () => {
      grid.style.minHeight = "";
    };
    Flip.from(state, {
      duration: 0.7,
      ease: "power3.inOut",
      absolute: true,
      stagger: 0.03,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, delay: 0.15, ease: "power3.out", stagger: 0.04, clearProps: "opacity,transform" }
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in" }),
      onComplete: release,
    });
  }, [activeTab]);

  useEffect(() => {
    const grid = gridRef.current;
    return () => {
      if (!grid) return;
      const cards = grid.querySelectorAll(".pcard");
      Flip.killFlipsOf(cards, true);
      gsap.killTweensOf(cards);
      grid.style.minHeight = "";
    };
  }, []);

  const resultCount = visible.size;

  return (
    <div ref={pageRef} className="ppage page-enter">
      <a href="#projects-main" className="skip-link">
        Skip to projects
      </a>
      <div ref={sentinelRef} className="ppage-sentinel" aria-hidden="true" />

      <header ref={headerRef} className="ppage-header" data-stuck="false">
        <div className="container-custom ppage-header-inner">
          <Link to="/" className="ppage-home">
            <ArrowLeft size={16} aria-hidden="true" className="ppage-home-arrow" />
            Home
          </Link>
          <p className="ppage-header-title">All Projects</p>
          <button
            type="button"
            onClick={toggle}
            className="icon-btn"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="projects-main" tabIndex={-1} className="ppage-main">
        <section className="ppage-hero" aria-labelledby="projects-page-title">
          <div className="container-custom">
            <p className="eyebrow" data-hero>
              Portfolio
            </p>
            <h1 id="projects-page-title" className="ppage-title" data-hero>
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="ppage-lede" data-hero>
              The complete archive: client websites, full-stack applications, and AI experiments, each with its stack, highlights, and links.
            </p>
            <dl className="ppage-stats" data-hero>
              <div className="ppage-stat">
                <dt>Projects</dt>
                <dd data-count={projects.length}>{projects.length}</dd>
              </div>
              <div className="ppage-stat">
                <dt>Live sites</dt>
                <dd data-count={liveCount}>{liveCount}</dd>
              </div>
              <div className="ppage-stat">
                <dt>Repos</dt>
                <dd data-count={repoCount}>{repoCount}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="container-custom ppage-body" aria-label="Project list">
          <div className="ppage-toolbar">
            <div ref={tabsRef} className="ptabs" role="group" aria-label="Filter projects by category">
              <span ref={indicatorRef} className="ptabs-indicator" aria-hidden="true" />
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => selectTab(tab)}
                  aria-pressed={activeTab === tab}
                  className="ptab"
                >
                  {tab}
                  <span className="ptab-count" aria-hidden="true">
                    {counts[tab]}
                  </span>
                </button>
              ))}
            </div>
            <p className="ppage-count" aria-live="polite" aria-atomic="true">
              Showing <strong>{resultCount}</strong> of {projects.length} {projects.length === 1 ? "project" : "projects"}
              {activeTab !== "All" && (
                <>
                  {" "}in <strong>{activeTab}</strong>
                </>
              )}
            </p>
          </div>

          <div ref={gridRef} className="ppage-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} hidden={!visible.has(project.id)} />
            ))}
          </div>

          {resultCount === 0 && (
            <div className="ppage-empty">
              <span className="ppage-empty-icon" aria-hidden="true">
                <Sparkles size={24} />
              </span>
              <h2 className="ppage-empty-title">No projects in this category yet</h2>
              <p className="ppage-empty-text">
                I'm adding more work and case studies here soon. For now, switch back to all projects or head home.
              </p>
              <div className="ppage-empty-actions">
                <button type="button" onClick={() => selectTab("All")} className="btn btn-primary btn-sm">
                  Show all
                  <ArrowRight size={14} aria-hidden="true" className="btn-arrow" />
                </button>
                <Link to="/" className="btn btn-secondary btn-sm">
                  <ArrowLeft size={14} aria-hidden="true" />
                  Home
                </Link>
              </div>
            </div>
          )}

          <div className="ppage-more">
            <p>Looking for more? Everything else lives on GitHub.</p>
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              aria-label="Muhammad Zaigham Asif on GitHub (opens in a new tab)"
            >
              <Github size={16} aria-hidden="true" />
              Visit GitHub
              <ArrowUpRight size={14} aria-hidden="true" className="btn-arrow" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
