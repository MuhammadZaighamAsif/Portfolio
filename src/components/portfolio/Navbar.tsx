import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, FileDown } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { scrollToSection } from "@/lib/motion";
import type { Theme } from "@/hooks/useTheme";

const NAV_LINKS = [
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

// Module-level so the scroll-spy effect isn't re-subscribed on every render.
const NAV_IDS: readonly string[] = NAV_LINKS.map((l) => l.id);

const MOBILE_MENU_ID = "mobile-menu";

interface NavbarProps {
  theme: Theme;
  onToggle: () => void;
}

export default function Navbar({ theme, onToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu: lock page scroll, close on Escape, and close if the viewport grows to desktop.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [mobileOpen]);

  const handleNavigate = (id: string) => {
    setMobileOpen(false);
    // Wait a frame so the scroll lock is released before measuring/scrolling.
    window.requestAnimationFrame(() => scrollToSection(id));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || mobileOpen ? "var(--bg-primary)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
        }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              type="button"
              onClick={scrollToTop}
              className="text-lg font-bold hover-underline transition-opacity hover:opacity-70"
              style={{ color: "var(--text-primary)" }}
              aria-label="Muhammad Zaigham Asif — back to top"
            >
              MZA
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  className="text-sm hover-underline transition-colors"
                  aria-current={activeSection === link.id ? "true" : undefined}
                  style={{
                    color: activeSection === link.id ? "var(--accent)" : "var(--text-secondary)",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <a
                href="/resume.pdf"
                download="Zaigham_Resume.pdf"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium hover-underline"
                style={{ color: "var(--text-primary)" }}
              >
                <FileDown size={16} aria-hidden="true" />
                Resume
              </a>

              {/* Theme toggle */}
              <button
                type="button"
                onClick={onToggle}
                className="theme-toggle w-9 h-9 flex items-center justify-center rounded-full border border-current transition-all"
                style={{ color: "var(--text-secondary)" }}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              >
                {theme === "dark" ? (
                  <Sun size={16} aria-hidden="true" />
                ) : (
                  <Moon size={16} aria-hidden="true" />
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="md:hidden w-9 h-9 flex items-center justify-center"
                style={{ color: "var(--text-primary)" }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls={MOBILE_MENU_ID}
              >
                {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id={MOBILE_MENU_ID}
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
                type="button"
                onClick={() => handleNavigate(link.id)}
                className="text-2xl font-medium text-left transition-colors hover:opacity-70"
                aria-current={activeSection === link.id ? "true" : undefined}
                style={{
                  color: activeSection === link.id ? "var(--accent)" : "var(--text-primary)",
                  animation: `fadeUp 0.5s ${idx * 0.1}s both`,
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              download="Zaigham_Resume.pdf"
              className="inline-flex items-center gap-2 text-lg font-medium sm:hidden"
              style={{ color: "var(--text-primary)" }}
            >
              <FileDown size={18} aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}
