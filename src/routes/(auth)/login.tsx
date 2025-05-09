import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
});

function RouteComponent() {
  return (
    <main className="container size-full">
      <section>
        <header className="text-right">
          <h2 className="text-xl font-semibold">כניסה</h2>
          <p className="text-gray-500">אנא הכנס את האימייל והסיסמא על מנת להתחבר לחשבון</p>
        </header>
      </section>
    </main>
  );
}
