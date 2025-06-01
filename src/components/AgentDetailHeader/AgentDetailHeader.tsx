import { cn } from "@/lib/utils";
import { AgentWithProcesses } from "@/models/agent.model";
import { agentQuery } from "@/queries/agent.query";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Download,
  Ellipsis,
  Power,
  RefreshCw,
  Server,
  Terminal,
  Trash2,
  Upload,
} from "lucide-react";
import { SettingsDropdownMenu } from "../SettingsDropdownMenu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface AgentDetailHeaderProps {
  agent: AgentWithProcesses;
}

export const AgentDetailHeader = ({ agent }: AgentDetailHeaderProps) => {
  const queryClient = useQueryClient();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link to="/agents" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-purple-400" />
                <h1 className="text-xl font-bold text-white">{agent.name}</h1>
                <Badge
                  className={cn(
                    `ml-2 text-white border-none ${
                      agent.online
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-red-500 to-rose-500"
                    }`
                  )}
                >
                  {agent.online ? "Online" : "Offline"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
              onClick={() =>
                queryClient.refetchQueries({
                  exact: true,
                  queryKey: agentQuery.keys.getByIdWithProcesses(agent._id.toString()),
                })
              }
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
              asChild
            >
              <div>
                <Terminal className="h-4 w-4" />
                <span className="hidden sm:inline">Terminal</span>
              </div>
            </Button>

            <SettingsDropdownMenu />

            <Button
              size="sm"
              className={`h-9 gap-1 ${
                agent.online
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              } text-white`}
            >
              <Power className="h-4 w-4" />
              <span>{agent.online ? "Shutdown" : "Start"}</span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1 border-red-800 bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This will permanently delete this agent and all associated processes. This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-2 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <span className="sr-only">More options</span>
                  <Ellipsis size={16} strokeWidth={3} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                <DropdownMenuLabel>Agent Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Download Logs</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  <span>Upload Config</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>Restart Agent</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-900/20 hover:text-red-300 cursor-pointer">
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span>Delete Agent</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
