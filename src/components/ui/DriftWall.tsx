import { useMemo } from "react";

interface DriftWallItem {
  image?: string;
  title?: string;
  label?: string;
  href?: string;
  background?: string;
}

interface DriftWallProps {
  items: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  speed?: number;
  direction?: "up" | "down";
  pauseOnHover?: boolean;
  grayscale?: boolean;
}

export default function DriftWall({
  items,
  columns = 4,
  tileWidth = 180,
  tileHeight = 118,
  gap = 16,
  speed = 42,
  direction = "up",
  pauseOnHover = true,
  grayscale = true,
}: DriftWallProps) {
  const wallColumns = useMemo(
    () => Array.from({ length: columns }, (_, columnIndex) =>
      items.filter((_, itemIndex) => itemIndex % columns === columnIndex)
    ),
    [columns, items]
  );
  const driftDistance = `${((tileHeight + gap) * 4).toFixed(0)}px`;

  return (
    <div
      className={`drift-wall${pauseOnHover ? " drift-wall-pause" : ""}${grayscale ? " drift-wall-grayscale" : ""}`}
      style={{
        ["--drift-width" as string]: `${tileWidth}px`,
        ["--drift-height" as string]: `${tileHeight}px`,
        ["--drift-gap" as string]: `${gap}px`,
        ["--drift-speed" as string]: `${speed}s`,
        ["--drift-direction" as string]: direction === "up" ? "-1" : "1",
        ["--drift-translate" as string]: `${direction === "up" ? "-" : ""}${driftDistance}`,
      }}
      aria-hidden="true"
    >
      <div className="drift-wall-perspective">
        {wallColumns.map((column, columnIndex) => {
          const tiles = [...column, ...column];
          return (
            <div
              className="drift-wall-column"
              key={columnIndex}
              style={{ animationDelay: `${columnIndex * -2.5}s` }}
            >
              {tiles.map((item, itemIndex) => (
                <div
                  className="drift-wall-tile"
                  key={`${item.title ?? item.label ?? item.image ?? "tile"}-${itemIndex}`}
                  style={item.background ? { background: item.background } : undefined}
                >
                  {item.image ? <img src={item.image} alt="" /> : <div className="drift-wall-fallback" style={item.background ? { background: item.background } : undefined} />}
                  {item.title && <span className="drift-wall-title">{item.title}</span>}
                  {item.label && <span className="drift-wall-label">{item.label}</span>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
