import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboards/")({
  component: DashboardsIndexComponent,
});

function DashboardsIndexComponent() {
  return <Navigate to="/dashboards/agents" />;
}
