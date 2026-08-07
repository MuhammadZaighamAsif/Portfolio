import { Trophy } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export function showAchievement(title: string, description?: string) {
  toast.custom(
    () => (
      <div className="mc-achievement">
        <div className="mc-achievement-icon">
          <Trophy size={18} className="text-black" />
        </div>
        <div>
          <p className="mc-achievement-title">Achievement Get!</p>
          <p className="mc-achievement-subtitle">{title}</p>
          {description && <p className="mc-achievement-desc">{description}</p>}
        </div>
      </div>
    ),
    { duration: 3500, position: "top-right" }
  );
}