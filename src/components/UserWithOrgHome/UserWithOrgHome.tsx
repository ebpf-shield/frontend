import { TokenUserWithOrgSchema } from "@/models/auth.model";
import { Link } from "@tanstack/react-router";

export interface UserWithOrgHomeProps {
  user: TokenUserWithOrgSchema;
}

export const UserWithOrgHome = ({ user }: UserWithOrgHomeProps) => {
  console.log("UserWithOrgHome", user);
  return (
    <div>
      <Link to="/agents">agents</Link>;
    </div>
  );
};
