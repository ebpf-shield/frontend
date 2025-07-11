import { RegisterForm } from "@/components/RegisterForm";
import { registerFallbackRoute } from "@/components/RegisterForm/register.model";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: registerFallbackRoute });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
