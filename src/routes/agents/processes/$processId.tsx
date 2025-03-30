import { ProcessHeader } from "@/components/ProcessHeader";
import { RulesTable } from "@/components/RulesTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RULE_ACTION, RULE_CHAIN } from "@/models/rule.model";
import { processQuery } from "@/queries/process.query";
import { useCreateRule } from "@/queries/useCreateRule";
import { customValidation } from "@/utils/zod.util";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Shield } from "lucide-react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";

export const Route = createFileRoute("/agents/processes/$processId")({
  params: {
    parse: (params) => {
      const parsed = customValidation.ObjectId.safeParse(params.processId);

      if (parsed.success) {
        return {
          processId: parsed.data,
        };
      }

      throw new Error("Agent not found");
    },
    stringify: (params) => ({
      processId: params.processId.toString(),
    }),
  },
  loader(opts) {
    opts.context.queryClient.ensureQueryData(
      processQuery.getByIdWithRulesQueryOptions(opts.params.processId)
    );
  },
  component: ProcessComponent,
});

function ProcessComponent() {
  const params = Route.useParams();
  const getProcessByIdQuery = useSuspenseQuery(
    processQuery.getByIdWithRulesQueryOptions(params.processId)
  );
  const process = getProcessByIdQuery.data;

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { methods, onSubmit } = useCreateRule({
    processId: process._id,
  });

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <ProcessHeader process={getProcessByIdQuery.data} />

      <div className="container mx-auto py-6 px-4">
        <div className="grid lg:grid-cols-12">
          <Card className="lg:col-span-9 lg:col-start-2 border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            <CardHeader className="pb-2 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-400" />
                  Firewall Rules
                </CardTitle>
                <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-none">
                  {process.rules.length} Rules
                </Badge>
              </div>
              <CardDescription className="text-gray-400">
                Network rules associated with this process
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search rules..."
                    className="w-full bg-gray-800 border-gray-700 pl-8 text-white"
                  />
                </div>

                <FormProvider {...methods}>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                        <Plus className="h-4 w-4" />
                        <span>Add Rule</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] bg-gray-800 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle>Add New Firewall Rule</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Create a new rule for this process
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="saddr" className="text-gray-300">
                                Source Address
                              </Label>
                              <Input
                                {...methods.register("saddr")}
                                id="saddr"
                                placeholder="e.g. 192.168.1.1"
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="daddr" className="text-gray-300">
                                Destination Address
                              </Label>
                              <Input
                                {...methods.register("daddr")}
                                id="daddr"
                                placeholder="e.g. 10.0.0.1"
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="sport" className="text-gray-300">
                                Source Port
                              </Label>
                              <Input
                                {...methods.register("sport")}
                                id="sport"
                                type="number"
                                placeholder="e.g. 8080"
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="dport" className="text-gray-300">
                                Destination Port
                              </Label>
                              <Input
                                {...methods.register("dport")}
                                id="dport"
                                type="number"
                                placeholder="e.g. 3000"
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="protocol" className="text-gray-300">
                                Protocol
                              </Label>
                              <select
                                id="protocol"
                                {...methods.register("protocol")}
                                className="bg-gray-700 border-gray-600 text-white px-3 py-2 rounded"
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select protocol
                                </option>
                                <option value="TCP">TCP</option>
                                <option value="UDP">UDP</option>
                                <option value="ICMP">ICMP</option>
                                <option value="ALL">ALL</option>
                              </select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="action" className="text-gray-300">
                                Action
                              </Label>
                              <select
                                id="action"
                                {...methods.register("action")}
                                className="bg-gray-700 border-gray-600 text-white px-3 py-2 rounded"
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select action
                                </option>
                                {RULE_ACTION.map((action) => (
                                  <option key={action} value={action}>
                                    {action}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="chain" className="text-gray-300">
                                Chain
                              </Label>
                              <select
                                id="chain"
                                {...methods.register("chain")}
                                className="bg-gray-700 border-gray-600 text-white px-3 py-2 rounded"
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select chain
                                </option>
                                {RULE_CHAIN.map((chain) => (
                                  <option key={chain} value={chain}>
                                    {chain}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="priority" className="text-gray-300">
                                Priority
                              </Label>
                              <Input
                                {...methods.register("priority")}
                                id="priority"
                                type="number"
                                placeholder="e.g. 100"
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="comment" className="text-gray-300">
                              Comment
                            </Label>
                            <Input
                              {...methods.register("comment")}
                              id="comment"
                              placeholder="Rule description"
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>

                          <Button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            Add Rule
                          </Button>
                        </form>
                      </div>
                      <DialogFooter></DialogFooter>
                    </DialogContent>
                  </Dialog>
                </FormProvider>
              </div>

              <div className="py-4">
                <RulesTable data={process.rules} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
