import { Heart, Code2 } from "lucide-react";
import { meta } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-outline-default py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
            <Code2 size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground-default">
            {meta.name}
          </span>
        </div>
        <p className="text-xs text-foreground-subtle">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
