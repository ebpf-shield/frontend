import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardQuery } from "@/queries/dashboard.query";
import { dashboardService } from "@/services/dashboard.service";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AgentsByOnlineDashboard } from "../AgentsByOnlineDashboard";
import { ProcessesByStatusDashboard } from "../ProcessesByStatusDashboard";
import { RulesByChainDashboard } from "../RulesByChainDashboard";
import { UsersByActiveDashboard } from "../UsersByActiveDashboard";
import { useEffect, useState } from "react";

export const TopKpiDashboard = () => {
  const queryClient = useQueryClient();

  const [numOfRules, setNumOfRules] = useState<number>();
  const [numOfProcesses, setNumOfProcesses] = useState<number>();
  const [numOfAgents, setNumOfAgents] = useState<number>();
  const [numOfUsers, setNumOfUsers] = useState<number>();

  useEffect(() => {
    queryClient
      .ensureQueryData({
        queryKey: dashboardQuery.keys.rulesByChain,
      })
      .then((data) => {
        const res = z.array(dashboardService.rulesByChainSchema).parse(data);
        const totalRules = res.reduce((sum, item) => sum + item.count, 0);
        setNumOfRules(totalRules);
      });
  }, [queryClient]);

  useEffect(() => {
    queryClient
      .ensureQueryData({
        queryKey: dashboardQuery.keys.totalProcesses,
      })
      .then((data) => {
        const res = dashboardService.totalProcessesSchema.parse(data);
        setNumOfProcesses(res.running + res.stopped);
      });
  }, [queryClient]);

  useEffect(() => {
    queryClient
      .ensureQueryData({
        queryKey: dashboardQuery.keys.totalAgents,
      })
      .then((data) => {
        const res = dashboardService.totalAgentsSchema.parse(data);
        setNumOfAgents(res.total);
      });
  }, [queryClient]);

  useEffect(() => {
    queryClient
      .ensureQueryData({
        queryKey: dashboardQuery.keys.totalUsers,
      })
      .then((data) => {
        const res = dashboardService.totalUsersSchema.parse(data);
        setNumOfUsers(res.total);
      });
  }, [queryClient]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">High-Level KPIs</h2>

      <div className="flex flex-wrap justify-between">
        <Card className="w-[200px] m-2">
          <CardHeader>
            <CardTitle className="text-sm">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {numOfAgents ? numOfAgents : "Loading..."}
            </div>
          </CardContent>
        </Card>

        <Card className="w-[200px] m-2">
          <CardHeader>
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {numOfUsers ? numOfUsers : "Loading..."}
            </div>
          </CardContent>
        </Card>

        <Card className="w-[200px] m-2">
          <CardHeader>
            <CardTitle className="text-sm">Total Processes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {numOfProcesses ? numOfProcesses : "Loading..."}
            </div>
          </CardContent>
        </Card>

        <Card className="w-[200px] m-2">
          <CardHeader>
            <CardTitle className="text-sm">Total Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {numOfRules ? numOfRules : "Loading..."}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Charts with vertical spacing */}
      <div className="my-8 grid grid-cols-2 gap-8">
        <AgentsByOnlineDashboard />

        <UsersByActiveDashboard />

        <ProcessesByStatusDashboard />

        <RulesByChainDashboard />
      </div>
    </div>
  );
};
