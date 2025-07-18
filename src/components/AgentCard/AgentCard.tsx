import { DATE_LOCALS } from "@/constants/date.constants";
import { cn } from "@/lib/utils";
import { AgentWithProcesses } from "@/models/agent.model";
import { Link } from "@tanstack/react-router";
import { Activity, Clock, Server, SquareArrowOutUpRight } from "lucide-react";
import { ProcessesTable } from "../ProcessesTable";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export interface AgentCardProps {
  agent: AgentWithProcesses;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      <CardHeader className="pb-2 border-b border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-white">
              <div className="flex gap-2 justify-start items-center">
                <p>{agent.name}</p>
                <Link to="/agents/$agentId" params={{ agentId: agent._id }}>
                  <SquareArrowOutUpRight size={20} />
                </Link>
              </div>
            </CardTitle>
            <CardDescription className="flex items-center mt-1 text-gray-400">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {agent.createdAt.toLocaleDateString(DATE_LOCALS)}
            </CardDescription>
          </div>
          <Badge
            variant={agent.online ? "default" : "destructive"}
            className={cn({
              "bg-gradient-to-r from-green-500 to-emerald-500": agent.online,
              "bg-gradient-to-r from-red-500 to-rose-500": !agent.online,
            })}
          >
            {agent.online ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 h-full">
        <ProcessesTable data={agent.processes} />
      </CardContent>
      <CardFooter className="border-t border-gray-700 flex justify-between">
        <div className="flex items-center text-sm text-gray-400">
          <Server className="h-4 w-4 mr-1" />
          <span>Agent ID: {agent._id.toString().substring(0, 5)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <Activity className="h-4 w-4 mr-1" />
          <span>{agent.processes.length} processes</span>
        </div>
      </CardFooter>
    </Card>
  );
};
