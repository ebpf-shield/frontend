import { dashboardQuery } from "@/queries/dashboard.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import L from "leaflet";
import "leaflet.heat/dist/leaflet-heat.js";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

type HeatPoint = [number, number, number]; // [lat, lon, intensity]

interface LeafletHeatProps {
  points: HeatPoint[]; // [lat, lon, intensity]
}
const LeafletHeat = ({ points }: LeafletHeatProps) => {
  const map = useMap();

  // We can probably do it better but never mind, this works.
  useEffect(() => {
    if (!map || points.length === 0) return;

    map.eachLayer((layer) => {
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

export const AgentsMapDashboard: React.FC = () => {
  const agentLocations = useSuspenseQuery(dashboardQuery.agentLocationsQueryOptions());
  const { data } = agentLocations;

  const heatPoints: HeatPoint[] = useMemo(() => {
    return data.map((q) => {
      return [q.latitude, q.longitude, 50];
    });
  }, [data]);

  // Loading / error states
  if (agentLocations.isLoading) {
    return <p>Loading agent locations…</p>;
  }
  if (agentLocations.isError) {
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
