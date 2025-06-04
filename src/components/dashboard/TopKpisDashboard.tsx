// frontend/src/components/dashboard/TopKpisDashboard.tsx

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import {
  Card,
  CardHeader,
  CardTitle,
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

const COLORS = ["#4CAF50", "#F44336", "#2196F3"]; // reused for various charts

interface AgentsKpi {
  total: number;
  online: number;
  offline: number;
}
interface UsersKpi {
  total: number;
  active: number;
  inactive: number;
}
interface ProcessesKpi {
  running: number;
  stopped: number;
}
interface RulesKpi {
  drop: number;
  allow: number;
}

export const TopKpisDashboard: React.FC = () => {
  // 1. Fetch Agents KPI
  const agentsQuery = useQuery<AgentsKpi>({
    queryKey: dashboardQuery.keys.totalAgents,
    queryFn: () => dashboardService.totalAgents(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // 2. Fetch Users KPI
  const usersQuery = useQuery<UsersKpi>({
    queryKey: dashboardQuery.keys.totalUsers,
    queryFn: () => dashboardService.totalUsers(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // 3. Fetch Processes KPI
  const processesQuery = useQuery<ProcessesKpi>({
    queryKey: dashboardQuery.keys.totalProcesses,
    queryFn: () => dashboardService.totalProcesses(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // 4. Fetch Rules KPI
  const rulesQuery = useQuery<RulesKpi>({
    queryKey: dashboardQuery.keys.totalRules,
    queryFn: () => dashboardService.totalRules(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // (A) “Last updated” timestamp state + flash toggle
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [flash, setFlash] = useState<boolean>(false);

  useEffect(() => {
    // Only update timestamp once all queries have succeeded
    if (
      agentsQuery.isSuccess &&
      usersQuery.isSuccess &&
      processesQuery.isSuccess &&
      rulesQuery.isSuccess
    ) {
      // Format as HH:MM:SS (zero‐padded)
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setLastUpdated(`${hh}:${mm}:${ss}`);

      // Trigger flash effect on the text
      setFlash(true);
      const timeout = window.setTimeout(() => setFlash(false), 800);
      return () => window.clearTimeout(timeout);
    }
  }, [
    agentsQuery.dataUpdatedAt,
    usersQuery.dataUpdatedAt,
    processesQuery.dataUpdatedAt,
    rulesQuery.dataUpdatedAt,
    agentsQuery.isSuccess,
    usersQuery.isSuccess,
    processesQuery.isSuccess,
    rulesQuery.isSuccess,
  ]);

  // Show loading if any KPI is still loading
  if (
    agentsQuery.isLoading ||
    usersQuery.isLoading ||
    processesQuery.isLoading ||
    rulesQuery.isLoading
  ) {
    return <p>Loading KPIs…</p>;
  }
  // Show error if any KPI failed
  if (
    agentsQuery.isError ||
    usersQuery.isError ||
    processesQuery.isError ||
    rulesQuery.isError
  ) {
    return <p>Error loading KPIs.</p>;
  }

  // Destructure KPI data
  const { total: totalAgents, online, offline } = agentsQuery.data!;
  const { total: totalUsers, active, inactive } = usersQuery.data!;
  const { running, stopped } = processesQuery.data!;
  const { drop, allow } = rulesQuery.data!;

  // Pie chart slices:
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
    { name: "Drop", value: drop },
    { name: "Allow", value: allow },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">High-Level KPIs</h2>

      {/* Numeric KPI cards */}
      <div className="flex flex-wrap justify-between">
        <Card className="w-[200px] m-2">
          <CardHeader>
            <CardTitle className="text-sm">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">{totalAgents}</div>
          </CardContent>
        </Card>

        <Card className="w-[200px] m-2">
          <CardHeader>
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card className="w-[200px] m-2">
          <CardHeader>
            <CardTitle className="text-sm">Total Processes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {running + stopped}
            </div>
          </CardContent>
        </Card>

        <Card className="w-[200px] m-2">
          <CardHeader>
            <CardTitle className="text-sm">Total Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">{drop + allow}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Charts with vertical spacing */}
      <div className="my-8 grid grid-cols-2 gap-8">
        <div className="w-full h-[300px]">
          <h3 className="text-lg font-medium text-center mb-0">
            Agents Online vs. Offline
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={agentPie}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {agentPie.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-[300px]">
          <h3 className="text-lg font-medium text-center mb-0">
            Users Active vs. Inactive
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={usersPie}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {usersPie.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-[300px]">
          <h3 className="text-lg font-medium text-center mb-0">
            Processes by Status
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={procsPie}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {procsPie.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-[300px]">
          <h3 className="text-lg font-medium text-center mb-0">
            Firewall Rules Drop vs. Allow
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={rulesPie}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {rulesPie.map((entry) => {
                  const fillColor = entry.name === "Allow" ? "#4CAF50" : "#F44336";
                  return <Cell key={entry.name} fill={fillColor} />;
                })}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* “Last updated” timestamp with text-only flash */}
      <div className="mt-4 text-right text-xs italic">
        <span
          className={`inline-block ${
            flash
              ? "text-green-500 transition-colors duration-800"
              : "text-gray-600 transition-colors duration-800"
          }`}
        >
          Last updated: {lastUpdated}
        </span>
      </div>
    </div>
  );
};
