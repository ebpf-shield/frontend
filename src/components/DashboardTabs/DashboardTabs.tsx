import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const TABS = {
  PROCESSES_WITH_MOST_RULES: "processes-with-most-rules",
  COMMON_PROCESSES: "common-processes",
};

export const DashboardTabs = () => {
  return (
    <Tabs
      defaultValue={TABS.PROCESSES_WITH_MOST_RULES}
      className="w-full h-full justify-center items-center"
    >
      <TabsList className="w-[50%]">
        <TabsTrigger value={TABS.PROCESSES_WITH_MOST_RULES}>Processes with most rules</TabsTrigger>
        <TabsTrigger value={TABS.COMMON_PROCESSES}>Common processes</TabsTrigger>
      </TabsList>
      <TabsContent value={TABS.PROCESSES_WITH_MOST_RULES}>
        <div>A</div>
      </TabsContent>
      <TabsContent value={TABS.COMMON_PROCESSES}>
        <div>B</div>
      </TabsContent>
    </Tabs>
  );
};
