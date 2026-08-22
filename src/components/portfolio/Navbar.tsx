import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import gsap from "gsap";

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
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled 
            ? "var(--bg-primary)" 
            : "transparent",
          borderBottom: scrolled 
            ? "1px solid var(--border-color)" 
            : "none",
        }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="text-lg font-bold hover-underline transition-opacity hover:opacity-70"
              style={{ color: "var(--text-primary)" }}
            >
              MZA
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm hover-underline transition-colors"
                  style={{
                    color: activeSection === link.id 
                      ? "var(--accent)" 
                      : "var(--text-secondary)",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <button
                onClick={onToggle}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-current transition-all hover:bg-current hover:text-primary"
                style={{ color: "var(--text-secondary)" }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center"
                style={{ color: "var(--text-primary)" }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{
            background: "var(--bg-primary)",
            paddingTop: "80px",
          }}
        >
          <div className="container-custom h-full flex flex-col justify-center gap-8">
            {NAV_LINKS.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-medium text-left transition-colors hover:opacity-70"
                style={{
                  color: activeSection === link.id 
                    ? "var(--accent)" 
                    : "var(--text-primary)",
                  animation: `fadeUp 0.5s ${idx * 0.1}s both`,
                }}
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
