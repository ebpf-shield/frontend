import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { InviteUserModal } from "./InviteUserModal";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "recharts";
import { Input } from "../ui/input";

export const SettingsButton = () => {
  return (
    // <>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant="outline"
    //       size="sm"
    //       className="h-9 px-2 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
    //     >
    //       <Settings className="h-4 w-4" />
    //       <span className="hidden sm:inline">Settings</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
    //     <DropdownMenuLabel onClick={() => setOpen(true)}>Invite User</DropdownMenuLabel>
    //     <DropdownMenuSeparator className="bg-gray-700" />
    //   </DropdownMenuContent>
    // </DropdownMenu>

    //   <InviteUserModal open={open} onOpenChange={handleOpenChange} />
    // </>
    <Dialog>
      <DropdownMenu>
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
        <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
          <DropdownMenuItem>Invite User</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
