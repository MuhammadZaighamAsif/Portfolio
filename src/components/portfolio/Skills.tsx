import { useMemo, useRef, type CSSProperties } from "react";
import { Bot, Cloud, Code2, Server, BrainCircuit, LayoutGrid, Database, Wrench, type LucideIcon } from "lucide-react";
import { skills } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import { useGsap } from "@/lib/animations";
import { useSpotlight } from "@/lib/pointerFx";
import "@/styles/skills.css";

const categoryIcons: Record<string, LucideIcon> = {
  "Programming Languages": Code2,
  Backend: Server,
  "AI / Data": BrainCircuit,
  Frontend: LayoutGrid,
  Databases: Database,
  Tools: Wrench,
  "DevOps & Cloud": Cloud,
  "Agentic AI": Bot,
};

/** Seconds per item for the marquee, so every row drifts at the same slow speed. */
const SECONDS_PER_ITEM = 3.4;

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Each copy is repeated so it is always wider than the viewport; two copies make the loop seamless.
  const copy = [...items, ...items];
  const style = { "--marquee-duration": `${copy.length * SECONDS_PER_ITEM}s` } as CSSProperties;
  return (
    <div className="marquee-row" style={style} data-reverse={reverse || undefined}>
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <ul key={n} className="marquee-set" aria-hidden="true">
            {copy.map((name, i) => (
              <li key={`${name}-${i}`} className={i >= items.length ? "marquee-item marquee-rep" : "marquee-item"}>
                <span className="marquee-dot" />
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSpotlight(gridRef);

  const rows = useMemo(() => {
    const all = Array.from(new Set(skills.flatMap((g) => g.items)));
    const mid = Math.ceil(all.length / 2);
    return [all.slice(0, mid), all.slice(mid)];
  }, []);

  useGsap(sectionRef, (helpers) => {
    const { reveal } = helpers;
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.children);
    reveal(cards, { y: 50, stagger: 0.1, trigger: grid });
    cards.forEach((card) => {
      reveal(card.querySelectorAll(".skill-chip"), {
        y: 10,
        scale: 0.7,
        stagger: 0.04,
        duration: 0.5,
        delay: 0.35,
        ease: "back.out(1.7)",
        trigger: card,
        start: "top 85%",
      });
    });
    const marquee = sectionRef.current?.querySelector(".skills-marquee");
    if (marquee) reveal(marquee, { y: 24, duration: 0.9, trigger: marquee, start: "top 92%" });
  });

  return (
    <section ref={sectionRef} id="skills" className="section section-alt skills" aria-labelledby="skills-title">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Technical Expertise"
          title="Skills & Technologies"
          description="A comprehensive toolkit for building modern, scalable applications across the full stack."
          titleId="skills-title"
        />

        <div ref={gridRef} className="skills-grid">
          {skills.map((group, index) => {
            const Icon = categoryIcons[group.category] ?? Code2;
            const headingId = `skills-${index}-title`;
            return (
              <article
                key={group.category}
                className="skill-card card card-pad card-interactive spotlight"
                aria-labelledby={headingId}
              >
                <span className="skill-card-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <header className="skill-card-header">
                  <span className="skill-card-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 id={headingId} className="skill-card-title">
                      {group.category}
                    </h3>
                    <p className="skill-card-count">
                      {group.items.length} {group.items.length === 1 ? "skill" : "skills"}
                    </p>
                  </div>
                </header>
                <ul className="skill-chips">
                  {group.items.map((skill) => (
                    <li key={skill} className="skill-chip chip chip-neutral">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>

      <div className="skills-marquee" aria-hidden="true">
        {rows.map((items, i) => (
          <MarqueeRow key={i} items={items} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
