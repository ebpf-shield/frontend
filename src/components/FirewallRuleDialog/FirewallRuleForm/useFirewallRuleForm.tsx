import { ruleService } from "@/services/rule.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectId } from "bson";
import { SubmitHandler, useForm } from "react-hook-form";
import { processQuery } from "../../../queries/process.query";
import { RuleSchemaWithoutId, ruleSchemaWithoutId } from "@/models/rule.model";

interface UseCreateRuleProps {
  processId: ObjectId;
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFirewallRuleForm = ({ processId, setIsAddDialogOpen }: UseCreateRuleProps) => {
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues: {
      action: "ACCEPT",
      chain: "INPUT",
      daddr: "",
      dport: 0,
      protocol: "TCP",
      saddr: "",
      sport: 0,
      comment: "",
      processId: processId,
      priority: 0,
    },
    resolver: zodResolver(ruleSchemaWithoutId),
  });

  const mutation = useMutation({
    mutationFn: async (data: RuleSchemaWithoutId) => {
      const res = await ruleService.create(data);
      return res;
    },

    onSuccess: () => {
      // Invalidate and refetch
      methods.reset();
      queryClient.invalidateQueries({
        exact: true,
        queryKey: processQuery.keys.getByIdWithRules(processId),
      });
      setIsAddDialogOpen(false);
    },
  });

  const onSubmit: SubmitHandler<RuleSchemaWithoutId> = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  return {
    methods,
    onSubmit,
  };
};
