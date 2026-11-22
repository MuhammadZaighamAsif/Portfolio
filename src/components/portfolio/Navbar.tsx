import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FileDown, Moon, Sun } from "lucide-react";
import { meta } from "@/data/portfolio";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { gsap } from "@/lib/animations";
import { prefersReducedMotion, scrollToSection } from "@/lib/motion";
import type { Theme } from "@/hooks/useTheme";
import BackToTop from "./BackToTop";
import ScrollProgress from "./ScrollProgress";
import "@/styles/navbar.css";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "tools", label: "Tools" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

// "hero" is tracked too so no link is highlighted while the hero is on screen.
// Module-level so the scroll-spy effect isn't re-subscribed on every render.
const SPY_IDS: readonly string[] = ["hero", ...NAV_LINKS.map((l) => l.id)];

const MOBILE_MENU_ID = "mobile-menu";
const INDICATOR_BASE_WIDTH = 100; // must match .nav-indicator width in navbar.css
const DESKTOP_QUERY = "(min-width: 1024px)";
const WORDMARK = meta.name.replace(/^\S+\s+/, "");

interface NavbarProps {
  theme: Theme;
  onToggle: () => void;
}

export default function Navbar({ theme, onToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(SPY_IDS);

  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const indicatorShown = useRef(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Frosted-glass state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding indicator: measure the active link and glide a pill (transform only) underneath it.
  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const wrap = linksRef.current;
    if (!indicator || !wrap) return;

    const place = (animate: boolean) => {
      const target = wrap.querySelector<HTMLElement>(`[data-nav-id="${activeSection}"]`);
      if (!target || target.offsetWidth === 0) {
        gsap.to(indicator, { opacity: 0, duration: 0.25, overwrite: "auto" });
        indicatorShown.current = false;
        return;
      }
      const pose = { x: target.offsetLeft, scaleX: target.offsetWidth / INDICATOR_BASE_WIDTH };
      if (animate && indicatorShown.current && !prefersReducedMotion()) {
        gsap.to(indicator, { ...pose, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      } else {
        gsap.set(indicator, pose);
        gsap.to(indicator, { opacity: 1, duration: prefersReducedMotion() ? 0 : 0.35, overwrite: "auto" });
      }
      indicatorShown.current = true;
    };

    place(true);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize).catch(() => undefined);
    return () => {
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(indicator);
    };
  }, [activeSection]);

  // Mobile menu: lock page scroll, close on Escape, trap Tab, and close if the viewport grows to desktop.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep focus inside the bar + overlay while the menu is open.
      const focusables = [
        logoRef.current,
        document.querySelector<HTMLElement>(".theme-toggle"),
        burgerRef.current,
        ...Array.from(overlayRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
      ].filter((el): el is HTMLElement => !!el);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
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

  const handleNavigate = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    // Wait a frame so the scroll lock is released before measuring/scrolling.
    window.requestAnimationFrame(() => scrollToSection(id));
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <>
      <nav aria-label="Primary" className="nav" data-scrolled={scrolled} data-open={mobileOpen}>
        <div className="container-custom nav-inner">
          <a
            ref={logoRef}
            href="#hero"
            onClick={scrollToTop}
            className="nav-logo"
            aria-label={`${meta.name} — back to top`}
          >
            <span className="nav-logo-mark" aria-hidden="true">MZA</span>
            <span className="nav-logo-name" aria-hidden="true">{WORDMARK}</span>
          </a>

          {/* Desktop links */}
          <div ref={linksRef} className="nav-links">
            <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-nav-id={link.id}
                onClick={(e) => handleNavigate(e, link.id)}
                className="nav-link"
                aria-current={activeSection === link.id ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a href="/resume.pdf" download="Zaigham_Resume.pdf" className="btn btn-secondary btn-sm nav-resume">
              <FileDown size={16} aria-hidden="true" />
              Resume
            </a>

            <button
              type="button"
              onClick={onToggle}
              className="nav-icon-btn theme-toggle"
              data-mode={theme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <Sun className="tt-sun" size={18} aria-hidden="true" />
              <Moon className="tt-moon" size={18} aria-hidden="true" />
            </button>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="nav-icon-btn nav-burger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              <span className="nav-burger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <ScrollProgress />
      </nav>

      {/* Mobile menu: sibling of the bar (never nested in a backdrop-filter ancestor) */}
      <div
        ref={overlayRef}
        id={MOBILE_MENU_ID}
        className="nav-overlay"
        data-open={mobileOpen}
        inert={!mobileOpen}
      >
        <div className="container-custom nav-overlay-inner">
          <ul className="nav-overlay-links">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id} style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavigate(e, link.id)}
                  className="nav-overlay-link"
                  aria-current={activeSection === link.id ? "location" : undefined}
                >
                  <span className="nav-overlay-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-overlay-foot" style={{ "--i": NAV_LINKS.length } as React.CSSProperties}>
            <a href="/resume.pdf" download="Zaigham_Resume.pdf" className="btn btn-primary btn-lg">
              <FileDown size={18} aria-hidden="true" />
              Download resume
            </a>
          </div>
        </div>
      </div>

      <BackToTop />
    </>
  );
}
