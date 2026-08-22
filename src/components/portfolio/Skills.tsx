import { useRef, useEffect } from "react";
import { skills } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards stagger
      const cards = gridRef.current?.querySelectorAll(".skill-group");
      if (cards) {
        gsap.from(cards, {
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
    <section ref={sectionRef} id="skills" className="section section-skills">
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
            Technical Expertise
          </p>
          <h2 className="text-heading mb-6">
            Skills & Technologies
          </h2>
          <p className="text-body-large">
            A comprehensive toolkit for building modern, scalable applications across the full stack.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid-minimal">
          {skills.map((group) => (
            <div
              key={group.category}
              className="skill-group card-minimal"
            >
              {/* Category */}
              <h3 
                className="text-xl font-semibold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                {group.category}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip px-3 py-1.5 text-sm border rounded-full transition-colors"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
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
