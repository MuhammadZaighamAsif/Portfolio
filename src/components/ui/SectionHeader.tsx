import { useRef } from "react";
import { gsap, EASE, splitWords, useGsap } from "@/lib/animations";

interface SectionHeaderProps {
  /** Small label above the title, e.g. "Selected Work". */
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** id applied to the <h2> so a section can use aria-labelledby. */
  titleId?: string;
  className?: string;
}

/**
 * Consistent animated heading block for every section:
 * eyebrow slides in, title reveals word-by-word from behind a clip mask, description fades up.
 * Plays once when scrolled into view; static for reduced-motion visitors.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  titleId,
  className = "",
}: SectionHeaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGsap(rootRef, (_helpers, root) => {
    const eyebrowEl = root.querySelector(".eyebrow");
    const words = root.querySelectorAll(".sh-word-inner");
    const desc = root.querySelector(".sh-desc");

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: root, start: "top 85%", once: true },
    });

    if (eyebrowEl) {
      tl.fromTo(eyebrowEl, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6, clearProps: "opacity,transform" }, 0);
    }
    if (words.length) {
      tl.fromTo(
        words,
        { yPercent: 115, rotate: 4 },
        { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.06, ease: EASE.expo, clearProps: "transform" },
        0.08
      );
    }
    if (desc) {
      tl.fromTo(desc, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, clearProps: "opacity,transform" }, 0.3);
    }
  });

  return (
    <div ref={rootRef} className={`section-header ${className}`} data-align={align}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId} className="sh-title">
        {splitWords(title).map((word, i, all) => (
          <span key={`${word}-${i}`}>
            <span className="sh-word">
              <span className="sh-word-inner">{word}</span>
            </span>
            {i < all.length - 1 ? " " : null}
          </span>
        ))}
      </h2>
      {description && <p className="sh-desc">{description}</p>}
    </div>
  );
}
