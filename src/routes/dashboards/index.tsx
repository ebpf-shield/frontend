import { DashboardTabs } from "@/components/DashboardTabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboards/")({
  component: DashboardsIndexComponent,
});

function DashboardsIndexComponent() {
  return (
    <main className="container mx-auto py-8 px-4">
      <section className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Main dashboard page</h2>
        <DashboardTabs />
      </section>
    </main>
  );
}
