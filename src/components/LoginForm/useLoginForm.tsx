import { useForm } from "react-hook-form";
import { loginFallbackRoute, loginFormSchema, LoginFormSchema } from "./login.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/Auth/useProvider";

const routeApi = getRouteApi("/(auth)/login");

export const useLoginForm = () => {
  const methods = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const auth = useAuthContext();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFormSchema) => {
      return await authService.login(data);
    },
    onSuccess: async (data) => {
      auth.handleLogin(data.access_token);
      await navigate({ to: search.redirect || loginFallbackRoute });
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials.");
    },
  });

  const onSubmit = async (data: LoginFormSchema) => {
    try {
      await mutation.mutateAsync(data);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Login failed:", error);
    }
  };

  return { methods, onSubmit };
};
