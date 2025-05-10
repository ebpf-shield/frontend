import { FormProvider } from "react-hook-form";
import { useLoginForm } from "./useLoginForm";
import { Link } from "@tanstack/react-router";
import { FormInput } from "../form/FormInput";
import { Button } from "../ui/button";

export const LoginForm = () => {
  const { methods, onSubmit } = useLoginForm();
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          name="email"
          labelProps={{
            children: "E-mail",
          }}
          inputProps={{
            placeholder: "m@example.com",
          }}
        />
        <FormInput
          name="password"
          inputProps={{
            type: "password",
            placeholder: "My very secretive password",
          }}
          labelProps={{
            children: "Password",
          }}
        />
        <Button type="submit" className="w-full py-2 rounded-md">
          שליחה
        </Button>
        <p className="text-center">
          אין חשבון עדיין?{" "}
          <Link to="/register" className="underline cursor-pointer">
            הרשמה
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};
