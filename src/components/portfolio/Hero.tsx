import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Mail, MapPin, Download, Github, Linkedin } from "lucide-react";
import { meta } from "@/data/portfolio";
import { showAchievement } from "@/lib/achievement";
import gsap from "gsap";
import { prefersReducedMotion, scrollToSection } from "@/lib/motion";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // Layout effect so initial states are applied before first paint (no flash of un-animated content).
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Falling letters animation (letters are rendered by React below)
      const letters = nameRef.current?.querySelectorAll("[data-letter]");
      if (letters && letters.length > 0) {
        tl.fromTo(
          letters,
          {
            y: -100,
            opacity: 0,
            rotation: () => gsap.utils.random(-15, 15),
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: "bounce.out",
          }
        );
      }

      // Everything below uses explicit fromTo() end states (opacity 1 / no offset) instead of from().
      // from() infers its end state from the element's *current* computed style, which is unreliable
      // for elements that also carry a CSS `transition` (the CTA buttons and social icons).
      // clearProps hands control back to CSS once each reveal finishes, so hover styles keep working.
      const reveal = (
        targets: gsap.TweenTarget,
        from: gsap.TweenVars,
        vars: gsap.TweenVars,
        position: string
      ) => {
        // Hide immediately (before first paint) so nothing flashes while earlier tweens play.
        gsap.set(targets, { opacity: 0, ...from });
        tl.fromTo(
          targets,
          { opacity: 0, ...from },
          { opacity: 1, y: 0, scale: 1, clearProps: "opacity,transform", ...vars },
          position
        );
      };

      // Role badge, subtitle and meta line
      if (roleRef.current) reveal(roleRef.current, { y: 30 }, { duration: 0.8 }, "-=0.3");
      if (subtitleRef.current) reveal(subtitleRef.current, { y: 30 }, { duration: 0.8 }, "-=0.5");
      if (metaRef.current) reveal(metaRef.current, { y: 20 }, { duration: 0.6 }, "-=0.4");

      // Stagger CTA buttons
      const ctaItems = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      if (ctaItems.length > 0) {
        reveal(ctaItems, { y: 20 }, { stagger: 0.1, duration: 0.5 }, "-=0.3");
      }

      // Social icons
      const socialItems = socialRef.current ? Array.from(socialRef.current.children) : [];
      if (socialItems.length > 0) {
        reveal(
          socialItems,
          { scale: 0 },
          { stagger: 0.08, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.2"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <div className="container-custom w-full">
        <div className="max-w-6xl mx-auto text-center">
          {/* Name with falling letters effect (aria-label keeps the heading readable as one string) */}
          <h1
            ref={nameRef}
            aria-label={meta.name}
            className="text-display mb-6 leading-none font-bold"
            style={{
              minHeight: "1.2em",
              color: "var(--text-primary)",
              fontSize: "clamp(1.6rem, 7.5vw, 5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {meta.name.split(" ").map((word, wordIndex, words) => (
              <span key={`${word}-${wordIndex}`} aria-hidden="true">
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((char, charIndex) => (
                    <span key={charIndex} data-letter className="inline-block">
                      {char}
                    </span>
                  ))}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          {/* Role */}
          <div
            ref={roleRef}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium border border-current rounded-full"
            style={{ color: "var(--accent)" }}
          >
            {meta.title}
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-body-large max-w-3xl mx-auto mb-12 text-left"
            style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}
          >
            {meta.subtitle}
          </p>

          {/* Meta info */}
          <div
            ref={metaRef}
            className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {meta.location}
            </span>
            <span className="hover-underline">
              <a href={`mailto:${meta.email}`} className="flex items-center gap-2">
                <Mail size={16} />
                {meta.email}
              </a>
            </span>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button 
              type="button"
              onClick={() => scrollToSection("projects")} 
              className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all group"
              style={{
                background: "var(--text-primary)",
                color: "var(--bg-primary)"
              }}
            >
              <span>View Projects</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            <button 
              type="button"
              onClick={() => scrollToSection("contact")} 
              className="inline-flex items-center gap-2 px-6 py-3 border font-medium transition-all hover:border-opacity-70"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-primary)"
              }}
            >
              <span>Get in Touch</span>
            </button>
            <a
              href="/resume.pdf"
              download="Zaigham_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 border font-medium transition-all hover:border-opacity-70"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-primary)"
              }}
              onClick={() => showAchievement("Resume Downloaded", "Thanks!")}
            >
              <span>Resume</span>
              <Download size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="flex items-center justify-center gap-4">
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link w-10 h-10 flex items-center justify-center border border-current rounded-full transition-all group"
              style={{ color: "var(--text-secondary)" }}
              aria-label="GitHub"
            >
              <Github size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link w-10 h-10 flex items-center justify-center border border-current rounded-full transition-all group"
              style={{ color: "var(--text-secondary)" }}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--text-tertiary), transparent)",
            animation: "fadeIn 1s 2s both, pulse 2s 2.5s infinite",
          }}
        />
      </div>
    </section>
  );
}
