import { useCallback, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import SplashScreen from "@/components/portfolio/SplashScreen";
import { prefersReducedMotion } from "@/lib/motion";

const queryClient = new QueryClient();

const SPLASH_SEEN_KEY = "portfolio-splash-seen";

/** Show the intro once per browser session, and never to visitors who prefer reduced motion. */
function shouldShowSplash(): boolean {
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(SPLASH_SEEN_KEY) !== "1";
  } catch {
    return true;
  }
}

const App = () => {
  const [showSplash, setShowSplash] = useState(shouldShowSplash);

  const handleSplashComplete = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    } catch {
      // Non-fatal: the intro may simply replay on the next load.
    }
    setShowSplash(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

        {/* Opacity-only fade: a retained transform here would trap every position:fixed child (navbar, modals). */}
        {!showSplash && (
          <div className="page-enter">
            <RouterProvider router={router} />
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
