import { useEffect } from "react";
import { meta, projects } from "@/data/portfolio";

export const SITE_URL = "https://muhammadzaighamasif.vercel.app";
export const SITE_NAME = meta.name;

/** Canonical title / description for the home page (keep in sync with index.html). */
export const HOME_META = {
  title: "Muhammad Zaigham Asif | Full-Stack & AI Software Engineer",
  description:
    "Muhammad Zaigham Asif is a Lahore-based Software Engineer building full-stack web apps with React and Node.js, plus AI/NLP projects. See his work and resume.",
} as const;

export const PROJECTS_META = {
  title: "Projects | Muhammad Zaigham Asif",
  description:
    "Selected projects by Muhammad Zaigham Asif: MERN web apps, a live client travel website, and AI/NLP tools built with Python, Flask, FAISS and BERT.",
} as const;

interface PageMeta {
  title: string;
  /** Meta description / og:description / twitter:description for this route. */
  description?: string;
  /** Path for the canonical + og:url, e.g. "/projects". Defaults to the current pathname. */
  path?: string;
  /** Ask search engines not to index this page (e.g. 404 / error pages). */
  noindex?: boolean;
  /** Extra JSON-LD nodes for this route only (removed again on unmount). */
  jsonLd?: Record<string, unknown>;
}

type Restore = () => void;

/** Sets an attribute on a (possibly new) <meta>/<link> and returns a function that restores it. */
function setHeadTag(
  selector: string,
  create: () => HTMLElement,
  attr: string,
  value: string
): Restore {
  let el = document.head.querySelector<HTMLElement>(selector);
  const created = !el;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  const previous = el.getAttribute(attr);
  el.setAttribute(attr, value);
  const target = el;
  return () => {
    if (created) target.remove();
    else if (previous === null) target.removeAttribute(attr);
    else target.setAttribute(attr, previous);
  };
}

const metaByName = (name: string) => () => {
  const m = document.createElement("meta");
  m.setAttribute("name", name);
  return m;
};
const metaByProp = (property: string) => () => {
  const m = document.createElement("meta");
  m.setAttribute("property", property);
  return m;
};

/** Route-specific structured data, derived from the portfolio data so it can't drift. */
function routeDefaults(canonicalPath: string): { description?: string; jsonLd?: Record<string, unknown> } {
  if (canonicalPath === "/projects") {
    return {
      description: PROJECTS_META.description,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "@id": `${SITE_URL}/projects#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
            ],
          },
          {
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/projects#webpage`,
            url: `${SITE_URL}/projects`,
            name: PROJECTS_META.title,
            description: PROJECTS_META.description,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#person` },
            breadcrumb: { "@id": `${SITE_URL}/projects#breadcrumb` },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: projects.length,
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: p.live || p.github || `${SITE_URL}/projects`,
              })),
            },
          },
        ],
      },
    };
  }
  return {};
}

/**
 * Per-route <head> management for a client-rendered SPA: title, description, canonical, Open Graph /
 * Twitter tags, robots and optional JSON-LD. Everything is restored when the page unmounts so routes
 * never leak metadata into each other.
 */
export function usePageMeta({ title, description, path, noindex = false, jsonLd }: PageMeta) {
  // Serialised so an inline object literal doesn't re-run the effect on every render.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const restores: Restore[] = [];
    const previousTitle = document.title;
    document.title = title;

    const url = `${SITE_URL}${path ?? window.location.pathname}`.replace(/\/$/, "") || SITE_URL;
    const canonicalUrl = url === SITE_URL ? `${SITE_URL}/` : url;
    const canonicalPath = canonicalUrl.slice(SITE_URL.length) === "/" ? "/" : canonicalUrl.slice(SITE_URL.length);
    const defaults = noindex ? {} : routeDefaults(canonicalPath);
    const desc = description ?? defaults.description;
    const ld = jsonLdKey ? (JSON.parse(jsonLdKey) as Record<string, unknown>) : defaults.jsonLd;

    restores.push(
      setHeadTag('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      }, "href", canonicalUrl),
      setHeadTag('meta[property="og:title"]', metaByProp("og:title"), "content", title),
      setHeadTag('meta[name="twitter:title"]', metaByName("twitter:title"), "content", title),
      setHeadTag('meta[property="og:url"]', metaByProp("og:url"), "content", canonicalUrl)
    );

    if (desc) {
      restores.push(
        setHeadTag('meta[name="description"]', metaByName("description"), "content", desc),
        setHeadTag('meta[property="og:description"]', metaByProp("og:description"), "content", desc),
        setHeadTag('meta[name="twitter:description"]', metaByName("twitter:description"), "content", desc)
      );
    }

    if (noindex) {
      restores.push(
        setHeadTag('meta[name="robots"]', metaByName("robots"), "content", "noindex, nofollow"),
        setHeadTag('meta[name="googlebot"]', metaByName("googlebot"), "content", "noindex, nofollow")
      );
    }

    if (ld) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-page-meta", "");
      script.textContent = JSON.stringify(ld);
      document.head.appendChild(script);
      restores.push(() => script.remove());
    }

    return () => {
      document.title = previousTitle;
      restores.reverse().forEach((r) => r());
    };
  }, [title, description, path, noindex, jsonLdKey]);
}
