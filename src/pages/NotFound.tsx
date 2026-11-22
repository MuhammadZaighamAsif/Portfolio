import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { meta } from "@/data/portfolio";
import { useGsap } from "@/lib/animations";
import "@/styles/notfound.css";

const NotFound = () => {
  const location = useLocation();
  const ref = useRef<HTMLElement>(null);
  usePageMeta({ title: "Page not found | Muhammad Zaigham Asif", noindex: true });

  useGsap(ref, ({ reveal }, root) => {
    reveal(root.querySelectorAll(".status-code, .status-title, .status-text, .status-actions, .status-links"), {
      immediate: true,
      y: 24,
      stagger: 0.09,
      duration: 0.8,
    });
  });

  return (
    <main ref={ref} className="status-page" id="main-content">
      <div className="status-inner">
        <p className="status-code gradient-text" aria-hidden="true">
          404
        </p>
        <h1 className="status-title">Page not found</h1>
        <p className="status-text">
          There's nothing at <span className="status-path">{location.pathname}</span>. It may have moved, or the
          link might be mistyped.
        </p>
        <div className="status-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} aria-hidden="true" />
            Back to home
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            See my projects
            <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
          </Link>
        </div>
        <p className="status-links">
          Or get in touch at <a href={`mailto:${meta.email}`}>{meta.email}</a>
        </p>
      </div>
    </main>
  );
};

export default NotFound;
