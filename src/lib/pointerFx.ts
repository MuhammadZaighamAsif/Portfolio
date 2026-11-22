/**
 * Pointer-driven micro-interactions. All of them are no-ops for touch devices and for visitors who
 * prefer reduced motion, so they are safe to attach unconditionally.
 */
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function pointerFxAllowed(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(FINE_POINTER).matches &&
    !prefersReducedMotion()
  );
}

/**
 * Sets --mx / --my (px, relative to each matching child) on pointer move so `.spotlight` cards can
 * paint a soft glow under the cursor. Event-delegated: one listener for the whole grid.
 */
export function useSpotlight(containerRef: RefObject<HTMLElement | null>, selector = ".spotlight") {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !pointerFxAllowed()) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = (e.target as Element | null)?.closest<HTMLElement>(selector);
        if (!card || !container.contains(card)) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };

    container.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      container.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [containerRef, selector]);
}

/**
 * Makes an element subtly follow the pointer when it is near (magnetic buttons).
 * `strength` ~0.2–0.4. Uses gsap.quickTo (no per-event tween allocation) and resets on leave.
 */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.3) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !pointerFxAllowed()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "x,y" });
    };
  }, [ref, strength]);
}

/**
 * 3D tilt toward the pointer for a single element (e.g. the profile photo).
 * `max` is the maximum rotation in degrees. Parent should have `perspective` set (or pass it in).
 */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, max = 6) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !pointerFxAllowed()) return;

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    gsap.set(el, { transformPerspective: 900, transformOrigin: "center" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * max * 2);
      rx(-py * max * 2);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [ref, max]);
}
