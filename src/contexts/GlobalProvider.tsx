import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "./RouterProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { QueryClientProvider } from "./query/QueryClientProvider";

export const GlobalProvider = () => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};
