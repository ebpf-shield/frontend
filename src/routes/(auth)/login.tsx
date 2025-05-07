import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
});

function RouteComponent() {
  return <div>Hello "/(auth)/login"!</div>;
}
