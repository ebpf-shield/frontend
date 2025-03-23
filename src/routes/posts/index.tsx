import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: Index,
});

function Index() {
  return <div>Hello "/posts/"!</div>;
}
