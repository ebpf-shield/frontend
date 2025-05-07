import { CommonProcessesDashboard } from "../dashboard/CommonProcessesDashboard";
import { ProcessesWithMostRulesDashboard } from "../dashboard/ProcessWithMostRulesDashboard";
import { RulesByChainDashboard } from "../dashboard/RulesByChainDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const TABS = {
  PROCESSES_WITH_MOST_RULES: "processes-with-most-rules",
  COMMON_PROCESSES: "common-processes",
  RULES_BY_CHAIN: "rules-by-chain",
};

export const DashboardTabs = () => {
  return (
    <Tabs
      defaultValue={TABS.PROCESSES_WITH_MOST_RULES}
      className="w-full h-full justify-center items-center gap-4"
    >
      <TabsList>
        <TabsTrigger value={TABS.PROCESSES_WITH_MOST_RULES}>Processes with most rules</TabsTrigger>
        <TabsTrigger value={TABS.COMMON_PROCESSES}>Common processes</TabsTrigger>
        <TabsTrigger value={TABS.RULES_BY_CHAIN}>Rules by chain</TabsTrigger>
      </TabsList>
      <TabsContent className="w-[60%]" value={TABS.PROCESSES_WITH_MOST_RULES}>
        <ProcessesWithMostRulesDashboard />
      </TabsContent>
      <TabsContent className="w-[60%]" value={TABS.COMMON_PROCESSES}>
        <CommonProcessesDashboard />
      </TabsContent>
      <TabsContent className="w-[60%]" value={TABS.RULES_BY_CHAIN}>
        <RulesByChainDashboard />
      </TabsContent>
    </Tabs>
  );
};
