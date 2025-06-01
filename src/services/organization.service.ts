import { OrganizationFormSchema } from "@/components/UserWithoutOrgHome/OrganizationForm/organization.model";
import { authenticatedInstance, errorHelper } from "./index.service";
import { organizationSchema } from "@/models/organization.model";
import { InviteUserFormSchema } from "@/components/SettingsDropdownMenu/InviteUserForm/useInviteUserForm";
import { ObjectId } from "bson";

const PREFIX = "organization" as const;

export const organizationService = {
  async create(data: OrganizationFormSchema) {
    try {
      const res = await authenticatedInstance.post(`${PREFIX}`, data);
      return organizationSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw errorHelper(error);
    }
  },

  async inviteUser(data: InviteUserFormSchema & { organizationId: ObjectId }) {
    try {
      const res = await authenticatedInstance.post(
        `${PREFIX}/${data.organizationId.toString()}/invitation`,
        {
          email: data.email,
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw errorHelper(error);
    }
  },
} as const;
