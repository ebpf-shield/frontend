import { DashboardHeader } from "@/components/DashboardHeader";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboards")({
  component: DashboardComponent,
  loader: () => ({
    crumb: "Dashboard",
  }),
});

function DashboardComponent() {
  return (
    <div className="flex flex-col items-center justify-start size-full">
      <DashboardHeader />

      <Outlet />
    </div>
  );
}
