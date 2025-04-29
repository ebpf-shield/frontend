import { ruleService } from "@/services/rule.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectId } from "bson";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { processQuery } from "../../../queries/process.query";
import {
  InputRuleFormSchemaWithoutId,
  inputRuleFormSchemaWithoutId,
  OutputRuleFormSchemaWithoutId,
  outputRuleFormSchemaWithoutId,
  RuleFormSchemaWithoutId,
} from "./firewallRule.model";

interface UseFirewallRuleProps {
  processId: ObjectId;
  setIsAddDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const useFirewallRuleForm = ({ processId, setIsAddDialogOpen }: UseFirewallRuleProps) => {
  const queryClient = useQueryClient();

  const outputRuleFormMethods = useForm({
    defaultValues: {
      action: "ACCEPT",
      chain: "OUTPUT",
      daddr: "",
      dport: 0,
      protocol: "TCP",
      comment: "",
      processId: processId,
      priority: 0,
    },
    resolver: zodResolver(outputRuleFormSchemaWithoutId),
  });

  const inputRuleFormMethods = useForm({
    defaultValues: {
      action: "ACCEPT",
      chain: "INPUT",
      saddr: "",
      sport: 0,
      protocol: "TCP",
      comment: "",
      processId: processId,
      priority: 0,
    },
    resolver: zodResolver(inputRuleFormSchemaWithoutId),
  });

  const mutation = useMutation({
    mutationFn: async (data: RuleFormSchemaWithoutId) => {
      const res = await ruleService.create(data);
      return res;
    },

    onSuccess: () => {
      // Invalidate and refetch
      outputRuleFormMethods.reset();
      inputRuleFormMethods.reset();
      queryClient.invalidateQueries({
        exact: true,
        queryKey: processQuery.keys.getByIdWithRules(processId),
      });
      setIsAddDialogOpen(false);
    },
  });

  // Maybe combine these two functions into one - with the same type
  const outputOnSubmit: SubmitHandler<OutputRuleFormSchemaWithoutId> = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const inputOnSubmit: SubmitHandler<InputRuleFormSchemaWithoutId> = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  return {
    outputRuleFormMethods,
    inputRuleFormMethods,
    outputOnSubmit,
    inputOnSubmit,
  };
};
