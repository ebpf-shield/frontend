import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { queryClient } from "./util";

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
};
