import { getRouteApi } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormSchema } from "./register.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/Auth/useProvider";
import { authService } from "@/services/auth.service";

const routeApi = getRouteApi("/(auth)/register");

export const useRegisterForm = () => {
  const methods = useForm<RegisterFormSchema>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const navigate = routeApi.useNavigate();
  const auth = useAuthContext();

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterFormSchema) => {
      return await authService.register(data);
    },
    onSuccess: async (data) => {
      auth.handleLogin(data.access_token);
      await navigate({ to: "/agents" });
    },
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Registration failed:", error);
    }
  };

  return {
    methods,
    onSubmit,
  };
};
