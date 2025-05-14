import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { FormCheckbox } from "../form/FormCheckbox";
import { FormInput, FormInputPassword } from "../form/FormInput";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";
import { useRegisterForm } from "./useRegisterForm";

export const RegisterForm = () => {
  const { methods, onSubmit } = useRegisterForm();

  const passwordField = methods.watch("password");

  useEffect(() => {
    async function validatePassword() {
      if (methods.formState.touchedFields.password && methods.formState.submitCount > 0) {
        await methods.trigger("confirmPassword");
      }
    }

    if (passwordField) {
      validatePassword();
    }
  }, [methods, passwordField]);

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Enter your email below to register for an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <section className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormInput
                    name={"name"}
                    inputProps={{
                      type: "text",
                      placeholder: "John Doe",
                    }}
                    labelProps={{
                      children: "Name",
                    }}
                  />
                </div>
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
                  <FormInputPassword
                    name={"password"}
                    inputProps={{
                      placeholder: "My Very Secret Password",
                    }}
                    labelProps={{
                      children: "Password",
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <FormInputPassword
                    name={"confirmPassword"}
                    inputProps={{
                      placeholder: "Confirm My Very Secret Password",
                    }}
                    labelProps={{
                      children: "Confirm Password",
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <FormCheckbox
                    name={"createOrganization"}
                    labelProps={{
                      children: "Create an organization",
                    }}
                    description="Check this box if you want to create an organization"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?
                  <Link to="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </section>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
