import { createRouter, RouterProvider } from "@tanstack/react-router";
import { GlobalProvider } from "./contexts/GlobalProvider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree, defaultPendingMinMs: 0, defaultPendingMs: 0 });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
};
