import { LoginForm } from "@/components/LoginForm";
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
    <main className="flex flex-col items-center justify-center w-full h-full">
      <section className="flex flex-col gap-12 min-w-[400px] max-w-[600px] border rounded-md p-6 ">
        <header className="text-right">
          <h2 className="text-xl font-semibold">כניסה</h2>
          <p className="text-gray-500">אנא הכנס את האימייל והסיסמא על מנת להתחבר לחשבון</p>
        </header>

        <LoginForm />
      </section>
    </main>
  );
}
