interface BrowserFrameProps {
  src: string;
  alt: string;
  host?: string;
  width: number;
  height: number;
  eager?: boolean;
  className?: string;
}

/** Decorative browser chrome around a screenshot (the chrome is aria-hidden; the image keeps its alt). */
export default function BrowserFrame({ src, alt, host, width, height, eager = false, className = "" }: BrowserFrameProps) {
  return (
    <div className={`bframe ${className}`}>
      <div className="bframe-bar" aria-hidden="true">
        <span className="bframe-dots">
          <i />
          <i />
          <i />
        </span>
        {host && <span className="bframe-url">{host}</span>}
      </div>
      <div className="bframe-view">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    </div>
  );
}
