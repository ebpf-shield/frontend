import { dashboardService } from "@/services/dashboard.service";
import { queryOptions } from "@tanstack/react-query";

const PREFIX = "dashboard" as const;

export const dashboardQuery = {
  keys: {
    commonProcesses: [PREFIX, "common-processes"] as const,
    processesWithMostRules: [PREFIX, "processes-with-most-rules"] as const,
    rulesByChain: [PREFIX, "rules-by-chain"] as const,

    totalAgents: [PREFIX, "total-agents"] as const,
    totalUsers: [PREFIX, "total-users"] as const,
    totalProcesses: [PREFIX, "total-processes"] as const,
    totalRules: [PREFIX, "total-rules"] as const,

    agentsOsDistribution: [PREFIX, "agents-os-distribution"] as const,
    agentsTimeseries: [PREFIX, "agents-timeseries"] as const,

    agentLocations: [PREFIX, "agent", "locations"] as const,
  },

  commonProcessQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.commonProcesses,
      queryFn: () => dashboardService.commonProcesses(),
      refetchInterval: 1000 * 5,
    }),

  processesWithMostRulesQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.processesWithMostRules,
      queryFn: () => dashboardService.processesWithMostRules(),
      refetchInterval: 1000 * 5,
    }),

  rulesByChainQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.rulesByChain,
      queryFn: () => dashboardService.rulesByChain(),
      refetchInterval: 1000 * 5,
    }),

  totalAgentsQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.totalAgents,
      queryFn: () => dashboardService.totalAgents(),
      refetchInterval: 1000 * 5,
    }),

  totalUsersQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.totalUsers,
      queryFn: () => dashboardService.totalUsers(),
      refetchInterval: 1000 * 5,
    }),

  totalProcessesQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.totalProcesses,
      queryFn: () => dashboardService.totalProcesses(),
      refetchInterval: 1000 * 5,
    }),

  agentsOsDistributionQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.agentsOsDistribution,
      queryFn: () => dashboardService.agentsOsDistribution(),
      refetchInterval: 1000 * 5,
    }),

  agentsTimeseriesQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.agentsTimeseries,
      queryFn: () => dashboardService.agentsTimeseries(),
      refetchInterval: 1000 * 5,
    }),

  agentLocationsQueryOptions: () =>
    queryOptions({
      queryKey: dashboardQuery.keys.agentLocations,
      queryFn: () => dashboardService.agentLocations(),
      refetchInterval: 60_000,
    }),
} as const;
