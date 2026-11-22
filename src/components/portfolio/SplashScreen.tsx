import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import "@/styles/splash.css";

interface SplashScreenProps {
  onComplete: () => void;
}

const LETTERS = ["M", "Z", "A"] as const;
/** Hard ceiling so a throttled tab can never leave visitors stuck on the intro. */
const FALLBACK_MS = 3000;

/**
 * ~1.4s brand intro: the "MZA" monogram is drawn and revealed, a thin progress line fills, then
 * everything lifts away. Click / tap / any key skips straight to the exit. StrictMode-safe: every
 * tween and timer is torn down on unmount.
 */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Keep the latest callback without restarting the animation when the parent re-renders.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onCompleteRef.current();
    };

    // Visitors who prefer reduced motion get no intro at all (App normally skips it already).
    if (prefersReducedMotion()) {
      const t = window.setTimeout(finish, 0);
      return () => window.clearTimeout(t);
    }

    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);
    const ctx = gsap.context(() => {
      const mark = q(".splash-mark");
      const glow = q(".splash-glow");
      const ringBg = q(".splash-ring-bg");
      const ringLine = q(".splash-ring-line");
      const letters = root.querySelectorAll(".splash-letter");
      const caption = q(".splash-caption");
      const track = q(".splash-track");
      const fill = q(".splash-fill");
      const inner = q(".splash-inner");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });
      tlRef.current = tl;

      // Intro (0 -> ~0.75s)
      tl.fromTo(mark, { scale: 0.86, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: "expo.out" }, 0)
        .fromTo(glow, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, 0)
        .fromTo(ringBg, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.05)
        .fromTo(ringLine, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, 0.05)
        .fromTo(
          letters,
          { yPercent: 115, rotate: 6 },
          { yPercent: 0, rotate: 0, duration: 0.6, stagger: 0.07, ease: "expo.out" },
          0.18
        )
        .fromTo(caption, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 }, 0.4)
        .fromTo(track, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.3)
        // progress line fills while the monogram settles
        .fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.3)
        .addLabel("exit", 1.0)
        // Exit (1.0 -> ~1.4s): content lifts away, the whole overlay fades
        .to(letters, { yPercent: -115, duration: 0.32, stagger: 0.04, ease: "power3.in" }, "exit")
        .to(
          [caption, track],
          { opacity: 0, y: -8, duration: 0.25, ease: "power2.in" },
          "exit"
        )
        .to(ringLine, { opacity: 0, duration: 0.25, ease: "power2.in" }, "exit")
        .to(inner, { scale: 1.06, duration: 0.38, ease: "power2.in" }, "exit")
        .to(root, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, "exit+=0.1");
    }, root);

    const skip = () => {
      const tl = tlRef.current;
      if (!tl || done) return;
      // Jump to the start of the exit and play it at a brisk pace.
      if (tl.time() < (tl.labels.exit ?? 0)) tl.seek("exit");
      tl.timeScale(1.4);
    };
    window.addEventListener("keydown", skip);
    root.addEventListener("pointerdown", skip);

    const fallback = window.setTimeout(finish, FALLBACK_MS);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("keydown", skip);
      root.removeEventListener("pointerdown", skip);
      tlRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="splash" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="splash-inner">
        <div className="splash-mark" aria-hidden="true">
          <span className="splash-glow" />
          <svg className="splash-ring" viewBox="0 0 112 112">
            <rect className="splash-ring-bg" x="1" y="1" width="110" height="110" rx="30" />
            <rect
              className="splash-ring-line"
              x="1"
              y="1"
              width="110"
              height="110"
              rx="30"
              pathLength={1}
              strokeDasharray={1}
            />
          </svg>
          <span className="splash-letters">
            {LETTERS.map((letter) => (
              <span key={letter} className="splash-letter-mask">
                <span className="splash-letter">{letter}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="splash-meta" aria-hidden="true">
          <span className="splash-caption">Software Engineer</span>
          <span className="splash-track">
            <span className="splash-fill" />
          </span>
        </div>
      </div>
    </div>
  );
}
