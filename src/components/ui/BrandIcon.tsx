import {
  Bot,
  BrainCircuit,
  ClipboardCheck,
  Code2,
  Database,
  FileSearch,
  GitPullRequest,
  Layers,
  Network,
  PenTool,
  Plug,
  Repeat,
  Server,
  ShieldCheck,
  UserCheck,
  Box,
  type LucideIcon,
} from "lucide-react";
import { brandIcons } from "@/data/brandIcons";
import type { FallbackIcon } from "@/data/portfolio";

const fallbackIcons: Record<FallbackIcon, LucideIcon> = {
  generic: Box,
  design: PenTool,
  mcp: Plug,
  plug: Plug,
  balancer: Network,
  cicd: Repeat,
  loop: Repeat,
  agents: Bot,
  server: Server,
  pullrequest: GitPullRequest,
  memory: Layers,
  eval: ClipboardCheck,
  guard: ShieldCheck,
  human: UserCheck,
  rag: FileSearch,
  brain: BrainCircuit,
  code: Code2,
  database: Database,
};

interface BrandIconProps {
  /** Tool name, matched against the bundled logo set. */
  name: string;
  /** Lucide icon used when there is no logo for `name`. */
  fallback?: FallbackIcon;
  size?: number;
  className?: string;
}

/** A brand logo when one is bundled for `name`, otherwise a neutral line icon. Always decorative (aria-hidden). */
export default function BrandIcon({ name, fallback = "generic", size = 24, className }: BrandIconProps) {
  const logo = brandIcons[name];
  if (logo) {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox={`0 0 ${logo.w} ${logo.h}`}
        aria-hidden="true"
        focusable="false"
        data-brand=""
        // Static, build-time SVG markup from the bundled logo set, never user input.
        dangerouslySetInnerHTML={{ __html: logo.body }}
      />
    );
  }
  const Icon = fallbackIcons[fallback];
  return <Icon className={className} size={size} strokeWidth={1.8} aria-hidden="true" />;
}
