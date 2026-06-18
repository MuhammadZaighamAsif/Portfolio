import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const NAV_LINKS = [
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

export default function Navbar({ theme, onToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-base text-foreground-default tracking-tight hidden sm:block">
              Zaigham<span className="text-accent-color">.</span>
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-link ${activeSection === link.id ? "nav-link-active" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Theme toggle + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggle}
              aria-label="Toggle color theme"
              className="theme-toggle"
            >
              <span className={`theme-thumb ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`}>
                {theme === "dark" ? (
                  <Moon size={11} className="text-white" />
                ) : (
                  <Sun size={11} className="text-white" />
                )}
              </span>
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-foreground-subtle hover:text-foreground-default transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-16">
          <div
            className="absolute inset-0 bg-surface/90 backdrop-blur-xl"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 flex-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-2xl font-semibold transition-colors ${
                  activeSection === link.id
                    ? "text-primary-color"
                    : "text-foreground-default hover:text-primary-color"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
