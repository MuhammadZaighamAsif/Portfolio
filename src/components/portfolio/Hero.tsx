import { Github, Linkedin, Mail, MapPin, ArrowDown, Download } from "lucide-react";
import { meta } from "@/data/portfolio";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-badge animate-fade-up" style={{ animationDelay: "0ms" }}>
          <span className="w-2 h-2 rounded-full bg-accent-color inline-block animate-pulse" />
          Available for opportunities
        </div>

        {/* Name */}
        <h1
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <span className="text-gradient">{meta.name}</span>
        </h1>

        {/* Title */}
        <p
          className="text-xl md:text-2xl font-semibold text-primary-color mb-6 animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          {meta.title}
        </p>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg text-foreground-subtle max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-up"
          style={{ animationDelay: "360ms" }}
        >
          {meta.subtitle}
        </p>

        {/* Meta info */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm text-foreground-subtle animate-fade-up"
          style={{ animationDelay: "440ms" }}
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-accent-color" />
            {meta.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={14} className="text-accent-color" />
            {meta.email}
          </span>
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-up"
          style={{ animationDelay: "520ms" }}
        >
          <button onClick={() => scrollTo("projects")} className="btn-primary">
            View My Work
          </button>
          <a 
            href="/resume.pdf" 
            download="Zaigham_Resume.pdf"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download size={18} />
            Download Resume
          </a>
          <button onClick={() => scrollTo("contact")} className="btn-ghost">
            Contact Me
          </button>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={meta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <button
            onClick={() => scrollTo("skills")}
            className="flex flex-col items-center gap-1 text-foreground-subtle hover:text-accent-color transition-colors"
          >
            <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
            <ArrowDown size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
