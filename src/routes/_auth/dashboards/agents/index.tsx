import { DashboardTabs } from "@/components/DashboardTabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboards/agents/")({
  component: DashboardAgentsIndexComponent,
});

function DashboardAgentsIndexComponent() {
  return (
    <main className="container h-full mx-auto py-8 px-4">
      <section className="h-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Agent Analytics Dashboard</h2>
        <DashboardTabs />
      </section>
    </main>
  );
}
