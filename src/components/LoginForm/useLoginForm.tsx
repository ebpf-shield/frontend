import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "./auth.model";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginForm = () => {
  const methods = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async () => {};

  return { methods, onSubmit };
};
