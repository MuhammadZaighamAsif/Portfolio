import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";
import { education } from "@/data/portfolio";

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="education" className="section-container">
      <div
        ref={ref}
        className={`section-inner transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-header">
          <span className="section-tag">Academic background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Building a strong foundation in software engineering and computer science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((edu, i) => (
            <div
              key={i}
              className="glass-card p-6 group"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="education-icon-wrap shrink-0">
                  <GraduationCap size={22} className="text-primary-color" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground-default mb-1 leading-snug group-hover:text-primary-color transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-primary-color font-semibold text-sm mb-3">
                    {edu.institution}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-foreground-subtle mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-accent-color" />
                      {edu.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-accent-color" />
                      {edu.location}
                    </span>
                  </div>
                  <p className="text-xs text-foreground-subtle leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
