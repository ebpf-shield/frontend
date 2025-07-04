import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { agentQuery } from "@/queries/agent.query";
import { useQueryClient } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Home, LayoutGrid, RefreshCw, Search, Server } from "lucide-react";
import { SettingsDropdownMenu } from "../SettingsDropdownMenu";
import { NewAgentDialog } from "./NewAgentDialog";

const routeApi = getRouteApi("/_auth/_organization/agents/");

export function AgentHeader() {
  const { filter } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const queryClient = useQueryClient();

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      navigate({ to: "." });
      return;
    }

    navigate({ to: ".", search: { filter: value } });
  };

  const handleRefresh = () =>
    queryClient.refetchQueries({
      exact: true,
      queryKey: agentQuery.keys.getAllWithProcesses,
    });

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Agent Management</h1>
          </div>

          <div className="flex flex-1 items-center gap-2 sm:max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search agents..."
                className="w-full bg-gray-800 border-gray-700 pl-8 text-white"
                value={filter ?? ""}
                onChange={onSearchInputChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Link to="/dashboards/agents">
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>

            <Link to="/home-with-org">
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>

            <SettingsDropdownMenu />

            <NewAgentDialog />
          </div>
        </div>
      </div>
    </header>
  );
}
