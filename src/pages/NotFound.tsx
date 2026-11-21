import { Link, useLocation } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  const location = useLocation();
  usePageMeta({ title: "Page not found — Muhammad Zaigham Asif", noindex: true });

  return (
    <main
      className="flex min-h-screen items-center justify-center flex-col gap-6 px-6 text-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <h1 className="text-3xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
        404 - Page Not Found
      </h1>
      <p
        className="text-sm md:text-base leading-relaxed max-w-md break-words"
        style={{ color: "var(--text-secondary)" }}
      >
        The page you're looking for doesn't exist: <span>{location.pathname}</span>
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all"
        style={{
          background: "var(--text-primary)",
          color: "var(--bg-primary)",
        }}
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;
