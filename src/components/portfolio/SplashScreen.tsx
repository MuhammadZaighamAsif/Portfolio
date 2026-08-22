import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate squares
    const squares = squaresRef.current?.querySelectorAll(".acid-square");
    if (squares) {
      squares.forEach((square, i) => {
        gsap.to(square, {
          rotation: 360,
          scale: gsap.utils.random(0.5, 1.5),
          x: gsap.utils.random(-50, 50),
          y: gsap.utils.random(-50, 50),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });
    }

    // Content entrance
    gsap.from(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });

    // Progress animation
    const duration = 2500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.floor(newProgress));

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        // Exit animation
        gsap.to(squaresRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.in(1.5)",
        });
        gsap.to(contentRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          delay: 0.3,
          onComplete,
        });
      }
    };

    setTimeout(animate, 300);
  }, [onComplete]);

  // Generate acid squares
  const generateSquares = () => {
    const squares = [];
    const positions = [
      { top: "10%", left: "15%", size: 80, delay: 0 },
      { top: "20%", right: "20%", size: 60, delay: 0.2 },
      { bottom: "25%", left: "25%", size: 100, delay: 0.4 },
      { bottom: "15%", right: "15%", size: 70, delay: 0.6 },
      { top: "50%", left: "8%", size: 50, delay: 0.8 },
      { top: "60%", right: "10%", size: 90, delay: 1 },
      { top: "35%", left: "45%", size: 40, delay: 1.2 },
    ];

    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      squares.push(
        <div
          key={i}
          className="acid-square absolute"
          style={{
            ...pos,
            width: pos.size,
            height: pos.size,
            border: "2px solid var(--accent)",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />
      );
    }
    return squares;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      {/* Acid squares background */}
      <div ref={squaresRef} className="absolute inset-0">
        {generateSquares()}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 mb-3 relative"
          >
            {/* Rotating square behind text */}
            <div
              className="absolute inset-0 border-2"
              style={{
                borderColor: "var(--accent)",
                animation: "rotate 3s linear infinite",
              }}
            />
            <span
              className="relative text-3xl font-bold z-10"
              style={{ color: "var(--text-primary)" }}
            >
              MZA
            </span>
          </div>
        </div>

        {/* Progress bar container */}
        <div className="w-56 mx-auto">
          {/* Progress bar background */}
          <div
            className="relative h-1 mb-3 overflow-hidden"
            style={{ background: "var(--border-color)" }}
          >
            {/* Animated progress */}
            <div
              className="absolute inset-y-0 left-0 transition-all duration-200 ease-out"
              style={{
                width: `${progress}%`,
                background: "var(--accent)",
              }}
            />
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                animation: "shimmer 1.5s infinite",
                transform: `translateX(${(progress - 100)}%)`,
              }}
            />
          </div>

          {/* Progress percentage */}
          <div className="flex items-center justify-between text-xs">
            <span
              className="font-medium tracking-wider"
              style={{ color: "var(--text-secondary)" }}
            >
              LOADING
            </span>
            <span
              className="font-bold tabular-nums"
              style={{ color: "var(--accent)" }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Add keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}