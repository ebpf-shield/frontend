import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "./RouterProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { QueryClientProvider } from "./query/QueryClientProvider";
import { AuthProvider } from "./Auth/provider";

export const GlobalProvider = () => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider />
        </AuthProvider>
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};
