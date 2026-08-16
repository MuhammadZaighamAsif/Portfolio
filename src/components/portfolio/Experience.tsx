import { useRef, useState, useEffect } from "react";
import { Briefcase, FileText, GraduationCap, ArrowUpRight, X } from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const openModal = (url: string) => {
    setModalUrl(url);
    try { document.body.style.overflow = "hidden"; } catch {}
  };

  const closeModal = () => {
    setModalUrl(null);
    try { document.body.style.overflow = ""; } catch {}
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
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
          <div className="timeline-rail" />

          <div className="space-y-8 pl-10">
            {experience.map((exp, i) => (
              <div
                key={`${exp.company}-${exp.duration}`}
                className={`relative transition-all duration-700 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="timeline-dot">
                  {exp.type === "Academic" ? (
                    <GraduationCap size={10} className="text-white" />
                  ) : (
                    <Briefcase size={10} className="text-white" />
                  )}
                </div>

                <div className="experience-card glass-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <span className="date-chip">{exp.duration}</span>
                    <span className="type-badge">{exp.type}</span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground-default leading-tight">
                      {exp.role}
                    </h3>
                    <p className="experience-company mt-2">{exp.company}</p>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2.5 text-sm leading-6 text-foreground-subtle">
                        <span className="bullet-dot" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {exp.company === "Developers Hub Corporation" && (
                      <button
                        onClick={() => openModal('/developers_hub_completion_cert.pdf')}
                        className="experience-cta"
                      >
                        <FileText size={15} />
                        View Certificate
                        <ArrowUpRight size={14} />
                      </button>
                    )}

                    {exp.company === "Exper System Solution" && (
                      <button
                        onClick={() => openModal('/ESS offer letter.png')}
                        className="experience-cta experience-cta-primary"
                      >
                        <FileText size={15} />
                        View Offer Letter
                        <ArrowUpRight size={14} />
                      </button>
                    )}

                    {exp.company === "Quantum Logics Pvt Ltd" && (
                      <>
                        <button
                          onClick={() => openModal('/internship-certificate.pdf')}
                          className="experience-cta"
                        >
                          <FileText size={15} />
                          View Certificate
                          <ArrowUpRight size={14} />
                        </button>
                        <button
                          onClick={() => openModal(encodeURI('/qubit-report (1).pdf'))}
                          className="experience-cta experience-cta-secondary"
                        >
                          <FileText size={15} />
                          View Report
                          <ArrowUpRight size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {modalUrl && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
        <div className="relative z-10 w-full max-w-5xl h-[80vh] bg-card border border-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-border bg-background">
            <div className="text-sm font-semibold">Document preview</div>
            <div className="flex items-center gap-2">
              <a href={modalUrl} target="_blank" rel="noopener noreferrer" className="card-link">Open in new tab</a>
              <button onClick={closeModal} className="p-2 rounded hover:bg-muted"><X size={16} /></button>
            </div>
          </div>
          <iframe src={modalUrl} className="w-full h-full" title="Document preview" />
        </div>
      </div>
    )}
    </>
  );
}
