import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import ProjectsPage from "./pages/ProjectsPage";
import NotFound from "./pages/NotFound";

const routeConfig = [
  {
    path: "/",
    name: "home",
    element: <Index />,
  },
  {
    path: "/projects",
    name: "projects-page",
    element: <ProjectsPage />,
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routeConfig);
