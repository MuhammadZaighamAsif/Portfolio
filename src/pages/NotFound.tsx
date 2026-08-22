import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-6 px-6 text-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <h1 
        className="text-3xl md:text-5xl font-bold"
        style={{ color: "var(--text-primary)" }}
      >
        404 - Page Not Found
      </h1>
      <p 
        className="text-sm md:text-base leading-relaxed max-w-md"
        style={{ color: "var(--text-secondary)" }}
      >
        The page you're looking for doesn't exist: {location.pathname}
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all"
        style={{
          background: "var(--accent)",
          color: "white"
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;