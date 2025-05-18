import { Button } from "@/components/ui/button";
import { FormInput } from "../../form/FormInput";
import { Form } from "../../ui/form";
import { useOrganizationForm } from "./useOrganizationForm";

interface OrganizationFormProps {
  cancelCreateOrganization: () => void;
}

export const OrganizationForm = ({ cancelCreateOrganization }: OrganizationFormProps) => {
  const { methods, onSubmit } = useOrganizationForm();

  return (
    <Form {...methods}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          name={"name"}
          inputProps={{ placeholder: "The Hemi Boy's" }}
          labelProps={{
            children: "Organization name",
          }}
        />
        <FormInput
          name={"description"}
          labelProps={{
            children: "A description of your organization",
          }}
          inputProps={{
            placeholder: "We are a group of people who love Hemi",
          }}
        />
        <section className="flex items-center justify-around gap-3">
          <Button type="submit" className="flex-1" variant={"outline"}>
            Create Organization
          </Button>
          <Button onClick={cancelCreateOrganization} className="flex-1" variant={"outline"}>
            Cancel
          </Button>
        </section>
      </form>
    </Form>
  );
};
