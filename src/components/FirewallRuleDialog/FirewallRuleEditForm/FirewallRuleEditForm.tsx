import { useFirewallRuleFormDialogContext } from "@/contexts/FirewallRuleFormDialog/useProvider";
import { OutputFirewallRuleForm } from "../OutputFirewallRuleForm";
import { InputFirewallRuleForm } from "../InputFirewallRuleForm";

export const FirewallRuleEditForm = () => {
  const { defaultRule: rule } = useFirewallRuleFormDialogContext();

  if (!rule) {
    throw new Error("Rule must be defined when ediing rule");
  }

  if (rule.chain === "OUTPUT") {
    return <OutputFirewallRuleForm />;
  }

  if (rule.chain === "INPUT") {
    return <InputFirewallRuleForm />;
  }
};
