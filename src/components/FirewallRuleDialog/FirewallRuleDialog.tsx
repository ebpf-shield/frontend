import { useFirewallRuleFormDialogContext } from "@/contexts/FirewallRuleFormDialog/useProvider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { FirewallRuleFormTabs } from "./FirewallRuleFormTabs";

export const FirewallRuleDialog = () => {
  const { setIsDialogOpen, isDialogOpen } = useFirewallRuleFormDialogContext();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[550px] bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Add New Firewall Rule</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new rule for this process
          </DialogDescription>
        </DialogHeader>
        <FirewallRuleFormTabs />
      </DialogContent>
    </Dialog>
  );
};
