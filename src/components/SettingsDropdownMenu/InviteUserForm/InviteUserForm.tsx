import { Form } from "@/components/ui/form";
import { useInviteUserForm } from "./useInviteUserForm";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

export const InviteUserForm = () => {
  const { methods, onSubmit } = useInviteUserForm();

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            inputProps={{ placeholder: "Enter email to invite" }}
            labelProps={{ children: "Email" }}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button onClick={methods.handleSubmit(onSubmit)}>Confirm</Button>
      </DialogFooter>
    </>
  );
};
