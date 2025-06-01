import { OrganizationFormSchema } from "@/components/UserWithoutOrgHome/OrganizationForm/organization.model";
import { userWithOrgSchema } from "@/models/user.model";
import { authenticatedInstance, errorHelper } from "./index.service";

const PREFIX = "/user";

export const userService = {
  async createOrganizationAndJoin(data: OrganizationFormSchema) {
    try {
      const res = await authenticatedInstance.post(`${PREFIX}/organization`, data);
      return userWithOrgSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw errorHelper(error);
    }
  },
} as const;
