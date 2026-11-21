import { useRef, useState, useEffect, useCallback } from "react";
import { Briefcase, FileText, GraduationCap, X } from "lucide-react";
import { experience } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactBitsText from "@/components/ui/ReactBitsText";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

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

interface OpenDocument extends ExperienceDocument {
  company: string;
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [openDoc, setOpenDoc] = useState<OpenDocument | null>(null);

  const openModal = useCallback((doc: OpenDocument, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpenDoc(doc);
  }, []);

  const closeModal = useCallback(() => {
    setOpenDoc(null);
  }, []);

  // Modal side effects: Escape to close, lock page scroll, move/restore focus.
  // Everything is cleaned up here, so unmounting while open can't leave the page locked.
  useEffect(() => {
    if (!openDoc) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [openDoc, closeModal]);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const title = headerRef.current?.querySelector("h2");
      const description = headerRef.current?.querySelector("p:last-child");

      if (title) {
        gsap.from(title, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: -34,
          duration: 0.8,
          ease: "power3.out",
        });
      }
      if (description) {
        gsap.from(description, {
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
          x: 20,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
        });
      }

      const items = itemsRef.current?.querySelectorAll(".timeline-item");
      if (items && items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: -40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      const nodes = itemsRef.current?.querySelectorAll(".timeline-node");
      if (nodes && nodes.length > 0) {
        gsap.from(nodes, {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          scale: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: "back.out(2)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="experience" className="section section-experience">
        <div className="container-custom">
          {/* Header */}
          <div ref={headerRef} className="max-w-3xl mb-16">
            <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
              Career Journey
            </p>
            <ReactBitsText text="Experience" variant="slide" className="text-heading mb-6" />
            <p className="text-body-large">
              Professional roles and academic leadership that shaped my technical expertise.
            </p>
          </div>

          {/* Timeline */}
          <div ref={itemsRef} className="timeline max-w-3xl">
            {experience.map((exp) => {
              const isCurrent = exp.duration.toLowerCase().includes("present");
              const docs = documentMap[exp.company];

              return (
                <div
                  key={`${exp.company}-${exp.duration}`}
                  className={`timeline-item${isCurrent ? " timeline-item-current" : ""}`}
                >
                  {/* Rail node */}
                  <div className="timeline-node" aria-hidden="true">
                    {isCurrent && <span className="timeline-node-pulse" />}
                    <span className="timeline-node-icon">
                      {exp.type === "Academic" ? (
                        <GraduationCap size={16} />
                      ) : (
                        <Briefcase size={16} />
                      )}
                    </span>
                  </div>

                  {/* Content card */}
                  <article className="timeline-card">
                    <div className="timeline-card-top">
                      <span className="timeline-badge">{exp.type}</span>
                      {isCurrent && <span className="timeline-current-badge">Current</span>}
                      <span className="timeline-date">{exp.duration}</span>
                    </div>

                    <h3 className="timeline-role">{exp.role}</h3>
                    <p className="timeline-company">{exp.company}</p>

                    <ul className="timeline-bullets">
                      {exp.bullets.map((bullet) => (
                        <li key={bullet} className="timeline-bullet">
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {docs && (
                      <div className="timeline-documents">
                        {docs.map((doc) => (
                          <button
                            key={doc.url}
                            type="button"
                            onClick={(e) =>
                              openModal({ ...doc, company: exp.company }, e.currentTarget)
                            }
                            className="document-button"
                            aria-haspopup="dialog"
                          >
                            <FileText size={16} aria-hidden="true" />
                            {doc.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="container-custom mt-24">
          <div className="line" />
        </div>
      </section>

      {/* Document viewer */}
      {openDoc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.9)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`${openDoc.company} — ${openDoc.label}`}
          onClick={(e) => {
            // Only a click on the backdrop itself closes the viewer.
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border transition-colors"
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
            }}
            aria-label="Close document"
          >
            <X size={20} aria-hidden="true" />
          </button>
          <div className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <iframe
              src={openDoc.url}
              className="w-full h-[80vh] bg-white"
              title={`${openDoc.company} — ${openDoc.label}`}
            />
          </div>
        </div>
      )}
    </>
  );
}
