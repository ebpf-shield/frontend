import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentsByOnlineDashboard } from "../AgentsByOnlineDashboard";
import { ProcessesByStatusDashboard } from "../ProcessesByStatusDashboard";
import { RulesByChainDashboard } from "../RulesByChainDashboard";
import { UsersByActiveDashboard } from "../UsersByActiveDashboard";
import { useTotalAgentsCount } from "./queryValueHooks/useTotalAgentsCount";
import { useTotalProcessesCount } from "./queryValueHooks/useTotalProcessesCount";
import { useTotalRulesCount } from "./queryValueHooks/useTotalRulesCount";
import { useTotalUsersCount } from "./queryValueHooks/useTotalUsersCount";

export const TopKpiDashboard = () => {
  const { numOfRules } = useTotalRulesCount();
  const { numOfProcesses } = useTotalProcessesCount();
  const { numOfUsers } = useTotalUsersCount();
  const { numOfAgents } = useTotalAgentsCount();

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
