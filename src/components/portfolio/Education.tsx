import { useRef } from "react";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import { isOngoing } from "@/components/portfolio/journey";
import { gsap, useGsap } from "@/lib/animations";
import { useSpotlight } from "@/lib/pointerFx";
import "@/styles/education.css";

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useSpotlight(listRef, ".edu-card");

  useGsap(sectionRef, (helpers, root) => {
    const list = root.querySelector<HTMLElement>(".edu-list");
    if (!list) return;

    // Cards rise in a stagger; icon tiles pop a beat later.
    helpers.reveal(gsap.utils.toArray(".edu-card", list), { y: 44, stagger: 0.16, trigger: list, start: "top 84%" });
    helpers.reveal(gsap.utils.toArray(".edu-tile", list), {
      y: 0,
      scale: 0.5,
      stagger: 0.16,
      delay: 0.12,
      duration: 0.7,
      ease: "back.out(2)",
      trigger: list,
      start: "top 84%",
    });

    // Connector between the two tiles draws as the list scrolls into the middle of the viewport.
    gsap.utils.toArray<HTMLElement>(".edu-line-fill", list).forEach((fill) => {
      helpers.drawLine(fill, { axis: "x", trigger: list, start: "top 78%", end: "top 38%" });
    });
  });

  return (
    <section ref={sectionRef} id="education" className="section section-alt edu" aria-labelledby="education-title">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Academic Background"
          title="Education"
          description="Building a strong foundation in software engineering and computer science."
          titleId="education-title"
        />

        <ol ref={listRef} className="edu-list">
          {education.map((edu, index) => {
            const ongoing = isOngoing(edu.duration);
            const isLast = index === education.length - 1;

            return (
              <li key={edu.institution} className="edu-item" data-ongoing={ongoing ? "true" : undefined}>
                <div className="edu-top" aria-hidden="true">
                  <span className="edu-tile">
                    <GraduationCap size={22} />
                  </span>
                  {!isLast && (
                    <span className="edu-line">
                      <span className="edu-line-fill" />
                    </span>
                  )}
                </div>

                <article className="edu-card card card-interactive card-pad spotlight">
                  <span className={`chip edu-status${ongoing ? "" : " chip-neutral"}`}>
                    {ongoing && <span className="status-dot" aria-hidden="true" />}
                    {ongoing ? "In progress" : "Completed"}
                  </span>

                  <h3 className="edu-degree">{edu.degree}</h3>
                  <p className="edu-institution">{edu.institution}</p>

                  <ul className="edu-facts">
                    <li>
                      <MapPin size={15} aria-hidden="true" />
                      <span className="sr-only">Location: </span>
                      {edu.location}
                    </li>
                    <li>
                      <Calendar size={15} aria-hidden="true" />
                      <span className="sr-only">Duration: </span>
                      {edu.duration}
                    </li>
                  </ul>

                  <p className="edu-desc">{edu.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
