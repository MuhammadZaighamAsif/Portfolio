import { useState, useEffect, RefObject } from "react";

export function useIntersection(
  ref: RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}
