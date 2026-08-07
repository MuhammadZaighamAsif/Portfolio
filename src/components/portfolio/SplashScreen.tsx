// import { useEffect, useState } from "react";
// import { Code2 } from "lucide-react";

// interface SplashScreenProps {
//   onComplete: () => void;
// }

// export default function SplashScreen({ onComplete }: SplashScreenProps) {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     // Simulate loading progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(onComplete, 500); // Small delay before hiding
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 100);

//     return () => clearInterval(interval);
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-surface">
//       {/* Background orbs */}
//       <div className="orb orb-1" style={{ animation: "float 6s ease-in-out infinite" }} />
//       <div className="orb orb-2" style={{ animation: "float 8s ease-in-out infinite" }} />
//       <div className="orb orb-3" style={{ animation: "float 7s ease-in-out infinite" }} />

//       <div className="relative z-10 flex flex-col items-center gap-8">
//         {/* Logo with pulse animation */}
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-50 animate-pulse" />
//           <div className="relative w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-primary">
//             <Code2 size={40} className="text-white animate-bounce-slow" />
//           </div>
//         </div>

//         {/* Loading text */}
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gradient mb-2">
//             Muhammad Zaigham Asif
//           </h2>
//           <p className="text-sm text-foreground-subtle">
//             Please wait a moment...
//           </p>
//         </div>

//         {/* Progress bar */}
//         <div className="w-64 h-2 bg-surface-elevated rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-primary transition-all duration-300 ease-out rounded-full"
//             style={{ width: `${progress}%` }}
//           />
//         </div>

//         {/* Progress percentage */}
//         <p className="text-sm font-semibold text-primary-color">
//           {progress}%
//         </p>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const TIPS = [
  "Loading terrain...",
  "Punching trees...",
  "Crafting a pickaxe...",
  "Smelting iron...",
  "Mining diamonds...",
  "Building a portfolio...",
  "Taming skills...",
  "Enchanting projects...",
  "Placing torches...",
  "World ready!",
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const tipIndex = Math.min(Math.floor(progress / 10), TIPS.length - 1);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-surface">
      <div className="orb orb-1" style={{ animation: "float 6s ease-in-out infinite" }} />
      <div className="orb orb-2" style={{ animation: "float 8s ease-in-out infinite" }} />
      <div className="orb orb-3" style={{ animation: "float 7s ease-in-out infinite" }} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="animate-bounce-slow">
          <div className="mc-block">
            <div className="mc-block-grass" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="mc-font text-lg md:text-xl text-gradient mb-3">
            Muhammad Zaigham Asif
          </h2>
          <p className="mc-font text-[10px] text-foreground-subtle">
            {TIPS[tipIndex]}
          </p>
        </div>

        <div className="mc-progress-track">
          <div className="mc-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="mc-font text-xs text-primary-color">{progress}%</p>
      </div>
    </div>
  );
}