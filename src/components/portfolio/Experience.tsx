import { useCallback, useRef, useState } from "react";
import { Briefcase, Calendar, FileText, GraduationCap } from "lucide-react";
import { experience } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import DocumentViewer, { type ViewerDocument } from "@/components/portfolio/DocumentViewer";
import { startYear } from "@/components/portfolio/journey";
import { EASE, gsap, useGsap } from "@/lib/animations";
import { useSpotlight } from "@/lib/pointerFx";
import "@/styles/experience.css";

interface ExperienceDocument {
  label: string;
  url: string;
}

const documentMap: Record<string, ExperienceDocument[]> = {
  "Developers Hub Corporation": [
    { label: "Certificate", url: "/developers_hub_completion_cert.pdf" },
    { label: "Offer Letter", url: "/dev_hub_offer_letter.pdf" },
  ],
  "Quantum Logics Pvt Ltd": [
    { label: "Offer Letter", url: "/quantum_logics_offer_letter.pdf" },
    { label: "Project Report", url: "/qubit-report-1.pdf" },
  ],
};

const DESKTOP = "(min-width: 900px)";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [open, setOpen] = useState<{ id: number; doc: ViewerDocument; trigger: HTMLElement } | null>(null);
  const openCount = useRef(0);

  const openModal = useCallback((doc: ViewerDocument, trigger: HTMLElement) => {
    // A fresh key per open means re-opening during an exit animation mounts a new viewer.
    openCount.current += 1;
    setOpen({ id: openCount.current, doc, trigger });
  }, []);
  const handleClosed = useCallback(() => setOpen(null), []);

  useSpotlight(listRef, ".exp-card");

  useGsap(sectionRef, (helpers, root) => {
    const desktop = window.matchMedia(DESKTOP).matches;
    const items = gsap.utils.toArray<HTMLElement>(".exp-item", root);

    items.forEach((item) => {
      const node = item.querySelector(".exp-node");
      const card = item.querySelector(".exp-card");
      const year = item.querySelector(".exp-year");
      const bullets = item.querySelectorAll(".exp-bullet");
      const docs = item.querySelectorAll(".exp-docs");
      const seg = item.querySelector<HTMLElement>(".exp-seg-fill");

      // Cards slide in from their outer edge (desktop) or out of the rail (mobile).
      const dir = desktop ? (item.dataset.side === "left" ? -1 : 1) : -0.55;

      const tl = gsap.timeline({
        defaults: { ease: EASE.out },
        scrollTrigger: { trigger: item, start: "top 84%", once: true },
      });
      if (node) {
        tl.fromTo(
          node,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.65, ease: "back.out(2.2)", clearProps: "opacity,transform" },
          0
        );
      }
      if (card) {
        tl.fromTo(
          card,
          { opacity: 0, x: dir * 44 },
          { opacity: 1, x: 0, duration: 0.85, clearProps: "opacity,transform" },
          0.08
        );
      }
      if (year) {
        tl.fromTo(year, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, clearProps: "opacity,transform" }, 0.3);
      }
      if (bullets.length) {
        tl.fromTo(
          bullets,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.09, clearProps: "opacity,transform" },
          0.38
        );
      }
      if (docs.length) {
        tl.fromTo(docs, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55, clearProps: "opacity,transform" }, 0.62);
      }

      // Rail segment from this node to the next draws with the scroll.
      if (seg) {
        helpers.drawLine(seg, { axis: "y", trigger: item, start: "top 62%", end: "bottom 52%" });
      }
    });
  });

  return (
    <>
      <section ref={sectionRef} id="experience" className="section exp" aria-labelledby="experience-title">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Career Journey"
            title="Experience"
            description="Professional roles and academic leadership that shaped my technical expertise."
            titleId="experience-title"
          />

          <ol ref={listRef} className="exp-list">
            {experience.map((exp, index) => {
              const isCurrent = exp.duration.toLowerCase().includes("present");
              const docs = documentMap[exp.company];
              const isLast = index === experience.length - 1;
              const year = startYear(exp.duration);
              const Icon = exp.type === "Academic" ? GraduationCap : Briefcase;

              return (
                <li
                  key={`${exp.company}-${exp.duration}`}
                  className="exp-item"
                  data-side={index % 2 === 0 ? "left" : "right"}
                  data-current={isCurrent ? "true" : undefined}
                >
                  {!isLast && (
                    <span className="exp-seg" aria-hidden="true">
                      <span className="exp-seg-fill" />
                    </span>
                  )}

                  <span className="exp-node" aria-hidden="true">
                    {isCurrent && <span className="exp-node-pulse" />}
                    <span className="exp-node-core">
                      <Icon size={18} />
                    </span>
                  </span>

                  {year && (
                    <span className="exp-year" aria-hidden="true">
                      {year}
                    </span>
                  )}

                  <article className="exp-card card card-interactive spotlight">
                    <div className="exp-meta">
                      <span className="chip chip-neutral">{exp.type}</span>
                      {isCurrent && (
                        <span className="chip exp-current">
                          <span className="status-dot" aria-hidden="true" />
                          Current
                        </span>
                      )}
                      <span className="exp-date">
                        <Calendar size={14} aria-hidden="true" />
                        {exp.duration}
                      </span>
                    </div>

                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}</p>

                    <ul className="exp-bullets">
                      {exp.bullets.map((bullet) => (
                        <li key={bullet} className="exp-bullet">
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {docs && (
                      <div className="exp-docs">
                        <span className="exp-docs-label">Documents</span>
                        <div className="exp-docs-list">
                          {docs.map((doc) => (
                            <button
                              key={doc.url}
                              type="button"
                              onClick={(e) => openModal({ ...doc, company: exp.company }, e.currentTarget)}
                              className="btn btn-secondary btn-sm document-button"
                              aria-haspopup="dialog"
                            >
                              <FileText size={15} aria-hidden="true" />
                              {doc.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {open && <DocumentViewer key={open.id} doc={open.doc} trigger={open.trigger} onClosed={handleClosed} />}
    </>
  );
}
