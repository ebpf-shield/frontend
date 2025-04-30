import { useFirewallRuleFormDialogContext } from "@/contexts/FirewallRuleFormDialog/useProvider";
import { ruleService } from "@/services/rule.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectId } from "bson";
import { useForm } from "react-hook-form";
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
}

export const useFirewallRuleForm = ({ processId }: UseFirewallRuleProps) => {
  const queryClient = useQueryClient();
  const { isEdit, defaultRule: rule, setIsDialogOpen } = useFirewallRuleFormDialogContext();

  let inputRule: InputRuleFormSchemaWithoutId | null = null;
  let outputRule: OutputRuleFormSchemaWithoutId | null = null;

  if (isEdit) {
    if (!rule) {
      throw new Error("If editing 'rule' must be defined");
    }
    if (rule.chain === "INPUT") {
      inputRule = rule;
    }
    if (rule.chain === "OUTPUT") {
      outputRule = rule;
    }
  }

  const outputRuleFormDefaultValues: OutputRuleFormSchemaWithoutId = {
    action: "ACCEPT",
    chain: "OUTPUT",
    daddr: "",
    dport: 0,
    protocol: "TCP",
    comment: "",
    processId: processId,
    priority: 0,
  } as const;

  const outputRuleFormMethods = useForm<OutputRuleFormSchemaWithoutId>({
    defaultValues: isEdit && outputRule ? outputRule : outputRuleFormDefaultValues,
    resolver: zodResolver(outputRuleFormSchemaWithoutId),
  });

  const inputRuleFormDefaultValues: InputRuleFormSchemaWithoutId = {
    action: "ACCEPT",
    chain: "INPUT",
    saddr: "",
    sport: 0,
    protocol: "TCP",
    comment: "",
    processId: processId,
    priority: 0,
  } as const;

  const inputRuleFormMethods = useForm<InputRuleFormSchemaWithoutId>({
    defaultValues: isEdit && inputRule ? inputRule : inputRuleFormDefaultValues,
    resolver: zodResolver(inputRuleFormSchemaWithoutId),
  });

  const createMutation = useMutation({
    mutationFn: async (data: RuleFormSchemaWithoutId) => {
      const res = await ruleService.create(data);
      return res;
    },

    onSuccess: async () => {
      // Invalidate and refetch
      outputRuleFormMethods.reset();
      inputRuleFormMethods.reset();
      queryClient.invalidateQueries({
        exact: true,
        queryKey: processQuery.keys.getByIdWithRules(processId),
      });
      setIsDialogOpen(false);
    },
  });

  const editMutation = useMutation({
    mutationFn: async (data: { rule: RuleFormSchemaWithoutId; ruleId: ObjectId }) => {
      const res = await ruleService.update(data.ruleId, data.rule);
      return res;
    },
    async onSuccess() {
      setIsDialogOpen(false);
      await queryClient.invalidateQueries({
        exact: true,
        queryKey: processQuery.keys.getByIdWithRules(processId),
      });
    },
  });

  const onSubmit = async (data: RuleFormSchemaWithoutId) => {
    try {
      if (isEdit) {
        if (!rule) {
          throw new Error("If editing 'rule' must be defined");
        } else if (!rule._id) {
          throw new Error("If editing 'rule' must have '_id'");
        }

        await editMutation.mutateAsync({
          rule: data,
          ruleId: rule._id,
        });

        return;
      }
      await createMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  return {
    outputRuleFormMethods,
    inputRuleFormMethods,
    outputOnSubmit: onSubmit,
    inputOnSubmit: onSubmit,
  };
};
