import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ReactBitsTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  variant?: "split" | "blur" | "fold" | "slide" | "tracking";
  className?: string;
  delay?: number;
}

export default function ReactBitsText({
  text,
  as: Tag = "h2",
  variant = "split",
  className = "",
  delay = 0,
}: ReactBitsTextProps) {
  const rootRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pieces = root.querySelectorAll<HTMLElement>("[data-text-piece]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const animate = () => {
        if (reducedMotion) {
          gsap.set(pieces, { clearProps: "all" });
          return;
        }

      const from = {
        split: { y: 28, opacity: 0 },
        blur: { y: 18, opacity: 0, filter: "blur(10px)" },
        fold: { y: 20, opacity: 0, rotationX: -70, transformOrigin: "50% 100%" },
        slide: { x: -28, opacity: 0 },
        tracking: { y: 14, opacity: 0, letterSpacing: "0.22em" },
      }[variant];

      const to = {
        opacity: 1,
        x: 0,
        y: 0,
        rotationX: 0,
        filter: "blur(0px)",
        letterSpacing: "normal",
        duration: variant === "fold" ? 0.7 : 0.8,
        stagger: variant === "tracking" ? 0.06 : 0.045,
        delay,
        ease: variant === "fold" ? "power3.out" : "power2.out",
      };

      gsap.fromTo(pieces, from, to);
      };

      if (reducedMotion || !("IntersectionObserver" in window)) {
        animate();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -10%" }
      );
      observer.observe(root);

      return () => observer.disconnect();
    }, root);

    return () => context.revert();
  }, [delay, variant]);

  return (
    <Tag
      ref={rootRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      className={`react-bits-text react-bits-${variant} ${className}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span className="react-bits-word" key={`${word}-${index}`}>
          <span data-text-piece="true">{word}</span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
