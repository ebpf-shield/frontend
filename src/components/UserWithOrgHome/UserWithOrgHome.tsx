import { TokenUserWithOrgSchema } from "@/models/auth.model";
import { TopKpiDashboard } from "../dashboard/TopKpiDashboard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { UserWithOrgHomeHeader } from "./UserWithOrgHomeHeader";

export interface UserWithOrgHomeProps {
  user: TokenUserWithOrgSchema;
}

export const UserWithOrgHome = ({ user }: UserWithOrgHomeProps) => {
  return (
    <main className="flex flex-col size-full overflow-auto">
      <UserWithOrgHomeHeader />
      <ScrollArea className=" w-full overflow-auto">
        <div className="container mx-auto">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-center">Welcome {user.name}!</h1>
            <p className="text-center text-md pt-2 text-gray-600 dark:text-gray-300">
              You are currently part of the organization.
            </p>
          </div>

          <Separator className="my-4" />

          <div className="max-w-6xl mx-auto">
            <TopKpiDashboard />
          </div>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </main>
  );
};
