import { useRef } from "react";
import { ArrowRight, BrainCircuit, Download, Layers, Rocket, type LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { about } from "@/data/portfolio";
import { showAchievement } from "@/lib/achievement";
import { useGsap } from "@/lib/animations";
import { scrollToSection } from "@/lib/motion";
import { useSpotlight } from "@/lib/pointerFx";
import "@/styles/about.css";

const FOCUS_ICONS: LucideIcon[] = [Layers, BrainCircuit, Rocket];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  useSpotlight(cardsRef);

  useGsap(rootRef, (helpers, root) => {
    helpers.reveal(root.querySelectorAll(".about-text p"), {
      y: 26,
      stagger: 0.14,
      trigger: root.querySelector(".about-text"),
      start: "top 88%",
    });
    helpers.reveal(root.querySelector(".about-actions"), {
      y: 20,
      delay: 0.15,
      start: "top 95%",
    });
    helpers.reveal(root.querySelectorAll(".about-card"), {
      y: 40,
      stagger: 0.14,
      duration: 1,
      trigger: root.querySelector(".about-cards"),
      start: "top 85%",
    });
  });

  return (
    <section ref={rootRef} id="about" className="section about" aria-labelledby="about-title">
      <div className="container-custom about-grid">
        <div className="about-copy">
          <SectionHeader eyebrow={about.eyebrow} title={about.title} titleId="about-title" />

          <div className="about-text">
            {about.paragraphs.map((text, i) => (
              <p key={i} className={i === 0 ? "about-lede" : undefined}>
                {text}
              </p>
            ))}
          </div>

          <div className="about-actions">
            <a
              href="/resume.pdf"
              download="Zaigham_Resume.pdf"
              className="btn btn-primary"
              onClick={() => showAchievement("Resume downloaded", "Thanks for checking out my work!")}
            >
              <Download size={17} aria-hidden="true" />
              Download CV
            </a>
            <button type="button" className="btn btn-secondary" onClick={() => scrollToSection("contact")}>
              Let&rsquo;s talk
              <ArrowRight size={17} className="btn-arrow" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul ref={cardsRef} className="about-cards" aria-label="What I focus on">
          {about.focus.map((item, i) => {
            const Icon = FOCUS_ICONS[i % FOCUS_ICONS.length];
            return (
              <li key={item.title} className="about-card card card-pad card-interactive spotlight">
                <span className="about-card-icon" aria-hidden="true">
                  <Icon size={24} />
                </span>
                <div>
                  <h3 className="about-card-title">{item.title}</h3>
                  <p className="about-card-text">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
