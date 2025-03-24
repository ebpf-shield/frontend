import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/agents")({
  component: AgentLayout,
});

function AgentLayout() {
  return (
    <div>
      שדג
      <Outlet />
    </div>
  );
}
