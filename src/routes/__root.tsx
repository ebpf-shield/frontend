import { Toaster } from "@/components/ui/sonner";
import { AuthContextProps } from "@/contexts/Auth/context";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RootContext {
  queryClient: QueryClient;
  auth: AuthContextProps;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <>
      <div className="flex flex-col items-center justify-center size-full">
        <Toaster expand />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
  errorComponent: ({ error }) => (
    <div className="flex flex-col items-center justify-center h-full">
      Error: {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6">
      <img src="/404.png" alt="404 Not Found" className="max-w-xl" />
      <Link to="/" className="text-blue-500 hover:underline">Go Home</Link>
    </div>
  ),
});

