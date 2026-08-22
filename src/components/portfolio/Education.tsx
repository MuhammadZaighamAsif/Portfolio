import { useRef, useEffect } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { education } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      const items = gridRef.current?.querySelectorAll(".education-item");
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="section section-education">
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
            Academic Background
          </p>
          <h2 className="text-heading mb-6">
            Education
          </h2>
          <p className="text-body-large">
            Building a strong foundation in software engineering and computer science.
          </p>
        </div>

        {/* Education Grid */}
        <div ref={gridRef} className="grid-minimal max-w-4xl">
          {education.map((edu) => (
            <article
              key={edu.institution}
              className="education-item card-minimal"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {edu.degree}
                  </h3>
                  <p className="font-medium mb-3" style={{ color: "var(--accent)" }}>
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-4 text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {edu.duration}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {edu.location}
                </span>
              </div>

              {/* Description */}
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {edu.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom mt-24">
        <div className="line" />
      </div>
    </section>
  );
}
