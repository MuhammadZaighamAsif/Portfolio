import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { bootstrapGeneratedSiteAnalytics } from "./analytics.ts";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root was not found.");
}

// Analytics must never prevent the site from rendering.
try {
  bootstrapGeneratedSiteAnalytics();
} catch (err) {
  console.error("Analytics bootstrap failed (non-fatal):", err);
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
