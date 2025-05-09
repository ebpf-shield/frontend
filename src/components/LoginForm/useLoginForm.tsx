import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "./auth.model";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginForm = () => {
  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmit = async () => {};

  return { form, handleSubmit };
};
