import { useDialog, UseDialogReturn } from "@/hooks/useDialog";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { InviteUserForm } from "./InviteUserForm";

// If we move it to a separate file, it does not work at all.
// TODO - Open an issue
export const InviteUserDialog = ({ props }: UseDialogReturn) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite user</DialogTitle>
          <DialogDescription>
            This action will add a new user to your project. Please enter the user's email address
            below.
          </DialogDescription>
        </DialogHeader>
        <InviteUserForm />
      </DialogContent>
    </Dialog>
  );
};

export const SettingsDropdownMenu = () => {
  const inviteUserDialog = useDialog();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-2 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={inviteUserDialog.trigger}>Invite User</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <InviteUserDialog {...inviteUserDialog} />
    </>
  );
};
