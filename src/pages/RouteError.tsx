import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

/** Shown when a route throws while loading or rendering (e.g. a failed lazy chunk). */
export default function RouteError() {
  const error = useRouteError();
  usePageMeta({ title: "Something went wrong — Muhammad Zaigham Asif", noindex: true });

  // Log for diagnostics, but never surface internals to visitors.
  console.error("Route error:", error);

  const status = isRouteErrorResponse(error) ? error.status : null;

  return (
    <main
      className="flex min-h-screen items-center justify-center flex-col gap-6 px-6 text-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <h1 className="text-3xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
        {status ? `Error ${status}` : "Something went wrong"}
      </h1>
      <p
        className="text-sm md:text-base leading-relaxed max-w-md"
        style={{ color: "var(--text-secondary)" }}
      >
        This page failed to load. Check your connection and try again.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all"
          style={{ background: "var(--text-primary)", color: "var(--bg-primary)" }}
        >
          Reload page
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 border font-medium transition-all"
          style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
