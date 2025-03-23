import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        שד
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
