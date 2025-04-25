import { useContext } from "react";
import { FirewallRuleFormDialogContext } from "./context";

export const useFirewallRuleFormDialogContext = () => {
  const context = useContext(FirewallRuleFormDialogContext);

  if (!context) {
    throw new Error(
      "useFirewallRuleFormDialogContext must be used within a FirewallRuleFormDialogProvider"
    );
  }

  return context;
};
