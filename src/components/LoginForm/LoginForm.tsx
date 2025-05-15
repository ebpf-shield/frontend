import { cn } from "@/lib/utils";
import { FormProvider } from "react-hook-form";
import { FormInput, FormInputPassword } from "../form/FormInput";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { useLoginForm } from "./useLoginForm";
import { Link } from "@tanstack/react-router";

export const LoginForm = () => {
  const { methods, onSubmit } = useLoginForm();

  // The docs suggest adding the props for div element.
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormInput
                    name={"email"}
                    inputProps={{
                      type: "email",
                      placeholder: "m@example.com",
                    }}
                    labelProps={{
                      children: "Email",
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormInputPassword
                    name="password"
                    inputProps={{
                      placeholder: "My Very Secret Password",
                    }}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};
