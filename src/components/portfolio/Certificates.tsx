import { useRef } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";
import { certificates } from "@/data/portfolio";

export default function Certificates() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="certificates" className="section-container">
      <div
        ref={ref}
        className={`section-inner transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-header">
          <span className="section-tag">Credentials</span>
          <h2 className="section-title">Certificates</h2>
          <p className="section-subtitle">
            Verified learning achievements from leading platforms and universities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="glass-card p-6 group relative overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-primary opacity-10 rounded-bl-full" />

              <div className="cert-icon-wrap mb-4">
                <Award size={22} className="text-accent-color" />
              </div>

              <h3 className="font-semibold text-foreground-default mb-1 leading-snug group-hover:text-primary-color transition-colors text-sm">
                {cert.title}
              </h3>
              <p className="text-primary-color font-semibold text-xs mb-1">{cert.issuer}</p>
              <p className="text-xs text-foreground-subtle mb-3">{cert.platform}</p>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-foreground-subtle">
                  <Calendar size={11} className="text-accent-color" />
                  {cert.date}
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link text-xs"
                  >
                    <ExternalLink size={11} />
                    Verify
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
