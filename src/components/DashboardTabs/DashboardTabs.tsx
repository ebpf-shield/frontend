import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentsMapDashboard } from "../dashboard/AgentsMapDashboard";
import { CommonProcessesDashboard } from "../dashboard/CommonProcessesDashboard";
import { ProcessesWithMostRulesDashboard } from "../dashboard/ProcessWithMostRulesDashboard";
import { RulesByChainDashboard } from "../dashboard/RulesByChainDashboard";
import { TopKpiDashboard } from "../dashboard/TopKpiDashboard";

export const TABS = {
  KPIS: "kpis",
  PROCESSES_WITH_MOST_RULES: "processes-with-most-rules",
  COMMON_PROCESSES: "common-processes",
  RULES_BY_CHAIN: "rules-by-chain",
  AGENTS_MAP: "agents-map",
} as const;

export const DashboardTabs = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full overflow-auto">
      <Tabs defaultValue={TABS.KPIS} className="max-w-5xl mt-4 mx-auto w-full">
        <TabsList className="justify-center">
          <TabsTrigger value={TABS.KPIS}>High-Level KPIs</TabsTrigger>
          <TabsTrigger value={TABS.AGENTS_MAP}>Agents</TabsTrigger>
          <TabsTrigger value={TABS.PROCESSES_WITH_MOST_RULES}>
            Processes with Most Rules
          </TabsTrigger>
          <TabsTrigger value={TABS.COMMON_PROCESSES}>Common Processes</TabsTrigger>
          <TabsTrigger value={TABS.RULES_BY_CHAIN}>Rules by Chain</TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.KPIS} className="w-full">
          <TopKpiDashboard />
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

        <TabsContent value={TABS.AGENTS_MAP} className="w-full">
          <AgentsMapDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
