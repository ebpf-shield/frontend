import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_organization/dashboards/")({
  component: DashboardsIndexComponent,
});

function DashboardsIndexComponent() {
  return <Outlet />;
}
