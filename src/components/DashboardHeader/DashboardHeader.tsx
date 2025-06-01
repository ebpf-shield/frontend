import { Link } from "@tanstack/react-router";
import { Bot, Home, LayoutGrid, RefreshCw, Settings } from "lucide-react";
import { Button } from "../ui/button";

export const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Dashboards</h1>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              // TODO: Implement refresh functionality
              // onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Link to="/agents">
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
              >
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Agents</span>
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

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </section>
      </div>
    </header>
  );
};
