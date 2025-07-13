import { dashboardQuery } from "@/queries/dashboard.query";
import { dashboardService } from "@/services/dashboard.service";
import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useTotalRulesCount = () => {
  const queryClient = useQueryClient();
  const [numOfRules, setNumOfRules] = useState<number>();

  const observer = new QueryObserver(queryClient, {
    queryKey: dashboardQuery.keys.rulesByChain,
    queryFn: dashboardService.rulesByChain,
  });

  observer.subscribe((res) => {
    if (res.isSuccess) {
      const totalRules = res.data.reduce((sum, item) => sum + item.count, 0);
      setNumOfRules(totalRules);
    }
  });

  return {
    numOfRules,
  };
};
