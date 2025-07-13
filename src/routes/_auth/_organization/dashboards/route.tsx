import { DashboardHeader } from "@/components/DashboardHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_organization/dashboards")({
  component: DashboardComponent,
  loader: () => ({
    crumb: "Dashboard",
  }),
});

function DashboardComponent() {
  return (
    <ScrollArea className="flex flex-col items-center justify-start size-full">
      <div className="flex flex-col items-center justify-start size-full">
        <DashboardHeader />
        <Outlet />
      </div>
    </ScrollArea>
  );
}
