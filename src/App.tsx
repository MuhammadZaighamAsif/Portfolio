import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routers } from "./router";
import SplashScreen from "@/components/portfolio/SplashScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = createBrowserRouter(routers);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        
        <div
          className={`transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <RouterProvider router={router} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
