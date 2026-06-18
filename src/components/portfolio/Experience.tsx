import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="experience" className="section-container">
      <div
        ref={ref}
        className={`section-inner transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-header">
          <span className="section-tag">Where I've worked</span>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            Professional roles and meaningful academic leadership that shaped my skills.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical rail */}
          <div className="timeline-rail" />

          <div className="space-y-10 pl-10">
            {experience.map((exp, i) => (
              <div
                key={i}
                className={`relative transition-all duration-700 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Dot */}
                <div className="timeline-dot">
                  {exp.type === "Academic" ? (
                    <GraduationCap size={10} className="text-white" />
                  ) : (
                    <Briefcase size={10} className="text-white" />
                  )}
                </div>

                <div className="glass-card p-6">
                  {/* Duration chip */}
                  <span className="date-chip mb-3 inline-block">{exp.duration}</span>

                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground-default">
                      {exp.role}
                    </h3>
                    <span className="type-badge">{exp.type}</span>
                  </div>

                  <p className="text-primary-color font-semibold text-sm mb-4">
                    {exp.company}
                  </p>

                  <ul className="space-y-2">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-sm text-foreground-subtle">
                        <span className="bullet-dot" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
