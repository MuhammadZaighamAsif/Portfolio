import { useEffect } from "react";

interface PageMeta {
  title: string;
  /** Ask search engines not to index this page (e.g. 404 / error pages). */
  noindex?: boolean;
}

/**
 * Sets the document title (and optionally a robots noindex tag) for the current page,
 * restoring the previous values when the page unmounts.
 */
export function usePageMeta({ title, noindex = false }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let robots: HTMLMetaElement | null = null;
    let previousRobots: string | null = null;
    if (noindex) {
      robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
      previousRobots = robots?.getAttribute("content") ?? null;
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    }

    return () => {
      document.title = previousTitle;
      if (robots) {
        if (previousRobots === null) robots.remove();
        else robots.setAttribute("content", previousRobots);
      }
    };
  }, [title, noindex]);
}
