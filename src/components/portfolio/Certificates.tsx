import { useRef } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { certificates } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap, useGsap } from "@/lib/animations";
import { useSpotlight, useTilt } from "@/lib/pointerFx";
import "@/styles/certificates.css";

type Certificate = (typeof certificates)[number];

/** Number of distinct accent hues defined in certificates.css (data-hue="0".."3"). */
const HUES = 4;

// Each issuer gets a stable hue, assigned in order of first appearance.
const issuers = Array.from(new Set(certificates.map((c) => c.issuer)));
const hueOf = (issuer: string) => issuers.indexOf(issuer) % HUES;

function CertificateCard({ cert }: { cert: Certificate }) {
  const cardRef = useRef<HTMLElement>(null);
  useTilt(cardRef, 4);

  return (
    <li className="cert-cell">
      <article ref={cardRef} className="cert-card card card-interactive spotlight" data-hue={hueOf(cert.issuer)}>
        <div className="cert-top">
          <span className="cert-tile" aria-hidden="true">
            {cert.issuer.charAt(0).toUpperCase()}
          </span>
          <Award className="cert-award" size={20} aria-hidden="true" />
        </div>

        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-source">
          <span className="cert-issuer">{cert.issuer}</span>
          <span className="sr-only"> on </span>
          <span className="chip chip-neutral cert-platform">{cert.platform}</span>
        </p>

        <div className="cert-foot">
          <span className="cert-date">
            <Calendar size={14} aria-hidden="true" />
            {cert.date}
          </span>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-verify hover-underline"
              aria-label={`Verify ${cert.title} credential (opens in a new tab)`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              Verify
            </a>
          )}
        </div>
      </article>
    </li>
  );
}

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useSpotlight(gridRef, ".cert-card");

  useGsap(sectionRef, (helpers, root) => {
    helpers.countUp(countRef.current, certificates.length, { duration: 1.1, start: "top 92%" });

    const cells = gsap.utils.toArray<HTMLElement>(".cert-cell", root);
    // Stagger by column within each row so cards that are scrolled to later still cascade nicely.
    const lefts = Array.from(new Set(cells.map((c) => c.offsetLeft))).sort((a, b) => a - b);
    cells.forEach((cell) => {
      const col = lefts.indexOf(cell.offsetLeft);
      helpers.reveal(cell, { y: 38, scale: 0.94, duration: 0.85, delay: col * 0.09, start: "top 90%" });
    });
  });

  return (
    <section ref={sectionRef} id="certificates" className="section certs" aria-labelledby="certificates-title">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Credentials"
          title="Certificates"
          description="Verified achievements from leading platforms and institutions."
          titleId="certificates-title"
        />

        <p className="cert-count">
          <span className="cert-count-num" ref={countRef}>
            {certificates.length}
          </span>{" "}
          {certificates.length === 1 ? "certification" : "certifications"}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">from </span>
          {issuers.length} {issuers.length === 1 ? "issuer" : "issuers"}
        </p>

        <ul ref={gridRef} className="cert-grid">
          {certificates.map((cert) => (
            <CertificateCard key={cert.title} cert={cert} />
          ))}
        </ul>
      </div>
    </section>
  );
}
