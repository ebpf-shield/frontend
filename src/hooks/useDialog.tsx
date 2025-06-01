// components/ui/use-dialog.tsx

import { useState } from "react";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const trigger = () => setIsOpen(true);
  const dismiss = () => setIsOpen(false);

  return {
    props: {
      open: isOpen,
      onOpenChange: setIsOpen,
    },
    trigger: trigger,
    dismiss: dismiss,
  };
}

export type UseDialogReturn = ReturnType<typeof useDialog>;
export type UseDialogProps = ReturnType<typeof useDialog>["props"];
