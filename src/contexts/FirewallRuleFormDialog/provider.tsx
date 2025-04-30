import { RuleSchema } from "@/models/rule.model";
import { PropsWithChildren, useState } from "react";
import { FirewallRuleFormDialogContext } from "./context";

export const FirewallRuleFormDialogContextProvider = ({ children }: PropsWithChildren) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [defaultRule, setDefaultRule] = useState<RuleSchema | undefined>();

  const handleOpenCreateModel = () => {
    setIsDialogOpen(true);
    setIsEdit(false);
  };

  const handleOpenEditModal = () => {
    setIsDialogOpen(true);
    setIsEdit(true);
  };

  return (
    <FirewallRuleFormDialogContext.Provider
      value={{
        isDialogOpen: isDialogOpen,
        setIsDialogOpen: setIsDialogOpen,
        setIsEdit: setIsEdit,
        isEdit: isEdit,
        handleOpenCreateModel: handleOpenCreateModel,
        handleOpenEditModal: handleOpenEditModal,
        defaultRule: defaultRule,
        setDefaultRule: setDefaultRule,
      }}
    >
      {children}
    </FirewallRuleFormDialogContext.Provider>
  );
};
