import { createContext, Dispatch, SetStateAction } from "react";

interface FirewallRuleFormDialogContextType {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const FirewallRuleFormDialogContext = createContext<FirewallRuleFormDialogContextType>({
  isDialogOpen: false,
  setIsDialogOpen: () => {},
});
