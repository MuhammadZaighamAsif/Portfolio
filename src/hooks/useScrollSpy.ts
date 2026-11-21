import { useState, useEffect } from "react";
import { NAV_OFFSET } from "@/lib/motion";

/**
 * Returns the id of the section currently under the navbar.
 * `sectionIds` should be a stable reference (module constant or memoised) so the
 * scroll listener isn't torn down and re-attached on every render.
 */
export function useScrollSpy(sectionIds: readonly string[], offset = NAV_OFFSET) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY + offset + 10;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      // Bail out of re-rendering when the active section hasn't changed.
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
