import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RootContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
  errorComponent: ({ error }) => (
    <div className="flex flex-col items-center justify-center h-screen">Error: {error.message}</div>
  ),
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});
