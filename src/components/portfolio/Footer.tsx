import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { meta } from "@/data/portfolio";
import { gsap, EASE, useGsap } from "@/lib/animations";
import { scrollToSection } from "@/lib/motion";
import "@/styles/footer.css";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

const SOCIALS = [
  { icon: Github, label: "GitHub", href: meta.github, external: true },
  { icon: Linkedin, label: "LinkedIn", href: meta.linkedin, external: true },
  { icon: Mail, label: "Email", href: `mailto:${meta.email}`, external: false },
] as const;

const monogram = meta.name
  .split(/\s+/)
  .filter(Boolean)
  .map((part) => part[0])
  .join("")
  .toUpperCase();

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  /** Real <a href="/#id"> for crawlers/no-JS; smooth-scroll on the home page, route home first elsewhere. */
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(id);
      history.replaceState(null, "", `/#${id}`);
      return;
    }
    void navigate("/");
    window.setTimeout(() => scrollToSection(id), 150);
  };

  useGsap(rootRef, (_helpers, root) => {
    const rule = root.querySelector(".footer-rule");
    const cols = root.querySelectorAll(".footer-col");
    const links = root.querySelectorAll(".footer-links li, .footer-socials > *");
    const bottom = root.querySelector(".footer-bottom");

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: root, start: "top 92%", once: true },
    });
    tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: EASE.expo, clearProps: "transform" }, 0)
      .fromTo(cols, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, clearProps: "opacity,transform" }, 0.1)
      .fromTo(links, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, clearProps: "opacity,transform" }, 0.3)
      .fromTo(bottom, { opacity: 0 }, { opacity: 1, duration: 0.7, clearProps: "opacity" }, 0.6);
  });

  return (
    <footer ref={rootRef} className="site-footer">
      <span className="footer-rule" aria-hidden="true" />
      <div className="container-custom">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <span className="footer-monogram" aria-hidden="true">
                {monogram}
              </span>
              <span className="footer-name">{meta.name}</span>
            </div>
            <p className="footer-tagline">{meta.tagline}</p>
            <div className="footer-socials">
              {SOCIALS.map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  className="icon-btn"
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav className="footer-col" aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="footer-heading">
              Explore
            </h2>
            <ul className="footer-links footer-links-2col">
              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a href={`/#${id}`} onClick={(e) => handleNav(e, id)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-heading">Get in touch</h2>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${meta.email}`}>{meta.email}</a>
              </li>
              <li>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Résumé (PDF)
                </a>
              </li>
              <li>
                <span className="footer-location">{meta.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {meta.name}. All rights reserved.
          </p>
          <p>Built with React, TypeScript &amp; GSAP</p>
        </div>
      </div>
    </footer>
  );
}
