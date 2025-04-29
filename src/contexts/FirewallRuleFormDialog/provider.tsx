import { PropsWithChildren, useState } from "react";
import { FirewallRuleFormDialogContext } from "./context";

export const FirewallRuleFormDialogContextProvider = ({ children }: PropsWithChildren) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <FirewallRuleFormDialogContext.Provider value={{ isDialogOpen, setIsDialogOpen }}>
      {children}
    </FirewallRuleFormDialogContext.Provider>
  );
};
