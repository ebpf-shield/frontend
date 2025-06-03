// src/components/dashboard/TopKpisDashboard.tsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { dashboardQuery } from "../../queries/dashboard.query";

const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#FFC107"]; // green, red, blue, amber

// 1) Agents KPI shape (contains total, online, offline)
interface AgentsKpi {
  total: number;
  online: number;
  offline: number;
}

// 2) Users KPI shape (contains total, active, inactive)
interface UsersKpi {
  total: number;
  active: number;
  inactive: number;
}

// 3) Processes KPI shape (contains running, stopped)
interface ProcessesKpi {
  running: number;
  stopped: number;
}

// 4) Rules KPI shape (contains drop and allow counts)
interface RulesKpi {
  drop: number;
  allow: number;
}

// A small wrapper card component for a numeric KPI
const KpiCard: React.FC<{ title: string; value: number; description?: string }> = ({
  title,
  value,
  description,
}) => (
  <Card className="w-[200px] m-2">
    <CardHeader>
      <CardTitle className="text-sm">{title}</CardTitle>
      {description && <CardDescription className="text-xs">{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-center">{value}</div>
    </CardContent>
  </Card>
);

export const TopKpisDashboard: React.FC = () => {
  // 1) Fetch AgentsKpi (total/online/offline)
  const agentsQuery = useQuery<AgentsKpi>({
    queryKey: dashboardQuery.keys.totalAgents,
    queryFn: () => dashboardService.totalAgents(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // 2) Fetch UsersKpi (total/active/inactive)
  const usersQuery = useQuery<UsersKpi>({
    queryKey: dashboardQuery.keys.totalUsers,
    queryFn: () => dashboardService.totalUsers(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // 3) Fetch ProcessesKpi (running/stopped)
  const processesQuery = useQuery<ProcessesKpi>({
    queryKey: dashboardQuery.keys.totalProcesses,
    queryFn: () => dashboardService.totalProcesses(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // 4) Fetch RulesKpi (drop/allow)
  const rulesQuery = useQuery<RulesKpi>({
    queryKey: dashboardQuery.keys.totalRules,
    queryFn: () => dashboardService.totalRules(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // Show loading state if any of the four queries is still loading
  if (
    agentsQuery.isLoading ||
    usersQuery.isLoading ||
    processesQuery.isLoading ||
    rulesQuery.isLoading
  ) {
    return <p>Loading KPIs…</p>;
  }
  // Show error if any query fails
  if (
    agentsQuery.isError ||
    usersQuery.isError ||
    processesQuery.isError ||
    rulesQuery.isError
  ) {
    return <p>Error loading KPIs.</p>;
  }

  // Extract each shape’s data
  const { total: totalAgents, online, offline } = agentsQuery.data!;
  const { total: totalUsers, active, inactive } = usersQuery.data!;
  const { running, stopped } = processesQuery.data!;
  const { drop, allow } = rulesQuery.data!;

  // Prepare Pie chart data for each category
  const agentPie = [
    { name: "Online", value: online },
    { name: "Offline", value: offline },
  ];
  const usersPie = [
    { name: "Active", value: active },
    { name: "Inactive", value: inactive },
  ];
  const procsPie = [
    { name: "Running", value: running },
    { name: "Stopped", value: stopped },
  ];
  const rulesPie = [
    { name: "Allow", value: allow },
    { name: "Drop", value: drop }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">High-Level KPIs</h2>

      {/* Numeric KPI cards */}
      <div className="flex flex-wrap justify-between">
        <KpiCard title="Total Agents" value={totalAgents} />
        <KpiCard title="Total Users" value={totalUsers} />
        <KpiCard
          title="Total Processes"
          value={running + stopped}
        />
        <KpiCard title="Total Rules" value={drop + allow} />
      </div>

      {/* Four pie charts */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="w-full h-[300px]">
          <h3 className="text-lg font-medium mb-2">Agents Online vs. Offline</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={agentPie}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {agentPie.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-[300px]">
          <h3 className="text-lg font-medium mb-2">Users Active vs. Inactive</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={usersPie}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {usersPie.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-[300px]">
          <h3 className="text-lg font-medium mb-2">Processes by Status</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={procsPie}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {procsPie.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-[300px]">
          <h3 className="text-lg font-medium mb-2">Firewall Rules Drop vs. Allow</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={rulesPie}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {rulesPie.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
