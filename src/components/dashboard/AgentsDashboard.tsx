// frontend/src/components/dashboard/AgentsDashboard.tsx

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat.js";
import L from "leaflet";
import { dashboardQuery } from "../../queries/dashboard.query";

// Local helper: renders the heat layer whenever `points` changes
const LeafletHeat: React.FC<{ points: [number, number, number][] }> = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || points.length === 0) return;
    map.eachLayer((layer: any) => {
      if (layer instanceof (L as any).HeatLayer) {
        map.removeLayer(layer);
      }
    });
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

export const AgentsDashboard: React.FC = () => {
  // Fetch list of agent IPs
  const ipsQuery = useQuery<string[]>({
    queryKey: dashboardQuery.keys.agentIps,
    queryFn: () => dashboardService.agentRemoteIps(),
    staleTime: 30_000,
    refetchInterval: 5_000,
  });

  // Build an array of [lat, lon, intensity]
  const [heatPoints, setHeatPoints] = useState<[number, number, number][]>([]);

  useEffect(() => {
    if (!ipsQuery.data) return;
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
          // ignore errors/rate-limit
        }
      }
      setHeatPoints(resolved);
    };
    resolveIPs();
  }, [ipsQuery.data]);

  // Loading / error states
  if (ipsQuery.isLoading) {
    return <p>Loading agent locations…</p>;
  }
  if (ipsQuery.isError) {
    return <p>Error fetching agent IPs.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Agents: Live Heatmap</h2>
      <div className="w-full h-[500px] rounded-lg overflow-hidden">
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
  );
};
