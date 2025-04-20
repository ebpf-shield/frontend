import { AgentWithProcesses } from "@/models/agent.model";
import { Terminal } from "lucide-react";
import { ProcessesTable } from "../ProcessesTable";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface AgentProcessesPanelProps {
  agent: AgentWithProcesses;
}

export const AgentProcessesPanel = ({ agent }: AgentProcessesPanelProps) => {
  return (
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2 border-b border-gray-700 from-gray-800 to-gray-900 flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-white flex items-center">
          <Terminal className="h-5 w-5 mr-2 text-purple-400" />
          Processes
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-none">
            {agent.processes.length} Processes
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <ProcessesTable data={agent.processes} />
      </CardContent>
    </Card>
  );
};
