import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RouteError from "./pages/RouteError";
import RootLayout from "./pages/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    // Shown while a lazy route's chunk loads on a direct visit (avoids a white flash).
    hydrateFallbackElement: (
      <div
        role="status"
        aria-label="Loading"
        style={{ minHeight: "100vh", background: "var(--bg-primary)" }}
      />
    ),
    children: [
      { index: true, element: <Index /> },
      {
        path: "projects",
        // Loaded on demand so the home page doesn't pay for it.
        lazy: async () => ({
          Component: (await import("./pages/ProjectsPage")).default,
        }),
      },
      /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
      { path: "*", element: <NotFound /> },
    ],
  },
]);
