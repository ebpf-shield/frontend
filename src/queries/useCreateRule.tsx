import { Rule } from "@/models/rule.model";
import { ruleService } from "@/services/rule.service";
import { useMutation } from "@tanstack/react-query";
import { ObjectId } from "bson";
import { SubmitHandler, useForm } from "react-hook-form";

interface UseCreateRuleProps {
  processId: ObjectId;
}

export const useCreateRule = ({ processId }: UseCreateRuleProps) => {
  const methods = useForm<Rule>({
    defaultValues: {
      _id: new ObjectId(),
      chain: "INPUT",
      action: "ACCEPT",
      priority: 0,
      saddr: "",
      sport: 0,
      daddr: "",
      dport: 0,
      protocol: "tcp",
      processId,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Rule) => {
      // Assuming ruleService.create is a function that creates a rule
      const res = await ruleService.create(data);
      return res;
    },

    onSuccess: () => {
      // Invalidate and refetch
      methods.reset();
    },
  });

  const onSubmit: SubmitHandler<Rule> = async (data) => {
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
