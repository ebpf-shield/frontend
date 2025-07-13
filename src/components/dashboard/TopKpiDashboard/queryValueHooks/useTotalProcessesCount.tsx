import { dashboardQuery } from "@/queries/dashboard.query";
import { dashboardService } from "@/services/dashboard.service";
import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useTotalProcessesCount = () => {
  const queryClient = useQueryClient();

  const [numOfProcesses, setNumOfProcesses] = useState<number>();

  const observer = new QueryObserver(queryClient, {
    queryKey: dashboardQuery.keys.totalProcesses,
    queryFn: dashboardService.totalProcesses,
  });

  observer.subscribe((res) => {
    if (res.isSuccess) {
      const totalProcesses = res.data.running + res.data.stopped;
      setNumOfProcesses(totalProcesses);
    }
  });

  return {
    numOfProcesses,
  };
};
