import { useFirewallRuleFormDialogContext } from "@/contexts/FirewallRuleFormDialog/useProvider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { FirewallRuleFormTabs } from "./FirewallRuleFormTabs";
import { FirewallRuleEditForm } from "./FirewallRuleEditForm";

export const FirewallRuleDialog = () => {
  const { setIsDialogOpen, isDialogOpen, isEdit } = useFirewallRuleFormDialogContext();

  const createRuleHeader = () => {
    return (
      <>
        <DialogTitle>Add New Firewall Rule</DialogTitle>
        <DialogDescription className="text-gray-400">
          Create a new rule for this process
        </DialogDescription>
      </>
    );
  };

  const editRuleHeader = () => {
    return (
      <>
        <DialogTitle>Edit Firewall Rule</DialogTitle>
        <DialogDescription className="text-gray-400">
          Edit the selected rule for this process
        </DialogDescription>
      </>
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[550px] bg-gray-900 border-gray-700 text-white">
        <DialogHeader>{isEdit ? editRuleHeader() : createRuleHeader()}</DialogHeader>
        {isEdit ? <FirewallRuleEditForm /> : <FirewallRuleFormTabs />}
      </DialogContent>
    </Dialog>
  );
};
