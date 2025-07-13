import { dashboardQuery } from "@/queries/dashboard.query";
import { dashboardService } from "@/services/dashboard.service";
import { useQueryClient, QueryObserver } from "@tanstack/react-query";
import { useState } from "react";

export const useTotalAgentsCount = () => {
  const queryClient = useQueryClient();
  const [numOfAgents, setNumOfAgents] = useState<number>();

  const observer = new QueryObserver(queryClient, {
    queryKey: dashboardQuery.keys.totalAgents,
    queryFn: dashboardService.totalAgents,
  });

  observer.subscribe((res) => {
    if (res.isSuccess) {
      const totalAgents = res.data.total;
      setNumOfAgents(totalAgents);
    }
  });

  return {
    numOfAgents,
  };
};
