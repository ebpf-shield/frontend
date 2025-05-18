import { authQuery } from "@/queries/auth.query";
import { createFileRoute, Navigate, Outlet, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  async beforeLoad(ctx) {
    if (!ctx.context.auth.isAuthenticated || !ctx.context.auth.user || !ctx.context.auth.token) {
      // https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes#redirecting
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }

    const { access_token } = await ctx.context.queryClient.ensureQueryData(
      authQuery.getTokenQueryOptions()
    );

    const user = ctx.context.auth.handleLogin(access_token);

    // We have to be explicit.
    return {
      ...ctx.context,
      auth: {
        ...ctx.context.auth,
        user: user,
        token: access_token,
        isAuthenticated: ctx.context.auth.isAuthenticated,
      },
    };
  },

  errorComponent: ({ error }) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return <Navigate to="/home" />;
      }
    }

    <Navigate to="/login" />;
  },
});

function AuthLayout() {
  // Don't render <Outlet /> - Why did I say this?
  // return <Navigate to="/agents" />;
  return <Outlet />; // Render <Outlet /> to show the child routes
}
