import { organizationService } from "@/services/organization.service";
import { customValidation } from "@/utils/zod.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const inviteUserFormSchema = z.object({
  email: customValidation.email,
});

export type InviteUserFormSchema = z.infer<typeof inviteUserFormSchema>;

const routeApi = getRouteApi("/_auth/_organization");

export const useInviteUserForm = () => {
  const {
    auth: { user },
  } = routeApi.useRouteContext();

  const methods = useForm<InviteUserFormSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(inviteUserFormSchema),
  });

  const mutation = useMutation({
    mutationKey: ["inviteUser"],
    mutationFn: async (data: InviteUserFormSchema) => {
      return await organizationService.inviteUser({
        email: data.email,
        organizationId: user.organizationId,
      });
    },
    onSuccess(_data, variables) {
      toast.success(`Invitation sent to ${variables.email}`);
    },
    onError(error, variables) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(`User with email ${variables.email} part of organization.`);
        }

        if (error.response?.status === 404) {
          toast.error("User not found.");
        }
      }
    },
    onSettled() {
      methods.reset();
    },
  });

  const onSubmit = async (data: InviteUserFormSchema) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  };

  return {
    methods,
    onSubmit,
  };
};
