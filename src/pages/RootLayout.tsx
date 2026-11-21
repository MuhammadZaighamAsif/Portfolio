import { Outlet, ScrollRestoration } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Outlet />
      {/* Resets scroll on navigation and restores it on back/forward */}
      <ScrollRestoration getKey={(location) => location.pathname} />
    </>
  );
}
