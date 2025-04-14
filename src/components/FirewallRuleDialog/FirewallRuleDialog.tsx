import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { FirewallRuleForm } from "./FirewallRuleForm";

export interface RuleDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const FirewallRuleDialog = ({ isDialogOpen, setIsDialogOpen }: RuleDialogProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[550px] bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Add New Firewall Rule</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new rule for this process
          </DialogDescription>
        </DialogHeader>
        <FirewallRuleForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};
