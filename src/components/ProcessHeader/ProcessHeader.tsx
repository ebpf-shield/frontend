import { Process } from "@/models/process.model";
import { processQuery } from "@/queries/process.query";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Ellipsis,
  ExternalLink,
  RefreshCw,
  Shield,
  Terminal,
  Trash2,
} from "lucide-react";
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
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";

export interface ProcessHeaderProps {
  process: Process;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const ProcessHeader = ({ process, setIsDialogOpen }: ProcessHeaderProps) => {
  const queryClient = useQueryClient();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/agents/$agentId"
              params={{ agentId: process.agentId }}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-purple-400" />
                <h1
                  className="text-xl font-bold text-white truncate max-w-[300px]"
                  title={process.command}
                >
                  {process.command.length > 30
                    ? `${process.command.substring(0, 30)}...`
                    : process.command}
                </h1>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <span>Count: {process.count}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() =>
                queryClient.refetchQueries({
                  exact: true,
                  queryKey: processQuery.keys.getByIdWithRules(process._id),
                })
              }
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              asChild
            >
              <div>
                <Terminal className="h-4 w-4" />
                <span className="hidden sm:inline">Logs</span>
              </div>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              asChild
            >
              <Button onClick={() => setIsDialogOpen(true)} type="button">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Add Rule</span>
              </Button>
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
                    This will permanently delete this process and all associated rules. This action
                    cannot be undone.
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
                <DropdownMenuLabel>Process Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span>View in Terminal</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>Restart Process</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-900/20 hover:text-red-300 cursor-pointer">
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span>Delete Process</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
