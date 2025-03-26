import { createFileRoute } from "@tanstack/react-router";
import { AgentsList } from "../components/AgentsList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen pt-8">
      <h2 className="text-2xl">Agents</h2>
      <AgentsList />
    </div>
  );
}
