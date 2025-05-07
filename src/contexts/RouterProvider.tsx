import { createRouter, RouterProvider as TanstackRouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { queryClient } from "./query/util";
import { useAuthContext } from "./Auth/useProvider";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    // https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes#authentication-using-react-contexthooks
    auth: undefined!, // This will be provided by the AuthProvider in the react-land
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  defaultPendingMinMs: 0,
  defaultPendingMs: 0,
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const RouterProvider = () => {
  const auth = useAuthContext();

  return (
    <TanstackRouterProvider
      router={router}
      context={{
        auth,
      }}
    />
  );
};
