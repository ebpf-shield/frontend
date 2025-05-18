import { TokenUserWithOrgSchema } from "@/models/auth.model";
import { CommonProcessesDashboard } from "../dashboard/CommonProcessesDashboard";
import { ProcessesWithMostRulesDashboard } from "../dashboard/ProcessWithMostRulesDashboard";
import { RulesByChainDashboard } from "../dashboard/RulesByChainDashboard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { UserWithOrgHomeHeader } from "./UserWithOrgHomeHeader";
import { Separator } from "../ui/separator";

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

          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-lg font-medium text-white mb-4">
              Those are your organization dashboards
            </h2>

            <div className="p-4 flex flex-col gap-4">
              <RulesByChainDashboard />
              <CommonProcessesDashboard />
              <ProcessesWithMostRulesDashboard />
            </div>

            <ScrollBar orientation="vertical" />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
