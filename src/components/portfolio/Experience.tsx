import { useRef, useState, useEffect } from "react";
import { Briefcase, FileText, GraduationCap, X } from "lucide-react";
import { experience } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactBitsText from "@/components/ui/ReactBitsText";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const openModal = (url: string) => {
    setModalUrl(url);
    try { 
      document.body.style.overflow = "hidden"; 
    } catch (error) {
      // Silently handle error
    }
  };

  const closeModal = () => {
    setModalUrl(null);
    try { 
      document.body.style.overflow = ""; 
    } catch (error) {
      // Silently handle error
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const title = headerRef.current?.querySelector("h2");
      const description = headerRef.current?.querySelector("p:last-child");

      // Timeline-like horizontal reveal
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
      gsap.from(description, { scrollTrigger: { trigger: headerRef.current, start: "top 80%" }, x: 20, duration: 0.7, delay: 0.15, ease: "power2.out" });

      const items = itemsRef.current?.querySelectorAll(".experience-item");
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: itemsRef.current,
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

          {/* Experience List */}
          <div ref={itemsRef} className="experience-list max-w-3xl space-y-8">
            {experience.map((exp) => (
              <article
                key={`${exp.company}-${exp.duration}`}
                className="experience-item experience-card card-minimal"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="experience-icon w-10 h-10 flex items-center justify-center rounded-full"
                        style={{
                          background: "var(--accent)",
                          color: "var(--bg-primary)",
                        }}
                      >
                        {exp.type === "Academic" ? (
                          <GraduationCap size={18} />
                        ) : (
                          <Briefcase size={18} />
                        )}
                      </div>
                      <span
                        className="text-xs px-3 py-1 rounded-full border uppercase tracking-wider font-medium"
                        style={{
                          borderColor: "var(--border-color)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                      {exp.role}
                    </h3>
                    <p className="font-medium" style={{ color: "var(--accent)" }}>
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className="experience-date text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {exp.duration}
                  </span>
                </div>

                {/* Description */}
                <ul className="experience-bullets space-y-2 mb-6">
                  {exp.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="experience-bullet flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span style={{ color: "var(--accent)" }}>•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Certificates */}
                {exp.company === "Developers Hub Corporation" && (
                  <div className="experience-documents flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                    <button
                      onClick={() => openModal('/developers_hub_completion_cert.pdf')}
                      className="document-button inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition-all"
                      style={{
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <FileText size={16} />
                      Certificate
                    </button>
                    <button
                      onClick={() => openModal('/dev_hub_offer_letter.pdf')}
                      className="document-button inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition-all"
                      style={{
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <FileText size={16} />
                      Offer Letter
                    </button>
                  </div>
                )}
                {exp.company === "Quantum Logics Pvt Ltd" && (
                  <div className="experience-documents flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                    <button
                      onClick={() => openModal('/quantum_logics_offer_letter.pdf')}
                      className="document-button inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition-all"
                      style={{
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <FileText size={16} />
                      Offer Letter
                    </button>
                    <button
                      onClick={() => openModal('/qubit-report-1.pdf')}
                      className="document-button inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition-all"
                      style={{
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <FileText size={16} />
                      Project Report
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="container-custom mt-24">
          <div className="line" />
        </div>
      </section>

      {/* Modal */}
      {modalUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.9)" }}
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border transition-colors"
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <iframe
              src={modalUrl}
              className="w-full h-[80vh]"
              title="Document"
            />
          </div>
        </div>
      )}
    </>
  );
}
