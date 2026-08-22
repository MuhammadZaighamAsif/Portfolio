import { useEffect, useRef } from "react";
import { ArrowRight, Mail, MapPin, Download, Github, Linkedin } from "lucide-react";
import { meta } from "@/data/portfolio";
import { showAchievement } from "@/lib/achievement";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Split name into individual letters for falling effect
      if (nameRef.current) {
        const text = nameRef.current.textContent || "";
        nameRef.current.innerHTML = text
          .split("")
          .map((char) => 
            char === " " 
              ? '<span style="display: inline-block; width: 0.25em;"></span>'
              : `<span style="display: inline-block; opacity: 0;">${char}</span>`
          )
          .join("");

        const letters = nameRef.current.querySelectorAll("span");
        
        // Falling letters animation
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

      // Fade in role
      tl.from(
        roleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.3"
      );

      // Fade in subtitle
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      );

      // Fade in meta
      tl.from(
        metaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4"
      );

      // Stagger CTA buttons
      tl.from(
        ctaRef.current?.children || [],
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.3"
      );

      // Social icons
      tl.from(
        socialRef.current?.children || [],
        {
          scale: 0,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <div className="container-custom w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Name with falling letters effect */}
          <h1
            ref={nameRef}
            className="text-display mb-6 leading-none font-bold"
            style={{ 
              minHeight: "1.2em",
              color: "var(--text-primary)"
            }}
          >
            {meta.name}
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
            className="text-body-large max-w-2xl mx-auto mb-12"
            style={{ color: "var(--text-secondary)" }}
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
              onClick={() => scrollToSection("projects")} 
              className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all group"
              style={{
                background: "var(--text-primary)",
                color: "var(--bg-primary)"
              }}
            >
              <span>View Projects</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
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
              <Download size={16} />
            </a>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="flex items-center justify-center gap-4">
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-current rounded-full transition-all hover:bg-current hover:text-primary group"
              style={{ color: "var(--text-secondary)" }}
              aria-label="GitHub"
            >
              <Github size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-current rounded-full transition-all hover:bg-current hover:text-primary group"
              style={{ color: "var(--text-secondary)" }}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
