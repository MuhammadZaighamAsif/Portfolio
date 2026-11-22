import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, FileText, X } from "lucide-react";

export interface ViewerDocument {
  label: string;
  url: string;
  company: string;
}

interface DocumentViewerProps {
  doc: ViewerDocument;
  /** Element that opened the viewer; receives focus again when it closes. */
  trigger: HTMLElement | null;
  /** Called once the exit animation has finished and the viewer should unmount. */
  onClosed: () => void;
}

/** Keep in sync with the dv-*-out animation duration in experience.css. */
const EXIT_MS = 220;

/**
 * Modal PDF viewer. Rendered in a portal on <body> so no ancestor transform/filter can break its
 * position:fixed. Side effects (scroll lock, focus, Escape) are fully undone on close and on unmount.
 * The exit is a short CSS animation followed by a guaranteed timeout, so it can never get stuck.
 */
export default function DocumentViewer({ doc, trigger, onClosed }: DocumentViewerProps) {
  const [closing, setClosing] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const title = `${doc.company} — ${doc.label}`;

  const requestClose = useCallback(() => setClosing(true), []);

  // Scroll lock, initial focus, Escape + Tab trap. Re-runs (cleaning up) as soon as closing starts.
  useEffect(() => {
    if (closing) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (e.key !== "Tab") return;
      const first = linkRef.current;
      const last = closeButtonRef.current;
      if (!first || !last) return;
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (active !== first && active !== last) {
        e.preventDefault();
        last.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [closing, requestClose, trigger]);

  // Unmount after the exit animation (timeout is the source of truth, animationend is not needed).
  useEffect(() => {
    if (!closing) return;
    const id = window.setTimeout(onClosed, EXIT_MS);
    return () => window.clearTimeout(id);
  }, [closing, onClosed]);

  return createPortal(
    <div
      className="dv-overlay"
      data-closing={closing ? "true" : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        // Only a click on the backdrop itself closes the viewer.
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className="dv-panel">
        <header className="dv-bar">
          <span className="dv-icon" aria-hidden="true">
            <FileText size={18} />
          </span>
          <h2 className="dv-title">{title}</h2>
          <a
            ref={linkRef}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm dv-open"
            aria-label={`Open ${title} in a new tab`}
          >
            <ExternalLink size={15} aria-hidden="true" />
            <span className="dv-open-text">Open in new tab</span>
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={requestClose}
            className="icon-btn dv-close"
            aria-label="Close document"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <div className="dv-body">
          <iframe src={doc.url} className="dv-frame" title={title} />
        </div>
        <p className="dv-foot">
          Document not showing?{" "}
          <a href={doc.url} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
            Open it in a new tab
          </a>
          .
        </p>
      </div>
    </div>,
    document.body
  );
}
