import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ChevronDown,
  Eye,
  GitBranch,
  Hammer,
  Rocket,
  RefreshCw,
  Route,
  Server,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  agentic,
  devops,
  tools,
  type PipelineStage,
  type ToolCategory,
} from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import BrandIcon from "@/components/ui/BrandIcon";
import { ScrollTrigger, gsap, useGsap } from "@/lib/animations";
import { useSpotlight } from "@/lib/pointerFx";
import "@/styles/toolkit.css";

const stageIcons: Record<PipelineStage["icon"], LucideIcon> = {
  source: GitBranch,
  build: Hammer,
  automate: Workflow,
  deploy: Rocket,
  operate: Server,
  perceive: Eye,
  plan: Route,
  act: Zap,
  reflect: RefreshCw,
};

const ALL = "All" as const;
type Filter = typeof ALL | ToolCategory;

/** The collapsed "All" view shows the tools flagged `featured`. */
const featuredTools = tools.filter((t) => t.featured);

interface PipelineProps {
  stages: PipelineStage[];
  /** Draws a "repeat until done" return line under the stages (agent loops). */
  loop?: boolean;
}

/** Numbered stage cards joined by a rail that draws in on scroll. Used for DevOps and the agent loop. */
function Pipeline({ stages, loop = false }: PipelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  useSpotlight(ref, ".pipe-stage");

  useGsap(ref, ({ reveal, drawLine }, root) => {
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".pipe-stage"));
    reveal(cards, { y: 40, stagger: 0.12, trigger: root, start: "top 84%", duration: 0.85 });

    root.querySelectorAll<HTMLElement>(".pipe-node").forEach((node, i) => {
      gsap.fromTo(
        node,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          delay: 0.25 + i * 0.12,
          ease: "back.out(2.4)",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: root, start: "top 84%", once: true },
        }
      );
    });

    // Rails draw with the scroll (horizontal when wide, vertical when stacked; the hidden one is inert).
    drawLine(root.querySelector(".pipe-rail-x"), { axis: "x", trigger: root, start: "top 76%", end: "bottom 72%" });
    drawLine(root.querySelector(".pipe-rail-y"), { axis: "y", trigger: root, start: "top 76%", end: "bottom 72%" });

    reveal(root.querySelector(".pipe-loop"), { y: 14, trigger: root.querySelector(".pipe-loop"), start: "top 94%" });
  });

  return (
    <div ref={ref} className="pipe">
      <div className="pipe-track" data-count={stages.length}>
        <span className="pipe-rail pipe-rail-x" aria-hidden="true" />
        <span className="pipe-rail pipe-rail-y" aria-hidden="true" />
        <ol className="pipe-stages" style={{ "--cols": stages.length } as CSSProperties}>
          {stages.map((stage, i) => {
            const Icon = stageIcons[stage.icon];
            return (
              <li key={stage.title} className="pipe-stage card spotlight">
                <span className="pipe-node" aria-hidden="true">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className="pipe-step">Step {String(i + 1).padStart(2, "0")}</span>
                <h4 className="pipe-title">{stage.title}</h4>
                <p className="pipe-caption">{stage.caption}</p>
                <ul className="pipe-tools">
                  {stage.tools.map((t) => (
                    <li key={t.name} className="pipe-tool">
                      <BrandIcon name={t.name} fallback={t.fallback} size={15} className="pipe-tool-icon" />
                      {t.name}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
      {loop && (
        <p className="pipe-loop">
          <RefreshCw size={15} aria-hidden="true" />
          Repeats until the goal is met, with a human checkpoint for anything risky.
        </p>
      )}
    </div>
  );
}

export default function Toolkit() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>(ALL);
  const [expanded, setExpanded] = useState(false);
  const [interacted, setInteracted] = useState(false); // true once the visitor has used a filter or expander

  const categories = useMemo(() => {
    const seen = new Set<ToolCategory>();
    tools.forEach((t) => seen.add(t.category));
    return [ALL, ...Array.from(seen)] as Filter[];
  }, []);

  const collapsed = filter === ALL && !expanded;
  const visible = useMemo(() => {
    if (filter !== ALL) return tools.filter((t) => t.category === filter);
    return expanded ? tools : featuredTools;
  }, [filter, expanded]);

  // The grid height changes with the filter, so later scroll triggers must be re-measured.
  useEffect(() => {
    if (!interacted) return;
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [filter, expanded, interacted]);

  // This section can mount after the sections below it have measured themselves (it is code-split).
  useEffect(() => {
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, []);

  useSpotlight(gridRef, ".tool-tile");
  useSpotlight(cloudRef, ".cloud-card");

  useGsap(sectionRef, ({ reveal }, root) => {
    const grid = gridRef.current;
    const clouds = cloudRef.current;
    if (!grid || !clouds) return;

    reveal(Array.from(grid.children), { y: 36, scale: 0.96, stagger: 0.035, trigger: grid, duration: 0.8 });

    root.querySelectorAll<HTMLElement>(".toolkit-subhead-late").forEach((el) => {
      reveal(el, { y: 20, trigger: el, start: "top 90%" });
    });

    reveal(Array.from(clouds.querySelectorAll(".cloud-card")), { y: 32, stagger: 0.14, trigger: clouds, start: "top 90%" });
    reveal(clouds.querySelectorAll(".cloud-service"), {
      y: 10,
      scale: 0.7,
      stagger: 0.05,
      delay: 0.35,
      duration: 0.5,
      ease: "back.out(1.7)",
      trigger: clouds,
      start: "top 88%",
    });

    const frameworks = root.querySelector(".frameworks");
    if (frameworks) {
      reveal(frameworks.querySelectorAll(".framework"), {
        y: 14,
        scale: 0.85,
        stagger: 0.05,
        duration: 0.55,
        ease: "back.out(1.6)",
        trigger: frameworks,
        start: "top 92%",
      });
    }
  });

  const total = tools.length;

  return (
    <section ref={sectionRef} id="tools" className="section toolkit" aria-labelledby="tools-title">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Tools & Workflow"
          title="Toolkit, DevOps & Agentic AI"
          description="The apps I plan, design and collaborate in, how my code gets built, shipped and kept running, and how I build AI agents."
          titleId="tools-title"
        />

        {/* ── Apps ── */}
        <div className="toolkit-subhead">
          <h3 className="toolkit-subtitle">Apps &amp; technologies</h3>
          <span className="toolkit-rule" aria-hidden="true" />
          <span className="toolkit-count" aria-live="polite">
            {collapsed ? `${visible.length} of ${total}` : visible.length} {visible.length === 1 && !collapsed ? "tool" : "tools"}
          </span>
        </div>

        <div className="tool-filters" role="group" aria-label="Filter tools by category">
          {categories.map((c) => {
            const count = c === ALL ? total : tools.filter((t) => t.category === c).length;
            return (
              <button
                key={c}
                type="button"
                className="tool-filter"
                aria-pressed={filter === c}
                onClick={() => {
                  setInteracted(true);
                  setFilter(c);
                }}
              >
                {c}
                <span className="tool-filter-count" aria-hidden="true">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <ul ref={gridRef} className="tool-grid" data-filtered={interacted || undefined}>
          {visible.map((tool) => (
            <li
              key={tool.name}
              className="tool-tile card card-interactive spotlight"
              style={{ "--tool-hue": tool.hue } as CSSProperties}
            >
              <div className="tool-top">
                <span className="tool-icon" aria-hidden="true">
                  <BrandIcon name={tool.name} fallback={tool.fallback} size={24} />
                </span>
                <div className="tool-id">
                  <h4 className="tool-name">{tool.name}</h4>
                  <span className="tool-category">{tool.category}</span>
                </div>
              </div>
              <p className="tool-use">{tool.use}</p>
            </li>
          ))}
        </ul>

        {filter === ALL && (
          <div className="tool-more">
            <button
              type="button"
              className="btn btn-secondary"
              aria-expanded={expanded}
              onClick={() => {
                setInteracted(true);
                setExpanded((v) => !v);
              }}
            >
              {expanded ? "Show fewer tools" : `Show all ${total} tools`}
              <ChevronDown size={16} aria-hidden="true" className="tool-more-chevron" data-open={expanded || undefined} />
            </button>
          </div>
        )}

        {/* ── DevOps pipeline ── */}
        <div className="toolkit-subhead toolkit-subhead-devops toolkit-subhead-late">
          <h3 className="toolkit-subtitle">{devops.heading}</h3>
          <span className="toolkit-rule" aria-hidden="true" />
          <span className="toolkit-count">{devops.stages.length} stages</span>
        </div>
        <p className="toolkit-lede">{devops.description}</p>

        <Pipeline stages={devops.stages} />

        <div ref={cloudRef} className="cloud-grid">
          {devops.clouds.map((cloud) => (
            <div key={cloud.name} className="cloud-card card spotlight" style={{ "--cloud-hue": cloud.hue } as CSSProperties}>
              <div className="cloud-head">
                <span className="cloud-icon" aria-hidden="true">
                  <BrandIcon name={cloud.name} size={30} />
                </span>
                <div className="cloud-copy">
                  <p className="cloud-label">Cloud platform</p>
                  <h4 className="cloud-name">{cloud.name}</h4>
                </div>
              </div>
              <p className="cloud-summary">{cloud.summary}</p>
              <ul className="cloud-services" aria-label={`${cloud.name} services`}>
                {cloud.services.map((svc) => (
                  <li key={svc} className="cloud-service">
                    {svc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Agentic AI ── */}
        <div className="toolkit-subhead toolkit-subhead-devops toolkit-subhead-late">
          <h3 className="toolkit-subtitle">{agentic.heading}</h3>
          <span className="toolkit-rule" aria-hidden="true" />
          <span className="toolkit-count">Agent loop</span>
        </div>
        <p className="toolkit-lede">{agentic.description}</p>

        <Pipeline stages={agentic.stages} loop />

        <ul className="frameworks" aria-label="Agent frameworks and tooling">
          {agentic.frameworks.map((f) => (
            <li key={f.name} className="framework">
              <BrandIcon name={f.name} fallback={f.fallback} size={20} />
              {f.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
