import { Code2 } from "lucide-react";
import { meta } from "@/data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-12 border-t"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 flex items-center justify-center rounded-full"
              style={{ 
                background: "var(--text-primary)",
                color: "var(--bg-primary)"
              }}
            >
              <Code2 size={18} />
            </div>
            <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
              {meta.name}
            </span>
          </div>

          {/* Copyright */}
          <p 
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            © {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
