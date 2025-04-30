import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutputFirewallRuleForm } from "../OutputFirewallRuleForm";
import { InputFirewallRuleForm } from "../InputFirewallRuleForm";

export const FirewallRuleFormTabs = () => {
  return (
    <Tabs defaultValue="outputFirewallRule" className="w-full h-full">
      <TabsList className=" grid w-full grid-cols-2">
        <TabsTrigger className="border-none" value="outputFirewallRule">
          Output Firewall Rules
        </TabsTrigger>
        <TabsTrigger className="border-none" value="inputFirewallRule">
          Input Firewall Rules
        </TabsTrigger>
      </TabsList>
      <TabsContent value="outputFirewallRule">
        <OutputFirewallRuleForm />
      </TabsContent>
      <TabsContent value="inputFirewallRule">
        <InputFirewallRuleForm />
      </TabsContent>
    </Tabs>
  );
};
