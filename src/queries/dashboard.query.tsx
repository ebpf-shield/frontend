import { dashboardService } from "@/services/dashboard.service";
import { queryOptions } from "@tanstack/react-query";

const PREFIX = "dashboard" as const;

export const dashboardQuery = {
  keys: {
    commonProcesses: [PREFIX, "common-processes"],
    processesWithMostRules: [PREFIX, "processes-with-most-rules"],
    rulesByChain: [PREFIX, "rules-by-chain"],
  },

  commonProcessQueryOptions: () => {
    return queryOptions({
      queryKey: dashboardQuery.keys.commonProcesses,
      queryFn: () => {
        return dashboardService.commonProcesses();
      },
      refetchInterval: 1000 * 5, // 5 seconds
    });
  },
  processesWithMostRulesQueryOptions: () => {
    return queryOptions({
      queryKey: dashboardQuery.keys.processesWithMostRules,
      queryFn: () => {
        return dashboardService.processesWithMostRules();
      },
      refetchInterval: 1000 * 5, // 5 seconds
    });
  },

  rulesByChainQueryOptions: () => {
    return queryOptions({
      queryKey: dashboardQuery.keys.rulesByChain,
      queryFn: () => {
        return dashboardService.rulesByChain();
      },
      refetchInterval: 1000 * 5, // 5 seconds
    });
  },
} as const;
