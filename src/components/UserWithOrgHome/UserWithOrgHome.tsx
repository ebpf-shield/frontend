import { TokenUserWithOrgSchema } from "@/models/auth.model";
import { CommonProcessesDashboard } from "../dashboard/CommonProcessesDashboard";
import { RulesByChainDashboard } from "../dashboard/RulesByChainDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { UserWithOrgHomeHeader } from "./UserWithOrgHomeHeader";

export interface UserWithOrgHomeProps {
  user: TokenUserWithOrgSchema;
}

export const UserWithOrgHome = ({ user }: UserWithOrgHomeProps) => {
  return (
    <main className="flex flex-col size-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-auto">
      <UserWithOrgHomeHeader />
      <div className="flex flex-col items-center justify-center size-full bg-background">
        <Card className="max-w-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Welcome {user.name}!
            </CardTitle>
            <CardDescription className="text-center text-md pt-2">
              You are currently part of the organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="text-lg font-medium text-white mb-4 ">
              Those are your organization dashboards
            </h2>

            <ScrollArea className="h-[500px] w-full rounded-md border overflow-auto">
              <div className="p-4">
                <RulesByChainDashboard />
                <CommonProcessesDashboard />
              </div>

              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
