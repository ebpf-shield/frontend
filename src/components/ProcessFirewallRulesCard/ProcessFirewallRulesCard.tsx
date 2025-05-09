import { useFirewallRuleFormDialogContext } from "@/contexts/FirewallRuleFormDialog/useProvider";
import { ProcessWithRules } from "@/models/process.model";
import { Plus, Search, Shield } from "lucide-react";
import { RulesTable } from "../RulesTable";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export interface ProcessFirewallRulesCardProps {
  process: ProcessWithRules;
}

export const ProcessFirewallRulesCard = ({ process }: ProcessFirewallRulesCardProps) => {
  const { handleOpenCreateModel } = useFirewallRuleFormDialogContext();

  return (
    <Card className=" border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <CardHeader className="pb-2 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-white flex items-center">
            <Shield className="h-5 w-5 mr-2 text-purple-400" />
            Firewall Rules
          </CardTitle>
          <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-none">
            {process.rules.length} Rules
          </Badge>
        </div>
        <CardDescription className="text-gray-400">
          Network rules associated with this process
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search rules..."
              className="w-full bg-gray-800 border-gray-700 pl-8 text-white"
            />
          </div>
          <Button
            onClick={handleOpenCreateModel}
            className="gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            <Plus className="h-4 w-4" />
            <span>Add Rule</span>
          </Button>
        </div>

        <div className="py-4">
          <RulesTable data={process.rules} />
        </div>
      </CardContent>
    </Card>
  );
};
