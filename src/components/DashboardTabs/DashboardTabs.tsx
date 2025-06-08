// frontend/src/components/DashboardTabs/DashboardTabs.tsx

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TopKpisDashboard } from "../dashboard/TopKpisDashboard";
import { ProcessesWithMostRulesDashboard } from "../dashboard/ProcessWithMostRulesDashboard";
import { CommonProcessesDashboard } from "../dashboard/CommonProcessesDashboard";
import { RulesByChainDashboard } from "../dashboard/RulesByChainDashboard";
import { AgentsDashboard } from "../dashboard/AgentsDashboard";

export const TABS = {
  KPIS: "kpis",
  PROCESSES_WITH_MOST_RULES: "processes-with-most-rules",
  COMMON_PROCESSES: "common-processes",
  RULES_BY_CHAIN: "rules-by-chain",
  AGENTS: "agents",
} as const;

export const DashboardTabs: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <Tabs defaultValue={TABS.KPIS} className="max-w-5xl mt-4 mx-auto w-full">
        {/* ──────────────────────────────────────────────────────────────────────────── */}
        {/* Center the TabsList using justify-center                                */}
        {/* ──────────────────────────────────────────────────────────────────────────── */}
        <TabsList className="justify-center">
          <TabsTrigger value={TABS.KPIS}>High-Level KPIs</TabsTrigger>
          <TabsTrigger value={TABS.AGENTS}>Agents</TabsTrigger>
          <TabsTrigger value={TABS.PROCESSES_WITH_MOST_RULES}>
            Processes with Most Rules
          </TabsTrigger>
          <TabsTrigger value={TABS.COMMON_PROCESSES}>Common Processes</TabsTrigger>
          <TabsTrigger value={TABS.RULES_BY_CHAIN}>Rules by Chain</TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.KPIS} className="w-full">
          <TopKpisDashboard />
        </TabsContent>

        <TabsContent value={TABS.PROCESSES_WITH_MOST_RULES} className="w-full">
          <ProcessesWithMostRulesDashboard />
        </TabsContent>

        <TabsContent value={TABS.COMMON_PROCESSES} className="w-full">
          <CommonProcessesDashboard />
        </TabsContent>

        <TabsContent value={TABS.RULES_BY_CHAIN} className="w-full">
          <RulesByChainDashboard />
        </TabsContent>

        <TabsContent value={TABS.AGENTS} className="w-full">
          <AgentsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
