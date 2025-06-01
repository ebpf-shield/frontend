import { useFirewallRuleFormDialogContext } from "@/contexts/FirewallRuleFormDialog/useProvider";
import { OutputFirewallRuleForm } from "../FirewallRuleFormTabs/OutputFirewallRuleForm";
import { InputFirewallRuleForm } from "../FirewallRuleFormTabs/InputFirewallRuleForm";

export const FirewallRuleEditForm = () => {
  const { defaultRule: rule } = useFirewallRuleFormDialogContext();

  if (!rule) {
    throw new Error("Rule must be defined when editing rule");
  }

  if (rule.chain === "OUTPUT") {
    return <OutputFirewallRuleForm />;
  }

  if (rule.chain === "INPUT") {
    return <InputFirewallRuleForm />;
  }
};
