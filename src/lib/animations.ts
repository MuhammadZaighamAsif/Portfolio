/**
 * Shared GSAP toolkit. Every section animates through these helpers so motion feels
 * consistent (same easing, durations, trigger points) and is always safe:
 *
 *  - Runs only when the visitor has NOT asked for reduced motion (live-updates if they toggle it).
 *  - Uses explicit fromTo() end states + clearProps, never from(): from() infers its end value from
 *    the element's *current computed style*, which breaks when a CSS transition is in flight.
 *  - Everything is created inside a gsap.matchMedia/context scoped to a ref, so it is fully reverted
 *    on unmount (works under React StrictMode).
 *
 * RULES FOR ANIMATED ELEMENTS
 *  1. Don't give an element a CSS `transition` on opacity/transform if GSAP animates it.
 *  2. Use the CSS `translate` property (not `transform`) for hover lifts.
 *  3. Never put transform/filter/will-change:transform on an ancestor of a position:fixed element.
 */
import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const EASE = {
  out: "power3.out",
  outSoft: "power2.out",
  expo: "expo.out",
  back: "back.out(1.5)",
  inOut: "power3.inOut",
} as const;

type Targets = gsap.TweenTarget;

export interface RevealOptions {
  /** Element that fires the animation when it enters the viewport. Defaults to the first target. */
  trigger?: Element | null;
  y?: number;
  x?: number;
  scale?: number;
  /** Blur radius in px to animate out of (0 = none). */
  blur?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  stagger?: number | gsap.StaggerVars;
  ease?: string;
  /** ScrollTrigger start, e.g. "top 85%". */
  start?: string;
  /** Play immediately instead of waiting for scroll (for above-the-fold content). */
  immediate?: boolean;
}

export interface MotionHelpers {
  /** Fade + translate elements in when scrolled into view (plays once). */
  reveal: (targets: Targets, options?: RevealOptions) => gsap.core.Tween | undefined;
  /** Animate a number from 0 → `to`, writing into the element's textContent. */
  countUp: (
    el: Element | null,
    to: number,
    options?: { duration?: number; suffix?: string; prefix?: string; decimals?: number; trigger?: Element | null; start?: string }
  ) => void;
  /** Scroll-linked vertical drift (parallax). `amount` in px; positive moves down as you scroll. */
  parallax: (el: Element | null, amount?: number, trigger?: Element | null) => void;
  /** Scroll-linked scaleX/scaleY draw of a line (timeline rails, underlines). */
  drawLine: (
    el: Element | null,
    options?: { axis?: "x" | "y"; trigger?: Element | null; start?: string; end?: string; scrub?: boolean | number }
  ) => void;
}

function toElements(targets: Targets): Element[] {
  return gsap.utils.toArray<Element>(targets);
}

export function createHelpers(): MotionHelpers {
  const reveal: MotionHelpers["reveal"] = (targets, o = {}) => {
    const els = toElements(targets);
    if (els.length === 0) return undefined;

    const from: gsap.TweenVars = { opacity: 0, y: o.y ?? 36 };
    const to: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration: o.duration ?? 0.9,
      delay: o.delay ?? 0,
      ease: o.ease ?? EASE.out,
      stagger: o.stagger ?? 0.1,
      clearProps: "opacity,transform,filter",
    };
    if (o.x !== undefined) { from.x = o.x; to.x = 0; }
    if (o.scale !== undefined) { from.scale = o.scale; to.scale = 1; }
    if (o.rotate !== undefined) { from.rotate = o.rotate; to.rotate = 0; }
    if (o.blur) { from.filter = `blur(${o.blur}px)`; to.filter = "blur(0px)"; }

    if (!o.immediate) {
      to.scrollTrigger = {
        trigger: o.trigger ?? els[0],
        start: o.start ?? "top 86%",
        once: true,
      };
    }
    return gsap.fromTo(els, from, to);
  };

  const countUp: MotionHelpers["countUp"] = (el, to, o = {}) => {
    if (!el) return;
    const { suffix = "", prefix = "", decimals = 0 } = o;
    const state = { v: 0 };
    const write = () => {
      el.textContent = `${prefix}${state.v.toFixed(decimals)}${suffix}`;
    };
    write();
    gsap.to(state, {
      v: to,
      duration: o.duration ?? 1.6,
      ease: "power2.out",
      onUpdate: write,
      onComplete: () => {
        state.v = to;
        write();
      },
      scrollTrigger: { trigger: o.trigger ?? el, start: o.start ?? "top 90%", once: true },
    });
  };

  const parallax: MotionHelpers["parallax"] = (el, amount = 60, trigger) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { y: -amount / 2 },
      {
        y: amount / 2,
        ease: "none",
        scrollTrigger: { trigger: trigger ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      }
    );
  };

  const drawLine: MotionHelpers["drawLine"] = (el, o = {}) => {
    if (!el) return;
    const axis = o.axis ?? "y";
    const prop = axis === "y" ? "scaleY" : "scaleX";
    gsap.fromTo(
      el,
      { [prop]: 0, transformOrigin: axis === "y" ? "top center" : "left center" },
      {
        [prop]: 1,
        ease: "none",
        scrollTrigger: {
          trigger: o.trigger ?? el,
          start: o.start ?? "top 75%",
          end: o.end ?? "bottom 60%",
          scrub: o.scrub === undefined ? 0.5 : o.scrub,
        },
      }
    );
  };

  return { reveal, countUp, parallax, drawLine };
}

/**
 * Run GSAP animations scoped to `scope`. `build` receives the helpers plus the scope element and is
 * only invoked when motion is allowed. Everything it creates is reverted on unmount / when the
 * visitor switches on reduced motion. Layout effect => initial hidden states apply before first paint.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  build: (helpers: MotionHelpers, root: HTMLElement) => void,
  deps: ReadonlyArray<unknown> = []
) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      build(createHelpers(), root);
    }, root);

    // Layout may shift after fonts/images load; keep ScrollTrigger positions accurate.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const fontsReady = document.fonts?.ready.then(refresh).catch(() => undefined);
    void fontsReady;

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Split a string into words for masked word-reveal headings. */
export function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}
