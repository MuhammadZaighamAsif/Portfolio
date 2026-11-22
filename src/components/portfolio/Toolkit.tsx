import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  Chrome,
  Cloud,
  Code2,
  Container,
  Database,
  Figma,
  Files,
  Github,
  GitBranch,
  Hammer,
  Kanban,
  ListChecks,
  MessageSquare,
  MessagesSquare,
  NotebookText,
  Package,
  PenTool,
  Rocket,
  Send,
  Server,
  Slack,
  Sparkles,
  Terminal,
  Trello,
  Users,
  Video,
  Webcam,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";
import { devops, tools, type PipelineStage, type ToolCategory, type ToolIcon } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import { ScrollTrigger, gsap, useGsap } from "@/lib/animations";
import { useSpotlight } from "@/lib/pointerFx";
import "@/styles/toolkit.css";

const toolIcons: Record<ToolIcon, LucideIcon> = {
  slack: Slack,
  teams: Users,
  discord: MessagesSquare,
  zoom: Video,
  meet: Webcam,
  notion: NotebookText,
  linear: ListChecks,
  jira: Kanban,
  trello: Trello,
  workspace: Files,
  figma: Figma,
  canva: PenTool,
  github: Github,
  git: GitBranch,
  vscode: Code2,
  linux: Terminal,
  postman: Send,
  docker: Container,
  devtools: Chrome,
  compass: Database,
  npm: Package,
  chatgpt: MessageSquare,
  claude: Sparkles,
  copilot: BrainCircuit,
};

const ALL = "All" as const;
type Filter = typeof ALL | ToolCategory;

const stageIcons: Record<PipelineStage["icon"], LucideIcon> = {
  source: GitBranch,
  build: Hammer,
  deploy: Rocket,
  operate: Server,
};

export default function Toolkit() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const pipeRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>(ALL);
  const [filtered, setFiltered] = useState(false); // true once the visitor has used a filter tab

  const categories = useMemo(() => {
    const seen = new Set<ToolCategory>();
    tools.forEach((t) => seen.add(t.category));
    return [ALL, ...Array.from(seen)] as Filter[];
  }, []);
  const visible = useMemo(() => (filter === ALL ? tools : tools.filter((t) => t.category === filter)), [filter]);

  // The grid height changes with the filter, so later scroll triggers must be re-measured.
  useEffect(() => {
    if (!filtered) return;
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [filter, filtered]);

  useSpotlight(gridRef, ".tool-tile");
  useSpotlight(pipeRef, ".pipe-stage, .cloud-card");

  useGsap(sectionRef, ({ reveal, drawLine }, root) => {
    const grid = gridRef.current;
    const pipe = pipeRef.current;
    if (!grid || !pipe) return;

    reveal(Array.from(grid.children), { y: 36, scale: 0.96, stagger: 0.035, trigger: grid, duration: 0.8 });

    reveal(root.querySelector(".toolkit-subhead-devops"), { y: 20, trigger: pipe, start: "top 88%" });

    const stages = Array.from(pipe.querySelectorAll<HTMLElement>(".pipe-stage"));
    reveal(stages, { y: 40, stagger: 0.14, trigger: pipe, start: "top 82%", duration: 0.85 });

    // Nodes pop in after their card has started to arrive.
    const nodes = Array.from(pipe.querySelectorAll<HTMLElement>(".pipe-node"));
    nodes.forEach((node, i) => {
      gsap.fromTo(
        node,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          delay: 0.25 + i * 0.14,
          ease: "back.out(2.4)",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: pipe, start: "top 82%", once: true },
        }
      );
    });

    // Rails draw with the scroll (horizontal on desktop, vertical on mobile; the hidden one is inert).
    drawLine(pipe.querySelector(".pipe-rail-x"), { axis: "x", trigger: pipe, start: "top 75%", end: "bottom 70%" });
    drawLine(pipe.querySelector(".pipe-rail-y"), { axis: "y", trigger: pipe, start: "top 75%", end: "bottom 70%" });

    const clouds = pipe.querySelector(".cloud-grid");
    reveal(Array.from(pipe.querySelectorAll(".cloud-card")), { y: 32, stagger: 0.14, trigger: clouds, start: "top 90%" });
    reveal(pipe.querySelectorAll(".cloud-service"), {
      y: 10,
      scale: 0.7,
      stagger: 0.05,
      delay: 0.35,
      duration: 0.5,
      ease: "back.out(1.7)",
      trigger: clouds,
      start: "top 88%",
    });
  });

  return (
    <section ref={sectionRef} id="tools" className="section toolkit" aria-labelledby="tools-title">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Tools & Workflow"
          title="Toolkit & DevOps"
          description="The apps I plan, design and collaborate in, and how my code gets built, shipped and kept running."
          titleId="tools-title"
        />

        {/* ── Apps ── */}
        <div className="toolkit-subhead">
          <h3 className="toolkit-subtitle">Apps I work in</h3>
          <span className="toolkit-rule" aria-hidden="true" />
          <span className="toolkit-count" aria-live="polite">
            {visible.length} {visible.length === 1 ? "tool" : "tools"}
          </span>
        </div>

        <div className="tool-filters" role="group" aria-label="Filter tools by category">
          {categories.map((c) => {
            const count = c === ALL ? tools.length : tools.filter((t) => t.category === c).length;
            return (
              <button
                key={c}
                type="button"
                className="tool-filter"
                aria-pressed={filter === c}
                onClick={() => {
                  setFiltered(true);
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

        <ul ref={gridRef} className="tool-grid" data-filtered={filtered || undefined}>
          {visible.map((tool) => {
            const Icon = toolIcons[tool.icon];
            return (
              <li
                key={tool.name}
                className="tool-tile card card-interactive spotlight"
                style={{ "--tool-hue": tool.hue } as CSSProperties}
              >
                <div className="tool-top">
                  <span className="tool-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div className="tool-id">
                    <h4 className="tool-name">{tool.name}</h4>
                    <span className="tool-category">{tool.category}</span>
                  </div>
                </div>
                <p className="tool-use">{tool.use}</p>
              </li>
            );
          })}
        </ul>

        {/* ── DevOps pipeline ── */}
        <div className="toolkit-subhead toolkit-subhead-devops">
          <h3 className="toolkit-subtitle">{devops.heading}</h3>
          <span className="toolkit-rule" aria-hidden="true" />
          <span className="toolkit-count">{devops.stages.length} stages</span>
        </div>
        <p className="toolkit-lede">{devops.description}</p>

        <div ref={pipeRef} className="pipe">
          <div className="pipe-track">
            <span className="pipe-rail pipe-rail-x" aria-hidden="true" />
            <span className="pipe-rail pipe-rail-y" aria-hidden="true" />
          <ol className="pipe-stages">
            {devops.stages.map((stage, i) => {
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
                      <li key={t} className="chip chip-neutral pipe-tool">
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
          </div>

          <div className="cloud-grid">
            {devops.clouds.map((cloud) => (
              <div key={cloud.name} className="cloud-card card spotlight" style={{ "--cloud-hue": cloud.hue } as CSSProperties}>
                <div className="cloud-head">
                  <span className="cloud-icon" aria-hidden="true">
                    <Cloud size={24} strokeWidth={1.7} />
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
        </div>
      </div>
    </section>
  );
}
