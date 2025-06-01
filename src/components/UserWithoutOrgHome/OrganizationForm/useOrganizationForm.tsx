import { authQuery } from "@/queries/auth.query";
import { userService } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { organizationFormSchema, OrganizationFormSchema } from "./organization.model";

export const useOrganizationForm = () => {
  const router = useRouter();

  const methods = useForm<OrganizationFormSchema>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(organizationFormSchema),
  });

  const queryClient = useQueryClient();

  const createOrgMutation = useMutation({
    mutationKey: ["createOrganization"],
    mutationFn: async (data: OrganizationFormSchema) => {
      return await userService.createOrganizationAndJoin(data);
    },
    onSuccess: async () => {
      console.log("Organization created successfully");
      await queryClient.refetchQueries({
        exact: true,
        queryKey: authQuery.keys.getToken(),
      });

      await router.invalidate({
        sync: true,
      });
      toast.success("Organization created successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("You are already in an organization");
          return;
        }
      }
      toast.error("Please check your data");
    },
  });

  const onSubmit = async (data: OrganizationFormSchema) => {
    try {
      await createOrgMutation.mutateAsync(data);
      methods.reset();
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  return {
    methods,
    onSubmit,
  };
};
