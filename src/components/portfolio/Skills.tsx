import { useRef } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="skills" className="section-container">
      <div
        ref={ref}
        className={`section-inner transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-header">
          <span className="section-tag">What I know</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A curated set of tools and technologies I use to build modern, scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, gi) => (
            <div
              key={group.category}
              className="glass-card p-6"
              style={{ transitionDelay: `${gi * 80}ms` }}
            >
              <h3 className="skill-category-label mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="skill-badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
