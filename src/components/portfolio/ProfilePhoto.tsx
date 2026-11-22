import { useRef } from "react";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import { education, experience, meta, projects } from "@/data/portfolio";
import { useTilt } from "@/lib/pointerFx";

const school = education[0];
const liveClientSites = projects.filter((p) => p.category === "Client Work" && p.live).length;

/**
 * Framed profile photo for the hero. Pure markup + pointer tilt; the hero's intro timeline and
 * scroll parallax animate its layers through the `.hp-*` class names (see styles/hero.css).
 * All chip copy is derived from src/data/portfolio.ts.
 */
export default function ProfilePhoto() {
  const tiltRef = useRef<HTMLDivElement>(null);
  useTilt(tiltRef, 5);
  const { photo } = meta;

  return (
    <div className="hp">
      <div className="hp-glow" aria-hidden="true" />
      <div className="hp-float">
        <div className="hp-stage">
          <div ref={tiltRef} className="hp-tilt">
            <div className="hp-ring">
              <div className="hp-frame">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${photo.webpSmall} 420w, ${photo.webp} 700w`}
                    sizes="(min-width: 1024px) 416px, 80vw"
                  />
                  <img
                    src={photo.jpg}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
                <div className="hp-scrim" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="hp-chip hp-chip--tr" aria-hidden="true">
            <span className="hp-chip-icon"><Briefcase size={14} /></span>
            {experience.length} internships
          </div>
          <div className="hp-chip hp-chip--bl" aria-hidden="true">
            <span className="hp-chip-icon"><GraduationCap size={14} /></span>
            {school.institution} {school.location}
          </div>
          {liveClientSites > 0 && (
            <div className="hp-chip hp-chip--br" aria-hidden="true">
              <span className="hp-chip-icon"><Rocket size={14} /></span>
              {liveClientSites} live client site{liveClientSites === 1 ? "" : "s"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
