import { RuleSchema } from "@/models/rule.model";
import { createContext, Dispatch, SetStateAction } from "react";

interface FirewallRuleFormDialogContextType {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  handleOpenCreateModel: () => void;
  handleOpenEditModal: () => void;
  defaultRule: RuleSchema | undefined;
  setDefaultRule: Dispatch<SetStateAction<RuleSchema | undefined>>;
}

export const FirewallRuleFormDialogContext = createContext<FirewallRuleFormDialogContextType>({
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  isEdit: false,
  setIsEdit: () => {},
  handleOpenCreateModel: () => {},
  handleOpenEditModal: () => {},
  defaultRule: undefined,
  setDefaultRule: () => {},
});
