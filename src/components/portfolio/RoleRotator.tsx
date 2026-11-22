import { useEffect, useState } from "react";
import { meta } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/motion";

const PHRASES = ["full-stack web apps", "AI-powered products", "clean, scalable code"] as const;
const INTERVAL_MS = 2800;
/** Wait for the hero intro to finish before the first swap. */
const START_DELAY_MS = 3200;

/**
 * Hero role line: "Software Engineer building <rotating phrase>".
 * The visual swap is pure CSS (opacity/translate transitions keyed off data-state). Screen readers get
 * one static sentence and never hear the rotation (animated part is aria-hidden + aria-live="off").
 * With reduced motion it stays on the first phrase.
 */
export default function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let interval = 0;
    const start = window.setTimeout(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
      interval = window.setInterval(() => setIndex((i) => (i + 1) % PHRASES.length), INTERVAL_MS);
    }, START_DELAY_MS);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <p className="hero-role">
      <span className="sr-only">
        {meta.title} building {PHRASES[0]}, {PHRASES[1]} and {PHRASES[2]}
      </span>
      <span aria-hidden="true">{meta.title} building</span>
      <span className="hero-rotator" aria-hidden="true" aria-live="off">
        {PHRASES.map((phrase, i) => {
          const state =
            i === index ? "active" : i === (index + PHRASES.length - 1) % PHRASES.length ? "leaving" : "idle";
          return (
            <span key={phrase} className="hero-rotator-item gradient-text" data-state={state}>
              {phrase}
            </span>
          );
        })}
      </span>
    </p>
  );
}
