import { TokenUserWithOrgSchema } from "@/models/auth.model";

export interface UserWithOrgHomeProps {
  user: TokenUserWithOrgSchema;
}

export const UserWithOrgHome = ({ user }: UserWithOrgHomeProps) => {
  console.log("UserWithOrgHome", user);
  return <div></div>;
};
