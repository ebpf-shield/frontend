// frontend/src/components/dashboard/TopKpisDashboard.tsx

import React, { useEffect, useState } from "react";
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
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat.js"; // ensure this plugin is available
import L from "leaflet";
import { dashboardQuery } from "../../queries/dashboard.query";

const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#FFC107"];

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

// LeafletHeat component: adds heat layer to map whenever `points` changes
const LeafletHeat: React.FC<{ points: [number, number, number][] }> = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || points.length === 0) return;
    // Remove existing heat layers:
    map.eachLayer((layer: any) => {
      if (layer instanceof (L as any).HeatLayer) {
        map.removeLayer(layer);
      }
    });
    // Create new heat layer with intensity 0.5 for each point
    const heatLayer = (L as any).heatLayer(points, {
      radius: 15,
      blur: 15,
      maxZoom: 10,
    });
    heatLayer.addTo(map);
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);
  return null;
};

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

  // 5. Fetch list of agent IPs
  const ipsQuery = useQuery<string[]>({
    queryKey: dashboardQuery.keys.agentIps,
    queryFn: () => dashboardService.agentRemoteIps(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // Local state to hold geo-located points ([lat, lon, intensity])
  const [heatPoints, setHeatPoints] = useState<[number, number, number][]>([]);
  // Track last updated time
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Once IPs load, geolocate each via ip-api.com
  useEffect(() => {
    if (ipsQuery.data == null) return;
    const resolveIPs = async () => {
      const resolved: [number, number, number][] = [];
      for (const ip of ipsQuery.data!) {
        try {
          const resp = await fetch(`http://ip-api.com/json/${ip}`);
          const js = await resp.json();
          if (js.status === "success" && typeof js.lat === "number" && typeof js.lon === "number") {
            resolved.push([js.lat, js.lon, 50]);
          }
        } catch {
          // ignore errors (e.g. rate‐limit)
        }
      }
      setHeatPoints(resolved);
    };
    resolveIPs();
  }, [ipsQuery.data]);

  // Update lastUpdated whenever any KPI query succeeds:
  useEffect(() => {
    if (
      agentsQuery.isSuccess &&
      usersQuery.isSuccess &&
      processesQuery.isSuccess &&
      rulesQuery.isSuccess
    ) {
      setLastUpdated(new Date().toLocaleTimeString());
    }
  }, [
    agentsQuery.data,
    usersQuery.data,
    processesQuery.data,
    rulesQuery.data,
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
    { name: "Allow", value: allow },
    { name: "Drop", value: drop }
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

      {/* Pie Charts section with vertical spacing */}
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
          <h3 className="text-lg font-medium text-center mt-5">
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
          <h3 className="text-lg font-medium text-center mt-5">
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
                {rulesPie.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {/* (6) Geomap Heatmap of agent locations, under all charts                */}
      {/* ──────────────────────────────────────────────────────────────────────────── */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mt-15">Agent Locations (Heatmap)</h3>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <LeafletHeat points={heatPoints} />
          </MapContainer>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {/* (7) “Last updated” timestamp and live‐feel footer                      */}
      {/* ──────────────────────────────────────────────────────────────────────────── */}
      <div className="mt-4 text-right text-xs italic text-gray-600">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};
