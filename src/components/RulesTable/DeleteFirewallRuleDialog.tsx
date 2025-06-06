import { ruleService } from "@/services/rule.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectId } from "bson";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { processQuery } from "@/queries/process.query";
import { toast } from "sonner";

interface DeleteFirewallRuleDialogProps {
  ruleId: ObjectId;
  processId: ObjectId;
}

export const DeleteFirewallRuleDialog = ({ ruleId, processId }: DeleteFirewallRuleDialogProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["rule", ruleId.toHexString(), "delete"],
    mutationFn: (ruleId: ObjectId) => ruleService.delete(ruleId),
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: processQuery.keys.getByIdWithRules(processId),
      });
    },
    onSuccess() {
      toast.success("Rule deleted successfully");
    },
    onError() {
      toast.error("Error deleting rule", {
        description: "An error occurred while deleting the rule",
      });
    },
  });

  const handleDeleteRule = async (ruleId: ObjectId) => {
    try {
      await deleteMutation.mutateAsync(ruleId);
      // Optionally, you can add a success message or refresh the data here
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Rule</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Are you sure you want to delete this rule? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => handleDeleteRule(ruleId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
