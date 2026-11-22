import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

const SHOW_AFTER = 600;
const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Floating back-to-top button with a scroll-progress ring. Appears after ~600px of scrolling. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setVisible((v) => (v === y > SHOW_AFTER ? v : y > SHOW_AFTER));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      ringRef.current?.setAttribute("stroke-dashoffset", String(CIRCUMFERENCE * (1 - p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      className="back-top"
      data-visible={visible}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
    >
      <svg className="back-top-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="track" cx="24" cy="24" r={RADIUS} />
        <circle
          ref={ringRef}
          className="bar"
          cx="24"
          cy="24"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <ArrowUp className="arrow" size={18} aria-hidden="true" />
    </button>
  );
}
