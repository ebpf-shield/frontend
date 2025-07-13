import { dashboardQuery } from "@/queries/dashboard.query";
import { dashboardService } from "@/services/dashboard.service";
import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useTotalUsersCount = () => {
  const queryClient = useQueryClient();
  const [numOfUsers, setNumOfUsers] = useState<number>();

  const observer = new QueryObserver(queryClient, {
    queryKey: dashboardQuery.keys.totalUsers,
    queryFn: dashboardService.totalUsers,
  });

  observer.subscribe((res) => {
    if (res.isSuccess) {
      const totalUsers = res.data.total;
      setNumOfUsers(totalUsers);
    }
  });

  return {
    numOfUsers,
  };
};
