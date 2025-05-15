import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
  component: HomeComponent,
});

function HomeComponent() {
  return <div>Hello "/_auth/home"!</div>;
}
