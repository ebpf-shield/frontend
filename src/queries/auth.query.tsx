import { authService } from "@/services/auth.service";
import { queryOptions } from "@tanstack/react-query";

export const authQuery = {
  keys: {
    getToken: () => ["getToken"],
  },

  getTokenQueryOptions: () =>
    queryOptions({
      queryKey: authQuery.keys.getToken(),
      queryFn: async () => {
        return await authService.token();
      },
    }),
} as const;
