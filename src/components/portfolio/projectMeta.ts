import {
  AppWindow,
  BrainCircuit,
  Car,
  Cpu,
  Gamepad2,
  Globe,
  Layers,
  LifeBuoy,
  Plane,
  SquareKanban,
  Warehouse,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/data/portfolio";

/** Cool-leaning hues (plus one warm accent) that sit well beside the indigo brand colour. */
const HUES = [252, 188, 282, 160, 328, 222, 14, 204] as const;

export function getProjectHue(project: Project): number {
  return HUES[(project.id - 1 + HUES.length) % HUES.length];
}

/** Picks a lucide icon from the project's title, tags and categories. */
export function getProjectIcon(project: Project): LucideIcon {
  const title = project.title.toLowerCase();
  const tags = project.tags.map((t) => t.toLowerCase());
  const has = (...needles: string[]) => needles.some((n) => tags.includes(n));

  if (title.includes("pong") || title.includes("game")) return Gamepad2;
  if (title.includes("warehouse")) return Warehouse;
  if (title.includes("disaster")) return LifeBuoy;
  if (title.includes("tracker")) return SquareKanban;
  if (title.includes("energy")) return Zap;
  if (has("travel")) return Plane;
  if (title.includes("auto")) return Car;
  if (project.category === "AI" || has("nlp", "bert", "faiss")) return BrainCircuit;
  if (has("x86 assembly", "low-level programming")) return Cpu;
  if (has(".net", "windows forms")) return AppWindow;
  if (project.categories?.includes("Full Stack") || project.category === "Full Stack") return Layers;
  return Globe;
}

/** Short label shown on the cover chip. */
export function getProjectLabel(project: Project): string {
  if (project.category) return project.category;
  const tags = project.tags.map((t) => t.toLowerCase());
  if (tags.includes("x86 assembly")) return "Systems";
  if (tags.includes(".net")) return "Desktop";
  return "Project";
}

export function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export const pad = (n: number) => String(n).padStart(2, "0");
