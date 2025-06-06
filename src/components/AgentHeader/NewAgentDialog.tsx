import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CodeBlockWithCopy } from "../CodeBlockWithCopy";
import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/_auth/_organization/agents/");

export const NewAgentDialog = () => {
  const {
    auth: {
      user: { organizationId },
    },
  } = routeApi.useRouteContext();
  const code = `sudo AGENT_ORG_ID=${organizationId.toString()} ./firewall`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-9 gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Agent</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Register new agent</DialogTitle>
          <DialogDescription>Register a new new to the organization.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <CodeBlockWithCopy code={code} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
