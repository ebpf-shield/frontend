import { DashboardTabs } from "@/components/DashboardTabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_organization/dashboards/agents/")({
  component: DashboardAgentsIndexComponent,
});

function DashboardAgentsIndexComponent() {
  return (
    <main className="container h-full mx-auto py-8 px-4">
      <section className="h-full flex flex-col justify-center items-center gap-4">
        <DashboardTabs />
      </section>
    </main>
  );
}
