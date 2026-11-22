import { Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

/** Small, clean confirmation notice (e.g. "Resume downloaded"). Styled by `.notice` in index.css. */
export function showAchievement(title: string, description?: string) {
  toast.custom(
    () => (
      <div className="notice" role="status">
        <div className="notice-icon">
          <Check size={18} aria-hidden="true" />
        </div>
        <div>
          <p className="notice-title">{title}</p>
          {description && <p className="notice-desc">{description}</p>}
        </div>
      </div>
    ),
    { duration: 3200, position: "bottom-right" }
  );
}
