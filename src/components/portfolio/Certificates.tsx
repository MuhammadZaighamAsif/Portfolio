import { useRef, useEffect } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { certificates } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Certificates() {
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

      const items = gridRef.current?.querySelectorAll(".cert-item");
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certificates" className="section section-certificates">
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
            Credentials
          </p>
          <h2 className="text-heading mb-6">
            Certificates
          </h2>
          <p className="text-body-large">
            Verified achievements from leading platforms and institutions.
          </p>
        </div>

        {/* Certificates Grid */}
        <div ref={gridRef} className="grid-minimal">
          {certificates.map((cert) => (
            <article
              key={cert.title}
              className="cert-item card-minimal"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  <Award size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    {cert.title}
                  </h3>
                  <p className="text-sm font-medium mb-1" style={{ color: "var(--accent)" }}>
                    {cert.issuer}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {cert.platform}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                <span className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <Calendar size={14} />
                  {cert.date}
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm hover-underline transition-opacity hover:opacity-70"
                    style={{ color: "var(--accent)" }}
                  >
                    <ExternalLink size={14} />
                    Verify
                  </a>
                )}
              </div>
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
