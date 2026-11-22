import { useRef } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { Home, RotateCw } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useGsap } from "@/lib/animations";
import "@/styles/notfound.css";

/** Shown when a route throws while loading or rendering (e.g. a failed lazy chunk). */
export default function RouteError() {
  const error = useRouteError();
  const ref = useRef<HTMLElement>(null);
  usePageMeta({ title: "Something went wrong | Muhammad Zaigham Asif", noindex: true });

  useGsap(ref, ({ reveal }, root) => {
    reveal(root.querySelectorAll(".status-code, .status-title, .status-text, .status-actions"), {
      immediate: true,
      y: 24,
      stagger: 0.09,
      duration: 0.8,
    });
  });

  // Log for diagnostics, but never surface internals to visitors.
  console.error("Route error:", error);

  const status = isRouteErrorResponse(error) ? error.status : null;

  return (
    <main ref={ref} className="status-page" id="main-content">
      <div className="status-inner">
        <p className="status-code gradient-text" aria-hidden="true">
          {status ?? "Oops"}
        </p>
        <h1 className="status-title">{status ? `Error ${status}` : "Something went wrong"}</h1>
        <p className="status-text">This page failed to load. Check your connection and try again.</p>
        <div className="status-actions">
          <button type="button" onClick={() => window.location.reload()} className="btn btn-primary">
            <RotateCw size={18} aria-hidden="true" />
            Reload page
          </button>
          <Link to="/" className="btn btn-secondary">
            <Home size={18} aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
