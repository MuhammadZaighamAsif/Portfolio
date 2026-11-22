import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import { EASE, gsap, useGsap } from "@/lib/animations";
import { useSpotlight } from "@/lib/pointerFx";
import ProjectCard from "./ProjectCard";
import ProjectFeatured from "./ProjectFeatured";
import "@/styles/projects.css";

const LIMIT = 6;

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const shown = projects.slice(0, LIMIT);
  const featured = shown.find((p) => p.featured) ?? shown[0];
  const rest = shown.filter((p) => p !== featured);
  const hasMore = projects.length > LIMIT;

  useSpotlight(sectionRef);

  useGsap(sectionRef, (helpers, root) => {
    const { reveal, parallax } = helpers;

    // Featured card: card fades up, screenshot stage slides in with a clipped reveal, copy staggers.
    const feat = root.querySelector<HTMLElement>(".pfeatured");
    if (feat) {
      const stage = feat.querySelector(".pfeatured-stage");
      const frame = feat.querySelector(".pfeatured-frame");
      const view = feat.querySelector(".bframe-view");
      const copy = feat.querySelectorAll("[data-fx]");

      const tl = gsap.timeline({
        defaults: { ease: EASE.out },
        scrollTrigger: { trigger: feat, start: "top 82%", once: true },
      });
      tl.fromTo(feat, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, clearProps: "opacity,transform" }, 0);
      if (stage) {
        tl.fromTo(
          stage,
          { opacity: 0, y: 48, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: EASE.expo, clearProps: "opacity,transform" },
          0.12
        );
      }
      if (view) {
        tl.fromTo(
          view,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: EASE.inOut, clearProps: "clipPath" },
          0.4
        );
      }
      if (copy.length) {
        tl.fromTo(
          copy,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, clearProps: "opacity,transform" },
          0.25
        );
      }
      reveal(feat.querySelectorAll(".ptags li"), {
        y: 10,
        scale: 0.8,
        stagger: 0.04,
        duration: 0.5,
        delay: 0.5,
        trigger: feat,
        start: "top 82%",
      });
      // The frame floats gently against the stage as you scroll.
      parallax(frame, 28, feat);
    }

    // Grid cards: staggered reveal, then each card's tags cascade in.
    const grid = gridRef.current;
    if (grid) {
      const cards = Array.from(grid.children);
      reveal(cards, { y: 48, stagger: 0.1, trigger: grid });
      cards.forEach((card) => {
        reveal(card.querySelectorAll(".ptags li"), {
          y: 8,
          scale: 0.8,
          stagger: 0.035,
          duration: 0.5,
          delay: 0.35,
          trigger: card,
          start: "top 84%",
        });
      });
    }
  });

  return (
    <section ref={sectionRef} id="projects" className="section section-alt projects" aria-labelledby="projects-title">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects"
          description="A collection of projects showcasing full-stack development, AI integration, and modern web technologies."
          titleId="projects-title"
        />

        {featured && (
          <div className="projects-featured">
            <ProjectFeatured project={featured} />
          </div>
        )}

        <div ref={gridRef} className="pgrid">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />
          ))}
          {hasMore && (
            <Link to="/projects" className="pcard pcard-cta card card-interactive spotlight">
              <span className="pcta-icon" aria-hidden="true">
                <ArrowRight size={26} strokeWidth={2} />
              </span>
              <h3 className="pcta-title">View all projects</h3>
              <p className="pcta-desc">Browse all {projects.length} projects, from client work to AI and systems experiments.</p>
              <span className="pcta-link" aria-hidden="true">
                Open the archive
                <ArrowRight size={16} className="pcta-arrow" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
