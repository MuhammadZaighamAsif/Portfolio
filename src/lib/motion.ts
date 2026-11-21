/** True when the visitor has asked the OS/browser to minimise animation. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Offset (px) that keeps section headings clear of the fixed navbar. */
export const NAV_OFFSET = 80;

/** Smoothly scrolls to a section by id, honouring reduced-motion and the fixed navbar. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
