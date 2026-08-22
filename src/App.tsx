import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import SplashScreen from "@/components/portfolio/SplashScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        
        {!showSplash && (
          <div className="animate-in fade-in duration-500">
          <RouterProvider router={router} />
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
